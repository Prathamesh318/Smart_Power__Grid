import numpy as np
import pandas as pd
from datetime import datetime, timedelta

# Number of entries
data_points = 10000

# Generate timestamps (distributed from January 1, 2020, to present)
start_time = datetime(2020, 1, 1)
time_intervals = np.linspace(0, (datetime.now() - start_time).total_seconds(), data_points)
timestamps = [start_time + timedelta(seconds=int(t)) for t in time_intervals]

# Generate realistic electrical values
np.random.seed(42)  # For reproducibility

voltage = np.random.normal(loc=230, scale=5, size=data_points)  # Mean 230V, slight variations
current = np.random.uniform(low=10, high=50, size=data_points)  # Current between 10A and 50A
power = voltage * current * np.random.uniform(0.9, 1.1, size=data_points)  # Active power (W)
reactive_power = power * np.random.uniform(0.2, 0.4, size=data_points)  # Reactive power (VAR)
frequency = np.random.normal(loc=50, scale=0.1, size=data_points)  # 50 Hz with minor fluctuations
power_factor = np.clip(np.random.normal(loc=0.95, scale=0.02, size=data_points), 0.85, 1.0)  # Between 0.85 and 1.0

# Create DataFrame
df = pd.DataFrame({
    'Timestamp': timestamps,
    'Voltage (V)': voltage,
    'Current (A)': current,
    'Power (W)': power,
    'Reactive Power (VAR)': reactive_power,
    'Frequency (Hz)': frequency,
    'Power Factor': power_factor
})

# Save to CSV
df.to_csv('power_grid__data.csv', index=False)

print("Dataset generated and saved as power_grid_data.csv")
