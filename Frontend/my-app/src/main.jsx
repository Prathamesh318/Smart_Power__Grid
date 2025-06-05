import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import App from './App.jsx';
import Dashboard from './components/DashBoardComponents/DashBoard.jsx';
import ComparisonChart from './components/ComparisonChart.jsx';
import ProtectedRoute from './components/Security/ProtectedRoute.jsx';
import UserList from './components/UserList/UserList.jsx';
import PredictionHistory from './components/Prediction/PredictionHistory.jsx';
// import UserList from './components/UserList/UserList.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/graphs" 
          element={
            <ProtectedRoute>
              <ComparisonChart />
            </ProtectedRoute>
          } 
        />
        <Route path="/*" element={<App />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/prediction-history"
          element={
            <ProtectedRoute>
              <PredictionHistory/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
