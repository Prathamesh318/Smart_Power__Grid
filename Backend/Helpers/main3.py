from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import holidays
from datetime import datetime

app = Flask(__name__)
model = joblib.load('energy_model_updated.pkl')

@app.route('/predict', methods=['GET'])
def predict():
    input_date_str = request.args.get('date').strip()
    input_date = datetime.strptime(input_date_str, "%Y-%m-%d")
    dayofyear = input_date.timetuple().tm_yday
    month = input_date.month
    is_weekend = 1 if input_date.weekday() >= 5 else 0
    is_holiday = 1 if input_date in holidays.India(years=[input_date.year]) or is_weekend else 0

    def get_season(month):
        if month in [12, 1, 2]: return 0
        elif month in [3, 4, 5]: return 1
        elif month in [6, 7]: return 2
        else: return 3

    season = get_season(month)

    # Synthetic feature generation
    temperature = 25 + 10 * np.sin(2 * np.pi * dayofyear / 365)
    humidity = 60 + 20 * np.sin(2 * np.pi * (dayofyear - 180) / 365)
    voltage = 230
    current = 10 + 3 * np.sin(2 * np.pi * dayofyear / 365)
    frequency = 50

    features = pd.DataFrame([[current, voltage, frequency, temperature, humidity, is_holiday, is_weekend, month, season]],
                            columns=['current', 'voltage', 'frequency', 'temperature', 'humidity', 'is_holiday', 'is_weekend', 'month', 'season'])

    prediction = model.predict(features)[0]
    return jsonify({
        'date': input_date_str,
        'predicted_energy_load': round(prediction, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)
