import numpy as np
import pandas as pd
import tensorflow as tf
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping
import joblib

# Load dataset
df = pd.read_csv('../Dataset/power_grid__data.csv', parse_dates=['Timestamp'])
df.set_index('Timestamp', inplace=True)

# Select multiple features for forecasting
features = ['Voltage (V)', 'Current (A)', 'Power (W)', 'Frequency (Hz)', 'Power Factor']
data = df[features].values

# Define train-test split ratio
split_ratio = 0.8
split = int(split_ratio * len(data))

# Fit scaler ONLY on training data
scaler = MinMaxScaler(feature_range=(0, 1))
scaler.fit(data[:split])  
joblib.dump(scaler, 'scaler.pkl')  # Save the scaler

# Transform the entire dataset using fitted scaler
# data_scaled = scaler.transform(data)

# Convert data into time series format
# def create_sequences(data, seq_length):
#     X, y = [], []
#     for i in range(len(data) - seq_length):
#         X.append(data[i:i+seq_length])
#         y.append(data[i+seq_length, 2])  # Predict Power (W)
#     return np.array(X), np.array(y)

# seq_length = 60  # Use past 60 time steps to predict next value
# X, y = create_sequences(data_scaled, seq_length)

# # Split data into training and testing sets
# X_train, X_test = X[:split], X[split:]
# y_train, y_test = y[:split], y[split:]

# # Build LSTM Model
# model = Sequential([
#     LSTM(128, return_sequences=True, input_shape=(seq_length, len(features))),
#     BatchNormalization(),
#     Dropout(0.3),

#     LSTM(128, return_sequences=False),
#     BatchNormalization(),
#     Dropout(0.3),

#     Dense(64, activation='relu'),
#     Dense(1)
# ])

# # Compile the model
# model.compile(optimizer=Adam(learning_rate=0.0003), loss='mse')

# # Implement early stopping
# early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

# # Train the model
# history = model.fit(
#     X_train, y_train,
#     epochs=50,
#     batch_size=16,
#     validation_data=(X_test, y_test),
#     callbacks=[early_stopping],
#     verbose=1
# )

# # Save the trained model
# model.save('energy_forecast_model.h5')

# print("✅ Model training complete. Saved as energy_forecast_model.h5.")
