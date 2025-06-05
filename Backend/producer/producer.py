import json
import time
import random
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def check_anomaly(voltage, current, frequency):
    if voltage < 200:
        return {"status": True, "message": "Voltage too low"}
    if voltage > 260:
        return {"status": True, "message": "Voltage too high"}
    if current < 3:
        return {"status": True, "message": "Current too low"}
    if current > 7:
        return {"status": True, "message": "Current too high"}
    if frequency < 49.5:
        return {"status": True, "message": "Frequency too low"}
    if frequency > 50.5:
        return {"status": True, "message": "Frequency too high"}
    return {"status": False, "message": "Normal"}

def generate_data(iteration):
    # Every 20th message, inject an anomaly
    if iteration % 20 == 0 and iteration != 0:
        anomaly_type = random.randint(0, 5)
        if anomaly_type == 0:  # Voltage too low
            voltage = round(random.uniform(190, 199), 2)
            current = round(random.uniform(3.5, 6.5), 2)
            frequency = round(random.uniform(49.6, 50.4), 2)
        elif anomaly_type == 1:  # Voltage too high
            voltage = round(random.uniform(261, 270), 2)
            current = round(random.uniform(3.5, 6.5), 2)
            frequency = round(random.uniform(49.6, 50.4), 2)
        elif anomaly_type == 2:  # Current too low
            voltage = round(random.uniform(210, 250), 2)
            current = round(random.uniform(2, 2.9), 2)
            frequency = round(random.uniform(49.6, 50.4), 2)
        elif anomaly_type == 3:  # Current too high
            voltage = round(random.uniform(210, 250), 2)
            current = round(random.uniform(7.1, 8), 2)
            frequency = round(random.uniform(49.6, 50.4), 2)
        elif anomaly_type == 4:  # Frequency too low
            voltage = round(random.uniform(210, 250), 2)
            current = round(random.uniform(3.5, 6.5), 2)
            frequency = round(random.uniform(49, 49.4), 2)
        elif anomaly_type == 5:  # Frequency too high
            voltage = round(random.uniform(210, 250), 2)
            current = round(random.uniform(3.5, 6.5), 2)
            frequency = round(random.uniform(50.6, 51), 2)
    else:
        # Normal data
        voltage = round(random.uniform(210, 250), 2)
        current = round(random.uniform(3.5, 6.5), 2)
        frequency = round(random.uniform(49.6, 50.4), 2)
    anomaly = check_anomaly(voltage, current, frequency)
    return {
        'voltage': voltage,
        'current': current,
        'frequency': frequency,
        'timestamp': time.time(),
        'anomaly': anomaly
    }

if __name__ == "__main__":
    print("Starting Kafka producer with anomaly logic...")
    iteration = 0
    while True:
        data = generate_data(iteration)
        producer.send('power-metrics', value=data)
        print(f"Produced: {data}")
        iteration += 1
        time.sleep(1)