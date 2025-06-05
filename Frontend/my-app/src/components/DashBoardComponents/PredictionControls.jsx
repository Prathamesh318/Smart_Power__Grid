import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PredictionControls = ({ showDatePicker, setShowDatePicker, selectedDate, handleDateChange }) => (
  <div className="flex justify-end mb-6 relative">
    <button
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold
        hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
        shadow-lg hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] animate-bounce-slow group"
      onClick={() => setShowDatePicker(!showDatePicker)}
    >
      <FaCalendarAlt className="text-xl group-hover:animate-spin-slow" />
      <span>Predict Future Energy</span>
    </button>
    {showDatePicker && (
      <div className="absolute top-14 right-0 z-10 animate-fade-in">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          inline
          className="rounded-lg shadow-lg border border-gray-300"
        />
      </div>
    )}
  </div>
);

export default PredictionControls;