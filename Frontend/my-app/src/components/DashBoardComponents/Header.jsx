import React from "react";
import { FaPlug } from "react-icons/fa";

const Header = () => (
  <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 animate-slide-in-left flex items-center gap-2">
    <FaPlug className="text-blue-700 animate-spin-slow" />
    Smart Power Grid Dashboard
  </h1>
);

export default Header;