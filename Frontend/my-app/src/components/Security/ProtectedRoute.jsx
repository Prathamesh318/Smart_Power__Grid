// src/ProtectedRoute.js
import React from "react";

import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    console.log("Email from query params:", email);
    if (email) {
      localStorage.setItem("userEmail", email);
      // Optionally, remove the query param from the URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const isLoggedIn = !!localStorage.getItem("userEmail");
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
