import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { Settings, Users, Film, LogOut } from 'lucide-react';
import traceLogo from '../assets/trace_tree_transparent.png';

const Portal = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen cinematic-gradient parchment-texture">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={traceLogo} 
              alt="TraceFilms" 
              className="h-12 w-auto tree-shadow"
            />
            <div>
              <h1 className="sanskrit-text text-2xl font-bold text-primary">TraceFilms</h1>
              <p className="text-sm text-muted-foreground">Digital Stronghold</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.username}
            </span>
            {user?.is_admin && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/admin'}
                className="border-primary/20"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-primary"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12 portal-entrance">
          <h2 className="sanskrit-text text-4xl font-bold text-primary mb-4">
            The Portal Awaits
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to your creative sanctuary. Here, stories take shape and visions become reality.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* SceneForge Card */}
          <Card className="mythic-glow elegant-transition hover:scale-105 border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Film className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary">SceneForge</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Your visual storyboard manager. Forge ideas into cinematic reality with AI-powered tools.
              </p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  // Open SceneForge in new tab/window
                  window.open('/sceneforge', '_blank');
                }}
              >
                Enter SceneForge
              </Button>
            </CardContent>
          </Card>

          {/* Coming Soon Cards */}
          <Card className="border-muted/50 bg-muted/20 backdrop-blur-sm opacity-60">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-muted/20 rounded-full w-fit">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl text-muted-foreground">Project Vault</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Secure storage and collaboration for your creative projects.
              </p>
              <Button variant="outline" disabled className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="border-muted/50 bg-muted/20 backdrop-blur-sm opacity-60">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-muted/20 rounded-full w-fit">
                <Settings className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl text-muted-foreground">Asset Library</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Centralized repository for all your creative assets and references.
              </p>
              <Button variant="outline" disabled className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Stronghold Status</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Access Level</p>
                  <p className="font-medium">{user?.is_admin ? 'Administrator' : 'Approved User'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Login</p>
                  <p className="font-medium">
                    {user?.last_login ? new Date(user.last_login).toLocaleDateString() : 'First visit'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Portal;

