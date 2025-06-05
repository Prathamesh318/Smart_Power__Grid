import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import holidays

# Generate date range
start_date = datetime(2020, 1, 1)
end_date = datetime.now()
dates = pd.date_range(start_date, end_date, freq='D')[:10000]  # Limit to 10000 entries

# Indian holidays
indian_holidays = holidays.India(years=range(2020, end_date.year + 1))
is_holiday = [1 if date in indian_holidays or date.weekday() >= 5 else 0 for date in dates]

# Generate features with seasonal trends
np.random.seed(42)
data = pd.DataFrame({'date': dates})
data['dayofyear'] = data['date'].dt.dayofyear

# Seasonal temperature: peaks in summer
data['temperature'] = 25 + 10 * np.sin(2 * np.pi * data['dayofyear'] / 365) + np.random.normal(0, 2, len(data))
# Humidity: higher in monsoon
data['humidity'] = 60 + 20 * np.sin(2 * np.pi * (data['dayofyear'] - 180) / 365) + np.random.normal(0, 5, len(data))
# Voltage: random variation
data['voltage'] = np.random.normal(230, 5, len(data))
# Current: moderately varies
data['current'] = 10 + 3 * np.sin(2 * np.pi * data['dayofyear'] / 365) + np.random.normal(0, 1, len(data))

# Target variable: energy load (Watts)
data['is_holiday'] = is_holiday
data['energy'] = data['voltage'] * data['current'] * (1 - 0.2 * data['is_holiday']) \
                 + np.random.normal(0, 50, len(data))

# Save dataset
data.to_csv('energy_forecast_dataset.csv', index=False)

# ---------------- MODEL TRAINING ---------------- #
features = ['current', 'voltage', 'temperature', 'humidity', 'is_holiday']
X = data[features]
y = data['energy']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)
print("RMSE:", np.sqrt(mean_squared_error(y_test, preds)))

# Save model
joblib.dump(model, 'energy_model.pkl')
