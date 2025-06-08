import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { X } from 'lucide-react';
import traceLogo from '../assets/trace_tree_transparent.png';

const LoginGateway = () => {
  const { login, register } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await login(loginForm.username, loginForm.password);
    
    if (result.success) {
      setShowModal(false);
      setMessage({ type: 'success', text: 'Welcome to the stronghold!' });
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await register(registerForm.username, registerForm.email, registerForm.password);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setRegisterForm({ username: '', email: '', password: '' });
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    
    setLoading(false);
  };

  const openLoginModal = () => {
    setIsLogin(true);
    setShowModal(true);
    setMessage({ type: '', text: '' });
  };

  const openRegisterModal = () => {
    setIsLogin(false);
    setShowModal(true);
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Banner Section */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          className="w-full max-w-4xl mx-auto bg-black py-16 px-8 cursor-pointer hover:bg-gray-900 transition-colors duration-300"
          onClick={openLoginModal}
        >
          <div className="flex items-center justify-center space-x-12">
            {/* TRACE Text */}
            <div className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.3em] uppercase">
              TRACE
            </div>
            
            {/* Tree Logo */}
            <div className="flex-shrink-0">
              <img 
                src={traceLogo} 
                alt="TraceFilms Tree" 
                className="h-24 w-auto md:h-32 lg:h-40 filter brightness-110"
              />
            </div>
            
            {/* FILMS Text */}
            <div className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.3em] uppercase">
              FILMS
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Login Hint */}
      <div className="absolute bottom-8 right-8">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={openLoginModal}
          className="text-gray-400 hover:text-gray-600 text-xs"
        >
          Login
        </Button>
      </div>

      {/* Login/Register Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-amber-50 to-orange-50 border-primary/20">
          <DialogHeader className="relative">
            <DialogTitle className="text-center text-2xl text-primary mb-4">
              Enter the Stronghold
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 h-8 w-8 p-0"
              onClick={() => setShowModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          {/* Tab Buttons */}
          <div className="flex mb-6">
            <Button
              variant={isLogin ? "default" : "outline"}
              className="flex-1 mr-2"
              onClick={() => {
                setIsLogin(true);
                setMessage({ type: '', text: '' });
              }}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "outline"}
              className="flex-1 ml-2"
              onClick={() => {
                setIsLogin(false);
                setMessage({ type: '', text: '' });
              }}
            >
              Request Access
            </Button>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              message.type === 'error' 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-primary">Username or Email</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username or email"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-primary">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Entering...' : 'Enter Portal'}
              </Button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="reg-username" className="text-primary">Username</Label>
                <Input
                  id="reg-username"
                  type="text"
                  placeholder="Choose a username"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="reg-email" className="text-primary">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="reg-password" className="text-primary">Password</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="Create a password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <div className="text-xs text-muted-foreground bg-amber-50 p-3 rounded border border-amber-200">
                <strong>Note:</strong> Access requests require manual approval. You will be notified once your account is reviewed.
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Request Access'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginGateway;

