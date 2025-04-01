from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import tensorflow as tf
import joblib
from datetime import datetime, timedelta

app = Flask(__name__)

# Load the updated trained LSTM model and scaler
MODEL_PATH = './Models/energy_forecast_model.h5'
SCALER_PATH = './Models/scaler.pkl'

model = tf.keras.models.load_model(MODEL_PATH, compile=False)
scaler = joblib.load(SCALER_PATH)

# Recompile model (Fixes potential 'mse' function error)
model.compile(optimizer='adam', loss='mse')

# Load dataset for reference
DATASET_PATH = './Dataset/power_grid_data.csv'
df = pd.read_csv(DATASET_PATH, parse_dates=['Timestamp'])
df.set_index('Timestamp', inplace=True)

SEQ_LENGTH = 30  # The sequence length used in training

# Function to prepare input for prediction
# Function to prepare input for prediction
def prepare_input():
    required_features = ['Voltage (V)', 'Current (A)', 'Power (W)', 'Frequency (Hz)', 'Power Factor']

    # Check if all required features exist in the dataset
    if not all(feature in df.columns for feature in required_features):
        raise ValueError(f"Dataset is missing required columns: {required_features}")

    last_values = df[required_features].values[-SEQ_LENGTH:]  # Take last SEQ_LENGTH values

    # Ensure we have enough data points
    if len(last_values) < SEQ_LENGTH:
        raise ValueError(f"Not enough data points! Expected {SEQ_LENGTH}, but got {len(last_values)}.")

    last_values_scaled = scaler.transform(last_values)

    # Reshape to (1, SEQ_LENGTH, num_features)
    return last_values_scaled.reshape(1, SEQ_LENGTH, len(required_features))  # Correct shape for LSTM


# Function to predict future power consumption
def predict_power():
    input_data = prepare_input()
    prediction_scaled = model.predict(input_data)
    prediction = scaler.inverse_transform(prediction_scaled.reshape(-1, 1))
    return round(prediction[0][0], 2)  # Return a single predicted value

# API Routes
@app.route('/')
def home():
    return jsonify({"message": "Smart Power Grid Forecasting API is running!"})

@app.route('/predict/today', methods=['GET'])
def predict_today():
    """Predict power consumption for today."""
    prediction = predict_power()
    return jsonify({"date": str(datetime.today().date()), "predicted_power_watts": float(prediction)})

@app.route('/predict/month', methods=['GET'])
def predict_month():
    """Predict power consumption for the month."""
    predictions = [predict_power() for _ in range(30)]
    return jsonify({"month": datetime.today().strftime('%B %Y'), "predicted_power_watts": float(sum(predictions))})

@app.route('/predict/year', methods=['GET'])
def predict_year():
    """Predict power consumption for this year."""
    predictions = [predict_power() for _ in range(365)]
    return jsonify({"year": datetime.today().year, "predicted_power_watts": float(sum(predictions))})

@app.route('/predict/future', methods=['POST'])
def predict_future():
    """Predict power consumption for a user-specified future date."""
    try:
        data = request.get_json()
        future_date = datetime.strptime(data['date'], '%Y-%m-%d')
        days_ahead = (future_date - datetime.today()).days

        if days_ahead <= 0:
            return jsonify({"error": "Future date must be after today."}), 400

        predictions = [predict_power() for _ in range(days_ahead)]
        return jsonify({"date": str(future_date.date()), "predicted_power_watts": float(sum(predictions))})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
