
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
        width: '32px',
        height: '48px',
        imageRendering: 'pixelated',
      }}
    >
      {/* Pixel Art Character */}
      <div className="w-full h-full relative">
        {/* Character Sprite - Simple pixel art style */}
        <div 
          className="w-full h-full bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAsElEQVR4Ae3WIQzCQBCF4UUggUAiQCKRCCQSiUQikUgkAoFAIpE3wLJ/u3NTmobc5H3JF9fdvN5Md5gF/5c38ILjD6YHRmSMmNsQJ1xxwA4rnLDFwIboKjziFg4ecLiPJVa44hh6M7zgvptwFzu0mEtvgitzfHnCFar4HXeoguPYt1CFauXzFakViVdl8k9JvCzFB0P8NIufZyoi4tFUPByriKwnxCPCD0e5d595AQ76dfPxkXxqAAAAAElFTkSuQmCC")`,
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default Character;
