import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const EnergyForecast = () => {
  const [forecastData, setForecastData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");

  const fetchForecast = async (range) => {
    setSelectedRange(range);
    try {
      const response = await fetch(`http://localhost:8000/forecast?range=${range}`);
      const result = await response.json();
      setForecastData(result.forecast);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Energy Forecast Dashboard</h1>

      <div className="mb-4">
        <button onClick={() => fetchForecast("next_day")} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          Next Day
        </button>
        <button onClick={() => fetchForecast("next_month")} className="mr-2 px-4 py-2 bg-green-500 text-white rounded">
          Next Month
        </button>
        <button onClick={() => fetchForecast("next_year")} className="mr-2 px-4 py-2 bg-orange-500 text-white rounded">
          Next Year
        </button>
        <input
          type="date"
          onChange={(e) => fetchForecast(e.target.value)}
          className="px-4 py-2 border rounded"
        />
      </div>

      {forecastData.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">Forecast for {selectedRange}</h2>
          <LineChart width={600} height={300} data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="predicted_power" stroke="#8884d8" />
          </LineChart>
        </>
      )}
    </div>
  );
};

export default EnergyForecast;
