
import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface CharacterProps {
  position: Position;
}

const Character = ({ position }: CharacterProps) => {
  return (
    <div
      className="absolute transition-all duration-100 ease-linear z-20"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '40px',
        height: '40px',
      }}
    >
      {/* Character Sprite - Pixel Art Style */}
      <div className="w-full h-full relative">
        {/* Shadow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black bg-opacity-20 rounded-full" />
        
        {/* Character Body */}
        <div className="w-full h-full flex flex-col items-center justify-end">
          {/* Head */}
          <div className="w-6 h-6 bg-amber-600 border-2 border-amber-800 rounded-full mb-1" />
          
          {/* Body */}
          <div className="w-5 h-4 bg-blue-600 border-2 border-blue-800 rounded-sm" />
          
          {/* Legs */}
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-gray-700 rounded-sm" />
            <div className="w-1 h-3 bg-gray-700 rounded-sm" />
          </div>
        </div>
        
        {/* Floating indicator */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-500 animate-bounce">
          ⭐
        </div>
      </div>
    </div>
  );
};

export default Character;
