import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const MetricChart = ({ title, icon, dataKey, strokeColor, fillColor, data, delay }) => (
  <div className="bg-white p-6 rounded-xl shadow-xl animate-slide-in-right" style={{ animationDelay: delay }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: strokeColor }}>
      {icon} {title}
    </h2>
    <LineChart width={window.innerWidth < 768 ? 300 : 350} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
        stroke="#4b5563"
        fontSize={12}
      />
      <YAxis stroke="#4b5563" fontSize={12} />
      <Tooltip
        contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
      />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={strokeColor}
        strokeWidth={3}
        dot={{ r: 5, fill: fillColor }}
        activeDot={{ r: 8 }}
        animationDuration={1200}
      />
    </LineChart>
  </div>
);

export default MetricChart;