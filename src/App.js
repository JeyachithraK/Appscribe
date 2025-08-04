import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  // This state controls which page is visible. 'login' is the default.
  const [page, setPage] = useState('login'); 

  // A simple switch to render the correct page based on the state.
  // In a larger app, you would use a library like React Router.
  switch (page) {
    case 'dashboard':
      return <DashboardPage setPage={setPage} />;
    case 'login':
    default:
      return <LoginPage setPage={setPage} />;
  }
}
