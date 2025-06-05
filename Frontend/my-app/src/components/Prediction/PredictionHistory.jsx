import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

const PredictionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/predictions/history", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  },    []);

  return (
    <>
        <Navbar />
     <div className="min-h-screen w-full p-8 bg-white relative overflow-hidden">
      {/* Subtle grid-like background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h40v1H0zM0 0v40h1V0z%22 fill=%22%23bfdbfe%22 fill-opacity=%220.1%22/%3E%3C/svg%3E')] opacity-10"></div>
      
      <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-8 relative z-10">
        Prediction History
      </h3>

      {loading ? (
        <div className="text-center py-12 text-blue-500 animate-pulse">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16M8 4v16M12 4v16M16 4v16M20 4v16" />
          </svg>
          <span className="text-lg">Loading Predictions...</span>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
          </svg>
          <span className="text-lg">No predictions found in the grid.</span>
        </div>
      ) : (
        <div className="w-full relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-green-100 text-gray-800">
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Predicted Load</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Requested At</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200">
                    <td className="py-4 px-6 text-gray-700">
                      {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{item.predicted_energy_load}</td>
                    <td className="py-4 px-6 text-gray-700">
                      {item.requested_at ? new Date(item.requested_at).toLocaleString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </>
   
  );
};

export default PredictionHistory;