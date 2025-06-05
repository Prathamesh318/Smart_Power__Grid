import React, { useState, useEffect, useRef } from "react";
import { FaBolt, FaPlug, FaWaveSquare } from "react-icons/fa";
import Header from "./Header";
import StatusCard from "./StatusCard";
import PredictionControls from "./PredictionControls";
import MetricChart from "./MetricChart";
import StatsCard from "./StatsCard";
import EnergyPrediction from "./EnergyPrediction";
import SmartGridChatbot from "../Chatbot/SmartGridChatbot";
import UserList from "../UserList/UserList";
import { Link } from "react-router-dom";
import PredictionHistory from "../Prediction/PredictionHistory";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({ status: false, message: "Normal" });
  const [predictionData, setPredictionData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [wsStatus, setWsStatus] = useState("Connecting...");
  const [iterationCount, setIterationCount] = useState(0);
  const [audioContext, setAudioContext] = useState(null);
  const audioRef = useRef(null);

  const logout = () => {
    localStorage.clear();
    localStorage.removeItem("userEmail");
    window.location.href = "http://localhost:5000/logout";
  };

  // Initialize audio context on user interaction (optional, kept for potential future use)
  const enableAudio = () => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      if (context.state === "suspended") {
        context.resume()
          .then(() => console.log("Audio context resumed"))
          .catch((err) => console.error("Error resuming audio context:", err));
      }
      setAudioContext(context);
    }
    // Preload audio to ensure playback readiness
    if (audioRef.current) {
      audioRef.current.load();
      console.log("Audio preloaded");
    }
  };

  // Play sound on anomaly
  useEffect(() => {
    if (status.status && status.message !== "Normal") {
      console.log("Attempting to play alert.mp3 for anomaly:", status.message);
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reset to start
        audioRef.current.play()
          .then(() => console.log("Alert sound played successfully"))
          .catch((err) => {
            console.error("Error playing alert.mp3:", err);
            console.warn("Playback may require user interaction (e.g., clicking 'Enable Audio')");
          });
      } else {
        console.error("Audio element not found");
      }
    }
  }, [status]);

  useEffect(() => {
    let ws;
    let fallbackInterval;

    const checkAnomaly = ({ voltage, current, frequency }) => {
      if (voltage < 200) {
        return { status: true, message: "Voltage too low" };
      }
      if (voltage > 260) {
        return { status: true, message: "Voltage too high" };
      }
      if (current < 3) {
        return { status: true, message: "Current too low" };
      }
      if (current > 7) {
        return { status: true, message: "Current too high" };
      }
      if (frequency < 49.5) {
        return { status: true, message: "Frequency too low" };
      }
      if (frequency > 50.5) {
        return { status: true, message: "Frequency too high" };
      }
      return { status: false, message: "Normal" };
    };

    const generateRandomData = (iteration) => {
      let dataPoint;
      if (iteration === 20) {
        // Force an anomaly on iteration 20
        const anomalyType = Math.floor(Math.random() * 6); // 0–5 for 6 possible anomalies
        switch (anomalyType) {
          case 0: // Voltage too low
            dataPoint = {
              voltage: +(190 + Math.random() * 9).toFixed(2), // 190–199V
              current: +(3.5 + Math.random() * 3).toFixed(2), // 3.5–6.5A
              frequency: +(49.6 + Math.random() * 0.8).toFixed(2), // 49.6–50.4Hz
              timestamp: new Date().toISOString(),
            };
            break;
          case 1: // Voltage too high
            dataPoint = {
              voltage: +(261 + Math.random() * 9).toFixed(2), // 261–270V
              current: +(3.5 + Math.random() * 3).toFixed(2),
              frequency: +(49.6 + Math.random() * 0.8).toFixed(2),
              timestamp: new Date().toISOString(),
            };
            break;
          case 2: // Current too low
            dataPoint = {
              voltage: +(210 + Math.random() * 40).toFixed(2), // 210–250V
              current: +(2 + Math.random() * 0.9).toFixed(2), // 2–2.9A
              frequency: +(49.6 + Math.random() * 0.8).toFixed(2),
              timestamp: new Date().toISOString(),
            };
            break;
          case 3: // Current too high
            dataPoint = {
              voltage: +(210 + Math.random() * 40).toFixed(2),
              current: +(7.1 + Math.random() * 0.9).toFixed(2), // 7.1–8A
              frequency: +(49.6 + Math.random() * 0.8).toFixed(2),
              timestamp: new Date().toISOString(),
            };
            break;
          case 4: // Frequency too low
            dataPoint = {
              voltage: +(210 + Math.random() * 40).toFixed(2),
              current: +(3.5 + Math.random() * 3).toFixed(2),
              frequency: +(49 + Math.random() * 0.4).toFixed(2), // 49–49.4Hz
              timestamp: new Date().toISOString(),
            };
            break;
          case 5: // Frequency too high
            dataPoint = {
              voltage: +(210 + Math.random() * 40).toFixed(2),
              current: +(3.5 + Math.random() * 3).toFixed(2),
              frequency: +(50.6 + Math.random() * 0.4).toFixed(2), // 50.6–51Hz
              timestamp: new Date().toISOString(),
            };
            break;
          default:
            dataPoint = {
              voltage: +(210 + Math.random() * 40).toFixed(2),
              current: +(3.5 + Math.random() * 3).toFixed(2),
              frequency: +(49.6 + Math.random() * 0.8).toFixed(2),
              timestamp: new Date().toISOString(),
            };
        }
      } else {
        // Normal data within thresholds
        dataPoint = {
          voltage: +(210 + Math.random() * 40).toFixed(2), // 210–250V
          current: +(3.5 + Math.random() * 3).toFixed(2), // 3.5–6.5A
          frequency: +(49.6 + Math.random() * 0.8).toFixed(2), // 49.6–50.4Hz
          timestamp: new Date().toISOString(),
        };
      }
      dataPoint.anomaly = checkAnomaly(dataPoint);
      return dataPoint;
    };

    const startFallback = () => {
      console.warn("Starting fallback data generator...");
      fallbackInterval = setInterval(() => {
        setIterationCount((prev) => {
          const newCount = prev + 1;
          const resetCount = newCount === 20 && generateRandomData(newCount).anomaly.status ? 0 : newCount;
          const randomData = generateRandomData(newCount);
          setData((prevData) => [...prevData, randomData].slice(-10));
          setStatus(randomData.anomaly);
          return resetCount;
        });
      }, 2000);
    };

    const stopFallback = () => {
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
        fallbackInterval = null;
      }
    };

    const connectWebSocket = () => {
      ws = new WebSocket("ws://localhost:6789");

      ws.onopen = () => {
        console.log("WebSocket connected");
        setWsStatus("Connected");
        stopFallback();
      };

      ws.onmessage = (event) => {
        try {
          setIterationCount((prev) => {
            const newCount = prev + 1;
            const resetCount = newCount === 20 ? 0 : newCount;
            let dataPoint = JSON.parse(event.data);

            if (newCount === 20) {
              // Force an anomaly
              const anomalyType = Math.floor(Math.random() * 6);
              switch (anomalyType) {
                case 0:
                  dataPoint = { ...dataPoint, voltage: +(190 + Math.random() * 9).toFixed(2) };
                  break;
                case 1:
                  dataPoint = { ...dataPoint, voltage: +(261 + Math.random() * 9).toFixed(2) };
                  break;
                case 2:
                  dataPoint = { ...dataPoint, current: +(2 + Math.random() * 0.9).toFixed(2) };
                  break;
                case 3:
                  dataPoint = { ...dataPoint, current: +(7.1 + Math.random() * 0.9).toFixed(2) };
                  break;
                case 4:
                  dataPoint = { ...dataPoint, frequency: +(49 + Math.random() * 0.4).toFixed(2) };
                  break;
                case 5:
                  dataPoint = { ...dataPoint, frequency: +(50.6 + Math.random() * 0.4).toFixed(2) };
                  break;
                default:
                  break;
              }
            }
            dataPoint.anomaly = checkAnomaly(dataPoint);
            setData((prevData) => [...prevData, dataPoint].slice(-10));
            setStatus(dataPoint.anomaly);
            return resetCount;
          });
        } catch (err) {
          console.error("Invalid WebSocket message format:", err);
        }
      };

      ws.onclose = () => {
        console.warn("WebSocket disconnected. Retrying...");
        setWsStatus("Disconnected, retrying...");
        startFallback();
        setTimeout(connectWebSocket, 5000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setWsStatus("WebSocket error");
        startFallback();
      };
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
      stopFallback();
    };
  }, []);

  const sendDateToBackend = async (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    try {
     // ...existing code...
const response = await fetch(`http://localhost:5000/predict?date=${formattedDate}`, {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  credentials: "include", // <-- Add this line!
});


      if (!response.ok) throw new Error("Network response was not ok");

      const prediction = await response.json();
      setPredictionData([{ date: prediction.date, energy: prediction.predicted_energy_load }]);
    } catch (error) {
      console.error("Error sending date to backend:", err);
      setPredictionData([{ date: formattedDate, energy: (2000 + Math.random() * 500).toFixed(2) }]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    sendDateToBackend(date);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 relative">
      <Header />
      <div className="mb-4 text-gray-700 font-semibold">
        WebSocket Status: {wsStatus}
      </div>
      <button
        onClick={enableAudio}
        className="absolute top-6 left-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out animate-fade-in-up"
      >
        Enable Audio
      </button>
      <audio ref={audioRef} src="/alert.mp3" preload="auto" />
      <StatusCard status={status.message} anamoly={status.status ? "Anomaly" : "Normal"} />
      <PredictionControls
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricChart
          title="Voltage"
          icon={<FaBolt />}
          dataKey="voltage"
          strokeColor="#8b5cf6"
          fillColor="#8b5cf6"
          data={data}
          delay="0s"
        />
        <MetricChart
          title="Current"
          icon={<FaPlug />}
          dataKey="current"
          strokeColor="#10b981"
          fillColor="#10b981"
          data={data}
          delay="0.2s"
        />
        <MetricChart
          title="Frequency"
          icon={<FaWaveSquare />}
          dataKey="frequency"
          strokeColor="#f59e0b"
          fillColor="#f59e0b"
          data={data}
          delay="0.4s"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          label="Voltage"
          value={data[data.length - 1]?.voltage || "N/A"}
          unit="V"
          icon={<FaBolt />}
          color="text-purple-600"
          delay="0s"
        />
        <StatsCard
          label="Current"
          value={data[data.length - 1]?.current || "N/A"}
          unit="A"
          icon={<FaPlug />}
          color="text-teal-600"
          delay="0.2s"
        />
        <StatsCard
          label="Frequency"
          value={data[data.length - 1]?.frequency || "N/A"}
          unit="Hz"
          icon={<FaWaveSquare />}
          color="text-orange-600"
          delay="0.4s"
        />
         <div className="flex justify-end mb-4">
        {/* <Link
          to="/admin/users"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          View All Users
        </Link> */}
      </div>
      </div>
      <EnergyPrediction predictionData={predictionData} />
  
          
      <SmartGridChatbot />
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.3); }
          50% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.5); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out; }
        .animate-slide-in-right { animation: slideInRight 1s ease-out; }
        .animate-zoom-in { animation: zoomIn 0.6s ease-out; }
        .animate-pulse-glow { animation: pulseGlow 2s infinite; }
        .animate-spin-slow { animation: spinSlow 10s linear infinite; }
        .animate-bounce-slow { animation: bounceSlow 3s infinite; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
      `}</style>
    </div>
    </>
  );
};

export default Dashboard;