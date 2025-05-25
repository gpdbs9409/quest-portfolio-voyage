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

  const getObjectImage = (id: string) => {
    switch (id) {
      case 'bed':
        return `data:image/png;base64,...`; // 생략
      case 'bookshelf':
        return `data:image/png;base64,...`; // 생략
      case 'computer':
        return `data:image/png;base64,...`; // 생략
      case 'printer':
        return `data:image/png;base64,...`; // 생략
      case 'door':
        return `data:image/png;base64,...`; // 생략
      case 'table':
        return `data:image/png;base64,...`; // 생략
      case 'nodejs':
        return `/assets/nodejs.png`; // 퍼블릭 디렉토리에 있는 이미지
      default:
        return `/assets/default-object.png`; // 혹시 모를 예외 대응용
    }
  };

  const getHoverClass = (id: string) => {
    switch (id) {
      case 'bed':
        return 'border-red-400';
      case 'bookshelf':
        return 'border-amber-400';
      case 'computer':
        return 'border-blue-400';
      case 'printer':
        return 'border-gray-400';
      case 'door':
        return 'border-green-400';
      case 'table':
        return 'border-yellow-400';
      case 'nodejs':
        return 'border-lime-400';
      default:
        return 'border-purple-400';
    }
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-200 ${
        isHovered ? `${getHoverClass(object.id)} border-2 scale-105 z-10` : 'z-5 border-transparent border-2'
      }`}
      style={{
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
        imageRendering: 'pixelated',
        backgroundImage: `url("${getObjectImage(object.id)}")`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black border border-white text-white text-xs px-2 py-1 whitespace-nowrap font-mono">
          {object.name}
        </div>
      )}
      {isHovered && (
        <div className="absolute -top-2 -right-2 text-yellow-400 text-sm animate-pulse">
          ✨
        </div>
      )}
    </div>
  );
};

export default RoomObject;
