import React from "react";



const StatusCard = ({ status,anamoly }) => (
  <div
    className={`mb-8 p-6 rounded-xl shadow-xl bg-white transform transition-all duration-500
      ${anamoly === "Anomaly" ? "border-4 border-red-500 animate-pulse-glow" : "border-4 border-teal-500"}`}
  >
    <p className="text-xl font-semibold flex items-center gap-3">
      <span className="relative flex h-4 w-4">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full 
            ${anamoly === "Anomaly" ? "bg-red-400" : "bg-teal-400"} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-4 w-4 
            ${  anamoly === "Anomaly" ? "bg-red-500" : "bg-teal-500"}`}
        ></span>
      </span>
      Anomaly Status:{" "}
      <span
        className={`font-bold text-xl animate-fade-in 
          ${anamoly === "Anomaly" ? "text-red-600" : "text-teal-600"}`}
      >
        {status}
      </span>
    </p>
  </div>
);



export default StatusCard;