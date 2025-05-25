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
}

const CHARACTER_WIDTH = 32;
// const CHARACTER_HEIGHT = 48; // 높이 자동 비율 유지 위해 주석처리

const directionToImage: Record<string, string> = {
  up: '/assets/character_up.png',
  down: '/assets/character_down.png',
  left: '/assets/character_left.png',
  right: '/assets/character_right.png',
};

const Character: React.FC<CharacterProps> = ({ position, direction, src }) => {
  const imageSrc = src || directionToImage[direction];
  return (
    <img
      src={imageSrc}
      alt="캐릭터"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: CHARACTER_WIDTH,
        height: 'auto',
        objectFit: 'contain',
        imageRendering: 'pixelated',
        transition: 'left 0.1s, top 0.1s',
        zIndex: 10,
      }}
    />
  );
};

export default Character;
