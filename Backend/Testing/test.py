import pandas as pd
import numpy as np
import joblib
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split

# Load the trained model
model = joblib.load('energy_model.pkl')

# Load or regenerate the dataset (you can use your existing logic)
# OR load from CSV if you saved it
# data = pd.read_csv('dataset.csv')  # if saved
# OR regenerate same way you did before

# For demo, let’s assume you're regenerating features like before
# (if you're saving dataset.csv, you can skip this part)
from datetime import datetime
import holidays

dates = pd.date_range(datetime(2020, 1, 1), periods=10000)
indian_holidays = holidays.India(years=range(2020, datetime.now().year + 1))
is_holiday = [1 if date in indian_holidays or date.weekday() >= 5 else 0 for date in dates]

data = pd.DataFrame({'date': dates, 'is_holiday': is_holiday})
data['dayofyear'] = data['date'].dt.dayofyear
data['temperature'] = 25 + 10 * np.sin(2 * np.pi * data['dayofyear'] / 365) + np.random.normal(0, 2, len(data))
data['humidity'] = 60 + 20 * np.sin(2 * np.pi * (data['dayofyear'] - 180) / 365) + np.random.normal(0, 5, len(data))
data['voltage'] = np.random.normal(230, 5, len(data))
data['current'] = 10 + 3 * np.sin(2 * np.pi * data['dayofyear'] / 365) + np.random.normal(0, 2, len(data))
data['energy'] = data['voltage'] * data['current'] * (1 - 0.2 * data['is_holiday']) + np.random.normal(0, 50, len(data))

# Prepare features and target
features = ['current', 'voltage', 'temperature', 'humidity', 'is_holiday']
X = data[features]
y = data['energy']

# Split for evaluation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Predict and evaluate
y_pred = model.predict(X_test)

rmse = np.sqrt(mean_squared_error(y_test, y_pred))
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"✅ Model Evaluation on Test Data")
print(f"📉 RMSE: {rmse:.2f}")
print(f"📊 MAE : {mae:.2f}")
print(f"📈 R²  : {r2:.4f}")
