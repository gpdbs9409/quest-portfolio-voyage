
import React, { useEffect } from 'react';
import GameRoom from '../components/GameRoom';

const Index = () => {
  useEffect(() => {
    // ESC key to close any modals
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // This will be handled by the modal component
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <GameRoom />
    </div>
  );
};

export default Index;
