
import React, { useEffect } from 'react';
import GameRoom from '../components/GameRoom';

const Index = () => {
  useEffect(() => {
    // Add custom pixel font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Add style for pixel font
    const style = document.createElement('style');
    style.textContent = `
      .font-pixel {
        font-family: 'Press Start 2P', cursive;
      }
      * {
        image-rendering: pixelated;
      }
    `;
    document.head.appendChild(style);
    
    // ESC key to close any modals
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // This will be handled by the modal component
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden font-pixel">
      <GameRoom />
    </div>
  );
};

export default Index;
