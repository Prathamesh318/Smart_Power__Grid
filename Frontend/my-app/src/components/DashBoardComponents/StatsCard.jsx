import React from "react";

const StatsCard = ({ label, value, unit, icon, color, delay }) => (
  <div
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl 
      transform hover:-translate-y-2 transition-all duration-300
      animate-zoom-in"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center gap-3">
      <span className={`text-3xl ${color} animate-bounce-slow`}>{icon}</span>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-800">
          {value} <span className="text-lg text-gray-600">{unit}</span>
        </p>
      </div>
    </div>
  </div>
);

export default StatsCard;