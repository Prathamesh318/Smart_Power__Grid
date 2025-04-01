import numpy as np
import pandas as pd
import tensorflow as tf
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
import joblib
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# Load dataset
df = pd.read_csv('../Dataset/power_grid__data.csv', parse_dates=['Timestamp'])
df.set_index('Timestamp', inplace=True)

# Select multiple features for forecasting
features = ['Voltage (V)', 'Current (A)', 'Power (W)', 'Frequency (Hz)', 'Power Factor']
data = df[features].values

# Load scaler
scaler = joblib.load('scaler.pkl')
data_scaled = scaler.transform(data)

# Convert data into time series format
def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i+seq_length])
        y.append(data[i+seq_length, 2])  # Predict Power (W)
    return np.array(X), np.array(y)

seq_length = 60  # Use past 60 time steps to predict next value
X, y = create_sequences(data_scaled, seq_length)

# Split data into training and testing sets
split_ratio = 0.8
split = int(split_ratio * len(X))

X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Load the trained model
# Load the trained model without compilation
model = load_model('energy_forecast_model.h5', compile=False)

# Recompile the model with explicit loss function
model.compile(optimizer='adam', loss=tf.keras.losses.MeanSquaredError())

# Make predictions
y_pred = model.predict(X_test)

# Reverse scaling
y_test_inv = scaler.inverse_transform(np.c_[np.zeros((len(y_test), 4)), y_test])[:, 4]
y_pred_inv = scaler.inverse_transform(np.c_[np.zeros((len(y_pred), 4)), y_pred])[:, 4]

# Calculate accuracy metrics
mse = mean_squared_error(y_test_inv, y_pred_inv)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test_inv, y_pred_inv)
r2 = r2_score(y_test_inv, y_pred_inv)

print(f"Mean Squared Error (MSE): {mse}")
print(f"Root Mean Squared Error (RMSE): {rmse}")
print(f"Mean Absolute Error (MAE): {mae}")
print(f"R² Score: {r2}")

print("✅ Model testing complete.")
