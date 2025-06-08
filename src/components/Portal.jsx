import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SceneForgeApp from './sceneforge/SceneForgeApp';

const Portal = () => {
  const { user, logout, isAdmin } = useAuth();

  const handleSceneForgeAccess = () => {
    // SceneForge is now embedded locally - no external URLs
    console.log('Opening embedded SceneForge...');
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Sanskrit Text, serif' }}>
                TraceFilms Portal
              </h1>
              <p className="text-gray-600 mt-1">Welcome, {user?.username}</p>
            </div>
            <div className="flex space-x-4">
              {isAdmin && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Admin Panel
                </button>
              )}
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Portal Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SceneForge Access */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">SceneForge</h2>
            <p className="text-gray-600 mb-4">
              Access your visual storyboard and script management tool.
            </p>
            <button 
              onClick={handleSceneForgeAccess}
              className="w-full py-3 px-4 text-white font-medium rounded-md transition-colors hover:bg-opacity-90"
              style={{ backgroundColor: '#693914' }}
            >
              Open SceneForge
            </button>
          </div>

          {/* Project Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
            <p className="text-gray-600 mb-4">
              Manage your film projects and creative assets.
            </p>
            <button className="w-full py-3 px-4 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors">
              View Projects
            </button>
          </div>
        </div>

        {/* Embedded SceneForge */}
        <div className="mt-8">
          <SceneForgeApp />
        </div>
      </div>
    </div>
  );
};

export default Portal;

