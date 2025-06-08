import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import LoginGateway from './components/LoginGateway';
import Portal from './components/Portal';
import './App.css';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state briefly, then default to showing the page
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="clean-interface">
      {isAuthenticated ? <Portal /> : <LoginGateway />}
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'var(--tf-parchment)',
            border: '1px solid var(--tf-primary-brown)',
            color: 'var(--tf-dark-brown)',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

