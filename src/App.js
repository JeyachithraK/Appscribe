// src/App.jsx

// --- IMPORTANT ---
// This code uses react-router-dom v6. If you see an error like "'Routes' is not exported",
// run the following command in your terminal to install the correct version:
// npm install react-router-dom@6

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage'; // <-- Your new import

// The main <BrowserRouter> should wrap <App /> in your index.js file, not here.


  return (
    <Routes>
      {/* The root path now correctly points to your LandingPage */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Route for the login page */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Route for the dashboard page */}
      {/* This will eventually be a protected route */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* A "catch-all" route for any other path */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
