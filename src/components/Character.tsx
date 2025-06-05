import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface CharacterProps {
  position: Position;
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
  src?: string;
  width?: number;
  height?: number;
}

const DEFAULT_WIDTH = 48;
const DEFAULT_HEIGHT = 64;

const directionToImage: Record<string, string> = {
  up: '/assets/character/character_up.png',
  down: '/assets/character/character_down.png',
  left: '/assets/character/character_left.png',
  right: '/assets/character/character_right.png',
};

const Character: React.FC<CharacterProps> = ({ 
  position, 
  direction, 
  src,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT 
}) => {
  const imageSrc = src || directionToImage[direction];
  return (
    <img
      src={imageSrc}
      alt="캐릭터"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: width,
        height: height,
        objectFit: 'contain',
        imageRendering: 'pixelated',
        transition: 'left 0.1s, top 0.1s',
        zIndex: 10,
      }}
    />
  );
};

export default Character;
