import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FaBolt, FaPlug, FaWaveSquare, FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Normal");
  const [predictionData, setPredictionData] = useState([]); // State for future predictions

  useEffect(() => {
    const generateMockData = () => {
      const timestamp = Date.now() / 1000;
      const mockData = {
        timestamp,
        voltage: (210 + Math.random() * 40).toFixed(2),
        current: (10 + Math.random() * 10).toFixed(2),
        frequency: (59.5 + Math.random() * 1).toFixed(2),
      };

      const anomaly = Math.random() < 0.1;
      setStatus(anomaly ? "Anomaly" : "Normal");

      setData((prevData) => [...prevData.slice(-10), mockData]);
    };

    const interval = setInterval(generateMockData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 animate-slide-in-left flex items-center gap-2">
        <FaPlug className="text-blue-700 animate-spin-slow" />
        Smart Power Grid Dashboard
      </h1>

      {/* Status Card */}
      <div 
        className={`mb-8 p-6 rounded-xl shadow-xl bg-white transform transition-all duration-500
          ${status === "Anomaly" ? "border-4 border-red-500 animate-pulse-glow" : "border-4 border-teal-500"}`}
      >
        <p className="text-xl font-semibold flex items-center gap-3">
          <span className="relative flex h-4 w-4">
            <span 
              className={`animate-ping absolute inline-flex h-full w-full rounded-full 
                ${status === "Anomaly" ? "bg-red-400" : "bg-teal-400"} opacity-75`}
            ></span>
            <span 
              className={`relative inline-flex rounded-full h-4 w-4 
                ${status === "Anomaly" ? "bg-red-500" : "bg-teal-500"}`}
            ></span>
          </span>
          Anomaly Status:{" "}
          <span 
            className={`font-bold text-xl animate-fade-in 
              ${status === "Anomaly" ? "text-red-600" : "text-teal-600"}`}
          >
            {status}
          </span>
        </p>
      </div>

      {/* Prediction Button */}
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold
            hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
            shadow-lg hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] animate-bounce-slow group"
          onClick={() => {}}
        >
          <FaCalendarAlt className="text-xl group-hover:animate-spin-slow" />
          <span>Predict Future Energy</span>
        </button>
      </div>

      {/* Separate Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Voltage Chart */}
        <div className="bg-white p-6 rounded-xl shadow-xl animate-slide-in-right">
          <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
            <FaBolt /> Voltage
          </h2>
          <LineChart width={window.innerWidth < 768 ? 300 : 350} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(tick) => new Date(tick * 1000).toLocaleTimeString()}
              stroke="#4b5563"
              fontSize={12}
            />
            <YAxis stroke="#4b5563" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            />
            <Line 
              type="monotone" 
              dataKey="voltage" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ r: 5, fill: "#8b5cf6" }}
              activeDot={{ r: 8 }}
              animationDuration={1200}
            />
          </LineChart>
        </div>

        {/* Current Chart */}
        <div className="bg-white p-6 rounded-xl shadow-xl animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center gap-2">
            <FaPlug /> Current
          </h2>
          <LineChart width={window.innerWidth < 768 ? 300 : 350} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(tick) => new Date(tick * 1000).toLocaleTimeString()}
              stroke="#4b5563"
              fontSize={12}
            />
            <YAxis stroke="#4b5563" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ r: 5, fill: "#10b981" }}
              activeDot={{ r: 8 }}
              animationDuration={1200}
            />
          </LineChart>
        </div>

        {/* Frequency Chart */}
        <div className="bg-white p-6 rounded-xl shadow-xl animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
            <FaWaveSquare /> Frequency
          </h2>
          <LineChart width={window.innerWidth < 768 ? 300 : 350} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(tick) => new Date(tick * 1000).toLocaleTimeString()}
              stroke="#4b5563"
              fontSize={12}
            />
            <YAxis stroke="#4b5563" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            />
            <Line 
              type="monotone" 
              dataKey="frequency" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ r: 5, fill: "#f59e0b" }}
              activeDot={{ r: 8 }}
              animationDuration={1200}
            />
          </LineChart>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Voltage", value: data[data.length - 1]?.voltage || "N/A", unit: "V", icon: <FaBolt />, color: "text-purple-600" },
          { label: "Current", value: data[data.length - 1]?.current || "N/A", unit: "A", icon: <FaPlug />, color: "text-teal-600" },
          { label: "Frequency", value: data[data.length - 1]?.frequency || "N/A", unit: "Hz", icon: <FaWaveSquare />, color: "text-orange-600" },
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl 
              transform hover:-translate-y-2 transition-all duration-300
              animate-zoom-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex items-center gap-3">
              <span className={`text-3xl ${stat.color} animate-bounce-slow`}>
                {stat.icon}
              </span>
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stat.value} <span className="text-lg text-gray-600">{stat.unit}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Energy Prediction Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 rounded-xl shadow-2xl animate-fade-in-up">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <FaCalendarAlt className="text-yellow-300 animate-pulse" />
          Future Energy Prediction
        </h2>
        {predictionData.length > 0 ? (
          <LineChart width={window.innerWidth < 768 ? 300 : 800} height={400} data={predictionData} className="mx-auto">
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(tick) => new Date(tick * 1000).toLocaleTimeString()}
              stroke="#fff"
              fontSize={14}
            />
            <YAxis stroke="#fff" fontSize={14} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px", color: "#fff", fontSize: "14px" }} />
            <Line 
              type="monotone" 
              dataKey="voltage" 
              stroke="#a78bfa" // Lighter purple
              strokeWidth={3}
              dot={{ r: 5, fill: "#a78bfa" }}
              activeDot={{ r: 8 }}
              animationDuration={1200}
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="#34d399" // Lighter teal
              strokeWidth={3}
              dot={{ r: 5, fill: "#34d399" }}
              activeDot={{ r: 8 }}
              animationDuration={1200}
            />
            <Line 
              type="monotone" 
              dataKey="frequency" 
              stroke="#fbbf24" // Lighter orange
              strokeWidth={3}
              dot={{ r: 5, fill: "#fbbf24" }}
              activeDot={{ r: 8 }}
              animationDuration={1200}
            />
          </LineChart>
        ) : (
          <div className="text-white text-lg opacity-75 animate-pulse">
            Select a date above to see future energy predictions...
          </div>
        )}
      </div>
    </div>
  );
};

// Updated animations
const styles = `
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translate ostentX(0); }
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
`;

// Add to your CSS file or <style> tag in index.html
// <style>{styles}</style>

export default Dashboard;