import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import treeLogoSrc from '../assets/trace_tree_transparent.png';
import parchmentBg from '../assets/parchment_background.png';

const LoginGateway = () => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // If authenticated, don't render the gateway
  if (isAuthenticated) {
    return null;
  }

  const handleTreeClick = () => {
    setShowModal(true);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${parchmentBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}
    >
      {/* Centered Full-Width Banner - Perfectly Centered in Viewport */}
      <div className="w-full flex items-center justify-center">
        <div 
          className="w-full py-20 px-8 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-opacity-90"
          style={{ 
            backgroundColor: '#110D0C',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            width: '100vw'
          }}
          onClick={handleTreeClick}
        >
          <div className="flex items-center justify-center max-w-6xl w-full">
            {/* TRACE Text */}
            <div className="flex-1 text-right pr-12">
              <h1 
                className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.3em] text-white select-none"
                style={{ fontFamily: 'Sanskrit Text, serif' }}
              >
                TRACE
              </h1>
            </div>

            {/* Tree Logo - Seamlessly Integrated (No Borders/Shadows) */}
            <div className="flex-shrink-0 mx-8">
              <img 
                src={treeLogoSrc} 
                alt="TraceFilms Tree" 
                className="h-24 md:h-32 lg:h-36 w-auto transition-all duration-300 hover:scale-105 select-none"
                style={{ 
                  filter: 'brightness(1.1) contrast(1.1)',
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none'
                }}
                draggable={false}
              />
            </div>

            {/* FILMS Text */}
            <div className="flex-1 text-left pl-12">
              <h1 
                className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.3em] text-white select-none"
                style={{ fontFamily: 'Sanskrit Text, serif' }}
              >
                FILMS
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showModal && (
        <LoginModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default LoginGateway;

