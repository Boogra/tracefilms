import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, register, loading } = useAuth();
  const [isRequestAccess, setIsRequestAccess] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Environment variables for admin credentials
  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || 'vaughn';
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'TraceFilms2024!';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isRequestAccess) {
        await register(formData.username, formData.email, formData.password);
        toast.success('Access request submitted for approval');
        setIsRequestAccess(false);
        setFormData({ username: '', email: '', password: '' });
      } else {
        await login(formData.username, formData.password);
        toast.success('Welcome to TraceFilms');
        onClose();
      }
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    }
  };

  const toggleMode = () => {
    setIsRequestAccess(!isRequestAccess);
    setFormData({ username: '', email: '', password: '' });
  };

  const handleQuickLogin = () => {
    setFormData({
      ...formData,
      username: adminUsername,
      password: adminPassword
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(/src/assets/parchment_background.png)`,
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl font-light transition-colors z-10"
        >
          ×
        </button>

        <div className="p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 
              className="text-3xl font-light text-gray-800 mb-2"
              style={{ fontFamily: 'Sanskrit Text, serif' }}
            >
              {isRequestAccess ? 'Request Access' : 'Enter the Stronghold'}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white bg-opacity-90 transition-all duration-200 text-gray-800"
                style={{ fontFamily: 'EB Garamond, serif' }}
                required
              />
            </div>

            {isRequestAccess && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white bg-opacity-90 transition-all duration-200 text-gray-800"
                  style={{ fontFamily: 'EB Garamond, serif' }}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white bg-opacity-90 transition-all duration-200 text-gray-800"
                style={{ fontFamily: 'EB Garamond, serif' }}
                required
              />
            </div>

            {/* Quick Admin Login (Development) */}
            {!isRequestAccess && process.env.NODE_ENV === 'development' && (
              <button
                type="button"
                onClick={handleQuickLogin}
                className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                style={{ fontFamily: 'EB Garamond, serif' }}
              >
                Quick Admin Login
              </button>
            )}

            {/* Enter Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:transform-none"
              style={{ 
                backgroundColor: '#693914',
                fontFamily: 'EB Garamond, serif',
                fontSize: '18px',
                letterSpacing: '0.5px'
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Enter'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors underline"
              style={{ fontFamily: 'EB Garamond, serif' }}
            >
              {isRequestAccess ? 'Already have access? Sign in' : 'Need access? Request invitation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

