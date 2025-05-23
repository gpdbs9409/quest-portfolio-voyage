
import React, { useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface RoomObjectData {
  id: string;
  name: string;
  position: Position;
  size: { width: number; height: number };
  content: {
    title: string;
    description: string;
    links?: { text: string; url: string }[];
  };
}

interface RoomObjectProps {
  object: RoomObjectData;
  onClick: () => void;
}

const RoomObject = ({ object, onClick }: RoomObjectProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getObjectIcon = (id: string) => {
    switch (id) {
      case 'bed':
        return '🛏️';
      case 'bookshelf':
        return '📚';
      case 'computer':
        return '🖥️';
      case 'printer':
        return '🖨️';
      case 'door':
        return '🚪';
      default:
        return '❓';
    }
  };

  const getObjectColor = (id: string) => {
    switch (id) {
      case 'bed':
        return 'bg-red-200 border-red-400 hover:bg-red-300';
      case 'bookshelf':
        return 'bg-amber-200 border-amber-400 hover:bg-amber-300';
      case 'computer':
        return 'bg-blue-200 border-blue-400 hover:bg-blue-300';
      case 'printer':
        return 'bg-gray-200 border-gray-400 hover:bg-gray-300';
      case 'door':
        return 'bg-green-200 border-green-400 hover:bg-green-300';
      default:
        return 'bg-purple-200 border-purple-400 hover:bg-purple-300';
    }
  };

  return (
    <div
      className={`absolute cursor-pointer transform transition-all duration-200 border-4 rounded-lg flex items-center justify-center text-4xl ${getObjectColor(object.id)} ${
        isHovered ? 'scale-110 shadow-lg z-10' : 'z-5'
      }`}
      style={{
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        <div className={`transition-transform duration-200 ${isHovered ? 'animate-bounce' : ''}`}>
          {getObjectIcon(object.id)}
        </div>
        {isHovered && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-mono">
            {object.name}
          </div>
        )}
      </div>
      
      {/* Interaction indicator */}
      {isHovered && (
        <div className="absolute -top-2 -right-2 text-yellow-400 text-sm animate-pulse">
          ✨
        </div>
      )}
    </div>
  );
};

export default RoomObject;
