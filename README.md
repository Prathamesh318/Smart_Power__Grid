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

