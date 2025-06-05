from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import holidays
from datetime import datetime
from requests_oauthlib import OAuth2Session
import os
from dotenv import load_dotenv
load_dotenv()

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])


import psycopg2
from psycopg2.extras import RealDictCursor

def get_db():
    return psycopg2.connect(
        dbname=os.environ.get("PG_DB"),
        user=os.environ.get("PG_USER"),
        password=os.environ.get("PG_PASSWORD"),
        host=os.environ.get("PG_HOST"),
        cursor_factory=RealDictCursor
    )
# Load your ML model
model = joblib.load('./Model/energy_model.pkl')

# OAuth config for Google
CLIENT_SECRET= os.environ.get('CLIENT_SECRET')  # Set this in your environment variables
CLIENT_ID = os.environ.get('CLIENT_ID')  # Set this in your environment variables

REDIRECT_URI = 'http://localhost:5000/callback'

oauth = OAuth2Session(
    CLIENT_ID,
    redirect_uri=REDIRECT_URI,
       scope=[
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid"
    ]
)

# ---- OAuth routes ----

@app.route('/login')
def login():
    auth_url, state = oauth.authorization_url(
        "https://accounts.google.com/o/oauth2/auth",
        access_type="offline"
    )
    session['oauth_state'] = state
    return redirect(auth_url)

# In Flask /callback
@app.route('/callback')
def callback():
    oauth.fetch_token(
        "https://oauth2.googleapis.com/token",
        client_secret=CLIENT_SECRET,
        authorization_response=request.url
    )
    user_info = oauth.get("https://www.googleapis.com/oauth2/v1/userinfo").json()
    session['user'] = user_info
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO users (id, email, name, picture, last_login)
        VALUES (%s, %s, %s, %s, NOW())
        ON CONFLICT (id) DO UPDATE SET
            email=EXCLUDED.email,
            name=EXCLUDED.name,
            picture=EXCLUDED.picture,
            last_login=NOW()
    """, (user_info['id'], user_info['email'], user_info['name'], user_info['picture']))
    conn.commit()
    cur.close()
    conn.close()
    return redirect(f"http://localhost:5173/dashboard?email={user_info['email']}")

@app.route('/logout')
def logout():
    session.clear()
    return redirect('http://localhost:5173/')

@app.route('/user')
def get_user():
    if 'user' in session:
        return jsonify(session['user'])
    return jsonify({}), 401

# ---- Protected prediction route ----

@app.route('/predict', methods=['GET'])
def predict():
    # Check if user logged in
    if 'user' not in session:
        return jsonify({"error": "Unauthorized"}), 401

    input_date_str = request.args.get('date')
    if not input_date_str:
        return jsonify({"error": "Missing date parameter"}), 400

    try:
        input_date = datetime.strptime(input_date_str.strip(), "%Y-%m-%d")
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    dayofyear = input_date.timetuple().tm_yday

    # Calculate features
    temperature = 25 + 10 * np.sin(2 * np.pi * dayofyear / 365)
    humidity = 60 + 20 * np.sin(2 * np.pi * (dayofyear - 180) / 365)
    voltage = 230  # avg voltage
    current = 10 + 3 * np.sin(2 * np.pi * dayofyear / 365)
    is_holiday = 1 if input_date in holidays.India(years=[input_date.year]) or input_date.weekday() >= 5 else 0

    features = pd.DataFrame([[current, voltage, temperature, humidity, is_holiday]],
                            columns=['current', 'voltage', 'temperature', 'humidity', 'is_holiday'])

    prediction = float(model.predict(features)[0])
    user_id = session['user']['id']
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO predictions (user_id, date, predicted_energy_load, requested_at)
        VALUES (%s, %s, %s, NOW())
    """, (user_id, input_date, float(round(prediction, 2))))
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({
        'date': input_date_str,
        'predicted_energy_load': round(prediction, 2)
    })
    
@app.route('/admin/users')
def admin_users():
    # Add authentication/authorization as needed!
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(users)

@app.route('/predictions/history')
def prediction_history():
    if 'user' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    user_id = session['user']['id']
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT date, predicted_energy_load, requested_at
        FROM predictions
        WHERE user_id = %s
        ORDER BY requested_at DESC
        LIMIT 20
    """, (user_id,))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(rows)

if __name__ == '__main__':
    app.run(debug=True)
