import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { FaCalendarAlt } from "react-icons/fa";

const EnergyPrediction = ({ predictionData }) => (
  <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 rounded-xl shadow-2xl animate-fade-in-up">
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
      <FaCalendarAlt className="text-yellow-300 animate-pulse" />
      Future Energy Prediction
    </h2>
    {predictionData.length > 0 ? (
      <BarChart width={window.innerWidth < 768 ? 300 : 800} height={400} data={predictionData} className="mx-auto">
        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
        <XAxis dataKey="date" stroke="#fff" fontSize={14} />
        <YAxis
          stroke="#fff"
          fontSize={14}
          label={{
            value: "Energy Load (kWh)",
            angle: -90,
            position: "insideLeft",
            fill: "#fff",
            fontSize: 14,
          }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
          formatter={(value) => `${value} kWh`}
        />
        <Bar dataKey="energy" fill="#34d399" barSize={50} animationDuration={1200} />
      </BarChart>
    ) : (
      <div className="text-white text-lg opacity-75 animate-pulse">
        Select a date above to see future energy predictions...
      </div>
    )}
  </div>
);

export default EnergyPrediction;