import React, { useState } from 'react';
import { Bot, LogIn, Github, Mail, Chrome } from 'lucide-react';

const LoginPage = ({ onLoginSuccess, onNavigateBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Define the same theme colors from your LandingPage
  const theme = {
    colors: {
      background: '#0a192f',
      primary: '#00c6ff',
      text: '#ccd6f6',
      textLight: '#8892b0',
      card: '#112240',
      border: '#1e2d50',
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate an API call with a 1.5-second delay
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // Mock login logic with hardcoded credentials for demonstration
      if (username === 'testuser' && password === 'password') {
        onLoginSuccess(username);
      } else {
        throw new Error('Invalid username or password.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper component for social login buttons
  const SocialAuthButton = ({ icon, label, onClick }) => (
    <button 
      type="button" 
      onClick={onClick} 
      className="flex items-center justify-center w-full px-4 py-3 rounded-lg border transition-colors duration-200 hover:bg-opacity-80"
      style={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border,
        color: theme.colors.text,
      }}
    >
      {icon}
      <span className="ml-3 font-semibold text-sm">{label}</span>
    </button>
  );

  return (
    <div 
      style={{ backgroundColor: theme.colors.background, color: theme.colors.text }} 
      className="min-h-screen font-sans antialiased flex flex-col justify-center items-center p-4 sm:p-8"
    >
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header with App Logo and Title */}
        <div className="text-center mb-10">
          <Bot size={50} style={{ color: theme.colors.primary }} className="mx-auto" />
          <h1 className="text-4xl font-extrabold mt-4 tracking-tight">AppScribe</h1>
          <p className="mt-2 text-base" style={{ color: theme.colors.textLight }}>Log in to continue your work.</p>
        </div>

        {/* Login Form Container */}
        <div 
          className="p-8 sm:p-10 rounded-2xl shadow-2xl transition-all duration-300"
          style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.border}` }}
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div 
                className="bg-red-900 bg-opacity-30 border border-red-900 text-red-300 px-4 py-3 rounded-lg relative" 
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textLight }} htmlFor="username">
                Username
              </label>
              <input 
                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-opacity-50 text-white" 
                style={{
                  backgroundColor: theme.colors.background,
                  border: `1px solid ${theme.colors.border}`,
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                type="text" 
                id="username" 
                placeholder="e.g., testuser"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textLight }} htmlFor="password">
                Password
              </label>
              <input 
                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-opacity-50 text-white" 
                style={{
                  backgroundColor: theme.colors.background,
                  border: `1px solid ${theme.colors.border}`,
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                type="password" 
                id="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              className="w-full font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                transform: isLoading ? 'scale(0.98)' : 'scale(1)',
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : (
                <>
                  <LogIn size={20} className="mr-2" /> Log In
                </>
              )}
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px" style={{ backgroundColor: theme.colors.border }}></div>
            <span className="px-4 text-sm" style={{ color: theme.colors.textLight }}>or</span>
            <div className="flex-grow h-px" style={{ backgroundColor: theme.colors.border }}></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <SocialAuthButton icon={<Chrome size={20} />} label="Login with Google" onClick={() => alert('Google login clicked!')}/>
            <SocialAuthButton icon={<Github size={20} />} label="Login with GitHub" onClick={() => alert('GitHub login clicked!')}/>
            <SocialAuthButton icon={<Mail size={20} />} label="Login with Microsoft" onClick={() => alert('Microsoft login clicked!')}/>
          </div>
        </div>

        {/* Sign Up / Back to Home Link */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: theme.colors.textLight }}>
            Don't have an account? 
            <button 
              onClick={onNavigateBack} 
              className="text-sm font-semibold ml-2 transition-colors duration-200 hover:text-white"
              style={{ color: theme.colors.primary }}
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
