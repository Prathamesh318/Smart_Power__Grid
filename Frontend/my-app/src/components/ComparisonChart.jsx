import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";

// Data for the radar chart
const data = [
  { subject: "Performance", A: 9, B: 6, C: 7, D: 5, E: 8, F: 6, G: 7, H: 6, I: 6 },
  { subject: "Anomaly Detection", A: 7, B: 0, C: 0, D: 7, E: 0, F: 0, G: 0, H: 0, I: 0 },
  { subject: "Visualization", A: 8, B: 0, C: 0, D: 4, E: 6, F: 5, G: 0, H: 0, I: 0 },
  { subject: "Methodology", A: 7, B: 8, C: 9, D: 6, E: 7, F: 6, G: 6, H: 8, I: 8 },
];
const labels = ["Our Project", "Paper 1", "Paper 2", "Paper 3", "Paper 4", "Paper 5", "Paper 6", "Paper 7", "Paper 8"];

const ComparisonChart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-6 text-white">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center animate-fade-in-up">
        Comparative Analysis: Our LSTM-Based Smart Grid Solution vs. Research Papers
      </h2>

      {/* Radar Chart Container with White Background */}
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <RadarChart outerRadius={150} width={600} height={400} data={data}>
            <PolarGrid stroke="#d1d5db" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              stroke="#4b5563" // Dark gray for contrast on white background
              tick={{ fontSize: 14, fill: "#4b5563" }}
              style={{ fontWeight: "bold" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 10]}
              stroke="#4b5563"
              tick={{ fontSize: 12, fill: "#4b5563" }}
              tickCount={6}
            />
            <Radar
              name="Our Project"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
              dot={false}
            />
            <Radar
              name="Paper 1"
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
              dot={false}
            />
            <Radar
              name="Paper 2"
              dataKey="C"
              stroke="#ff7300"
              fill="#ff7300"
              fillOpacity={0.6}
              dot={false}
            />
            <Radar
              name="Paper 3"
              dataKey="D"
              stroke="#ff4040"
              fill="#ff4040"
              fillOpacity={0.6}
              dot={false}
            />
            <Radar
              name="Paper 4"
              dataKey="E"
              stroke="#00a8cc"
              fill="#00a8cc"
              fillOpacity={0.6}
              dot={false}
            />
            <Radar
              name="Paper 5"
              dataKey="F"
              stroke="#cc00a8"
              fill="#cc00a8"
              fillOpacity={0.6}
              dot={false}
            />
            <Radar
              name="Paper 6"
              dataKey="G"
              stroke="#a800cc"
              fill="#a800cc"
              fillOpacity={0.6}
              dot={false}
            />
            <Radar
              name="Paper 7"
              dataKey="H"
              stroke="#00ccaa"
              fill="#00ccaa"
              fillOpacity={0.6}
              dot={false}
            />
            <Radar
              name="Paper 8"
              dataKey="I"
              stroke="#ccaa00"
              fill="#ccaa00"
              fillOpacity={0.6}
              dot={false}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ color: "#4b5563", fontSize: "14px", paddingTop: "20px" }}
            />
          </RadarChart>
        </div>
      </div>

      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
      `}</style>
    </div>
  );
};

export default ComparisonChart;