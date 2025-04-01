import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import Dashboard from './components/DashBoard.jsx';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your App with BrowserRouter */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/*" element={<App/>} /> {/* all other routes including "/" render App. */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);