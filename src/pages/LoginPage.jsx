import React from 'react';
import Icon from '../components/Icon';

const LoginPage = ({ setPage }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you'd call your auth service here.
    // For the MVP, we just switch the page state.
    setPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <Icon path="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" className="w-12 h-12 text-indigo-600 mx-auto"/>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Appscribe</h1>
            <p className="text-gray-600 mt-2">Log in to your developer dashboard.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <input 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                type="email" 
                id="email" 
                placeholder="you@example.com"
                defaultValue="developer@example.com" // MVP default
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                type="password" 
                id="password" 
                defaultValue="password" // MVP default
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-indigo-700 transition-all duration-200"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;