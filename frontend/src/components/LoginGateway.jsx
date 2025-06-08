import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import treeLogoTransparent from '../assets/trace_tree_transparent.png';

const LoginGateway = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        await login(formData.username, formData.password);
      } else {
        await register(formData.username, formData.email, formData.password);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cinematic Banner with Breathing Room */}
      <div className="trace-banner-container">
        <div className="trace-banner">
          <div className="trace-banner-content">
            <div className="trace-text">TRACE</div>
            
            <div 
              className="tree-logo-container cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <img 
                src={treeLogoTransparent} 
                alt="TraceFilms Tree Logo" 
                className="tree-logo"
              />
            </div>
            
            <div className="trace-text">FILMS</div>
          </div>
        </div>
      </div>

      {/* Spacer for content */}
      <div className="flex-1"></div>

      {/* Discreet login button */}
      <div className="login-button-container">
        <button
          onClick={() => setShowModal(true)}
          className="login-button"
        >
          Login
        </button>
      </div>

      {/* Login Modal */}
      {showModal && (
        <div className="login-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-content">
              {/* Header with close button */}
              <div className="login-modal-header">
                <button
                  onClick={() => setShowModal(false)}
                  className="close-button"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              {/* Tab buttons */}
              <div className="login-tabs">
                <button
                  className={`login-tab ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => handleTabChange('login')}
                >
                  Login
                </button>
                <button
                  className={`login-tab ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => handleTabChange('register')}
                >
                  Request Access
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="login-form">
                {activeTab === 'login' ? (
                  <>
                    <div className="form-group">
                      <label className="form-label">Username or Email</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username or email"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="form-input"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Choose a username"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        className="form-input"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-button"
                >
                  {isLoading ? 'Processing...' : 'Enter'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginGateway;

