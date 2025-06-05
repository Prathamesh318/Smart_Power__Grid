import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBolt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("userEmail");
    window.location.href = "http://localhost:5000/logout";
  };

  return (
    <nav className="w-full bg-white shadow-lg relative z-20">
      <div className="max-w-full mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <FaBolt className="text-3xl text-blue-600 animate-pulse" />
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Smart Grid
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200 hover:bg-blue-50 px-4 py-2 rounded-md"
          >
            Dashboard
          </Link>
          <Link
            to="/users"
            className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200 hover:bg-blue-50 px-4 py-2 rounded-md"
          >
            Users
          </Link>
          <Link
            to="/prediction-history"
            className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200 hover:bg-blue-50 px-4 py-2 rounded-md"
          >
            Prediction History
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out flex items-center gap-2"
        >
          <FaBolt className="text-yellow-300" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;