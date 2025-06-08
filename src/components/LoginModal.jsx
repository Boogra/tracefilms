import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, register, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
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
      if (activeTab === 'login') {
        await login(formData.username, formData.password);
        toast.success('Welcome to TraceFilms');
        onClose();
      } else {
        await register(formData.username, formData.email, formData.password);
        toast.success('Registration request submitted for approval');
        setActiveTab('login');
        setFormData({ username: '', email: '', password: '' });
      }
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    }
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-md w-full relative"
        style={{
          backgroundImage: `url(/src/assets/parchment_background.png)`,
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-light"
        >
          ×
        </button>

        <div className="p-8">
          {/* Tab Navigation */}
          <div className="flex mb-6 border-b border-gray-300">
            <button
              className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                activeTab === 'login'
                  ? 'text-white bg-opacity-80 border-b-2 border-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{ backgroundColor: activeTab === 'login' ? '#693914' : 'transparent' }}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                activeTab === 'register'
                  ? 'text-white bg-opacity-80 border-b-2 border-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{ backgroundColor: activeTab === 'register' ? '#693914' : 'transparent' }}
              onClick={() => setActiveTab('register')}
            >
              Request Access
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white bg-opacity-90"
                style={{ focusRingColor: '#693914' }}
                required
              />
            </div>

            {activeTab === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white bg-opacity-90"
                  style={{ focusRingColor: '#693914' }}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white bg-opacity-90"
                style={{ focusRingColor: '#693914' }}
                required
              />
            </div>

            {/* Quick Admin Login (Development) */}
            {activeTab === 'login' && process.env.NODE_ENV === 'development' && (
              <button
                type="button"
                onClick={handleQuickLogin}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Quick Admin Login
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-white font-medium rounded-md transition-colors hover:bg-opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#693914' }}
            >
              {loading ? 'Processing...' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

