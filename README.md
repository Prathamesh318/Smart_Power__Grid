# Smart Power Grid Web Application

A full-stack web application for real-time smart grid monitoring, anomaly detection, energy prediction, and user management.  
Built with **React + Vite + Tailwind CSS** (frontend), **Flask** (backend), **PostgreSQL** (database), **Kafka** (streaming), and **WebSockets** (live data).

---

## 🚀 Features

- **Real-Time Power Metrics:**  
  Live voltage, current, and frequency charts via WebSocket from Kafka.
- **Anomaly Detection:**  
  Instant detection and alerting for abnormal grid conditions.
- **Energy Prediction:**  
  Predict future energy load using a trained ML model.
- **User Authentication:**  
  Google OAuth2 login with secure session management.
- **User Management:**  
  Admin view of all registered users.
- **Prediction History:**  
  View/download your past prediction requests.
- **Smart Grid Chatbot:**  
  Ask questions about grid status, anomalies, and predictions.
- **Responsive UI:**  
  Modern, mobile-friendly dashboard with Tailwind CSS.
- **Download Data:**  
  Export your metrics and predictions as CSV.
- **Admin Dashboard:**  
  (Optional) Endpoints for system health, user activity, and anomaly stats.

---

## 🏗️ Project Structure
Smart_Power_Grid/ │ ├── Backend/ │ ├── main.py # Flask backend (API, OAuth, DB, ML) │ ├── consumer/consumer.py # Kafka consumer + WebSocket server │ ├── producer/producer.py # Kafka producer (random/anomaly data) │ ├── Model/energy_model.pkl # Trained ML model │ ├── .env # Backend secrets (never commit!) │ └── ... # Helpers, chatbot, etc.
 │ └── Frontend/ └── my-app/ ├── src/ │ ├── components/ # React components (Dashboard, UserList, etc.) │ ├── main.jsx # React entry point │ └── ... # Styles, utils, etc.
 ├── public/ ├── package.json └── .gitignore


 
---

## ⚡ Quick Start

### 1. **Clone the Repository**

```sh
git clone https://github.com/yourusername/Smart_Power_Grid.git
cd Smart_Power_Grid

cd Backend
pip install -r requirements.txt

(If requirements.txt is missing, install: Flask, flask-cors, requests-oauthlib, joblib, pandas, numpy, holidays, psycopg2-binary, kafka-python, python-dotenv)

Set up PostgreSQL:

Create a database and user.
Create tables (see schema in this README or in main.py).
Configure .env:

CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
PG_DB=your_db
PG_USER=your_user
PG_PASSWORD=your_password
PG_HOST=localhost

Start Kafka and Zookeeper (locally or via Docker).

Start the Kafka producer:
python producer/producer.py

Start the Kafka consumer/WebSocket server
python consumer/consumer.py

Start the Flask backend:
python main.py

3. Frontend Setup

cd ../Frontend/my-app
npm install

Start the frontend:
npm run dev

The app will be available at http://localhost:5173.

```
##🔑 Authentication
Uses Google OAuth2 for login.
After login, user info is stored in the backend session and PostgreSQL.
Session is required for protected routes (dashboard, predictions, user list).

📊 Main Pages
/ — Home page, login button, features overview.
/dashboard — Live grid metrics, anomaly status, prediction controls, charts.
users — Admin view of all registered users.
/prediction-history — Table of your past predictions.
/graphs — Comparative radar chart of project vs. research papers.

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS, Recharts, React Router
Backend: Flask, flask-cors, requests-oauthlib, joblib, pandas, numpy, holidays, psycopg2-binary, kafka-python
Database: PostgreSQL
Streaming: Kafka (producer/consumer)
WebSocket: websockets (Python)
ML Model: RandomForestRegressor (or LSTM, as trained)
Chatbot: HuggingFace Inference API (optional)

🧑‍💻 Development Notes
Environment variables must be set in .env (never commit secrets).
Kafka must be running for real-time data.
WebSocket server must be running for live dashboard updates.
Frontend expects backend at http://localhost:5000 and WebSocket at ws://localhost:6789.
CORS and credentials: "include" are required for session-based auth.


📝 Database Schema (PostgreSQL)
```sh
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR UNIQUE,
    name VARCHAR,
    picture VARCHAR,
    last_login TIMESTAMP
);

CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP,
    voltage FLOAT,
    current FLOAT,
    frequency FLOAT,
    anomaly BOOLEAN,
    user_id VARCHAR REFERENCES users(id)
);

CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id),
    date DATE,
    predicted_energy_load FLOAT,
    requested_at TIMESTAMP
);

CREATE TABLE power_grids (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    latitude FLOAT,
    longitude FLOAT,
    capacity FLOAT
);
```

🧩 Extending the Project
Add more analytics: Historical trends, anomaly heatmaps, etc.
Role-based access: Restrict admin endpoints.
Notifications: Email/SMS or browser push for anomalies.
Map integration: Show grid locations on Google Maps.
Dockerize: For easy deployment.

🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss major changes.

🙏 Acknowledgements
React
Flask
Kafka
Tailwind CSS
Google Cloud
HuggingFace

