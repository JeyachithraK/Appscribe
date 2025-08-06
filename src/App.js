// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
// import SignupPage from './pages/SignupPage';
import ProjectView from './pages/ProjectView';

function App() {
  // This state will hold the username of the logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // This function will be passed to the LoginPage
  const handleLoginSuccess = (username) => {
    setCurrentUser(username);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Pass the handleLoginSuccess function to the LoginPage */}
      <Route 
        path="/login" 
        element={<LoginPage onLoginSuccess={handleLoginSuccess} />} 
      />
      
      {/* <Route path="/signup" element={<SignupPage />} /> */}

      {/* This is now a "protected" route */}
      <Route 
        path="/dashboard" 
        element={
          currentUser ? (
            <DashboardPage username={currentUser} />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      
      {/* --- THIS ROUTE IS NOW PROTECTED --- */}
      <Route 
        path="/project/:id" 
        element={
          currentUser ? (
            <ProjectView />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
