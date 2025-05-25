import React, { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface CharacterProps {
  gameWidth: number;
  gameHeight: number;
}

const CHARACTER_SIZE = 50;

const Character: React.FC<CharacterProps> = ({ gameWidth, gameHeight }) => {
  const [position, setPosition] = useState<Position>({
    x: (gameWidth - CHARACTER_SIZE) / 2,
    y: (gameHeight - CHARACTER_SIZE) / 2
  });
  const [direction, setDirection] = useState<string>('/assets/character_down.png');
  const moveSpeed = 10;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      let newPosition = { ...position };
      let newDirection = direction;

      switch (key) {
        case 'w':
        case 'arrowup':
          newPosition.y = Math.max(0, position.y - moveSpeed);
          newDirection = '/assets/character_up.png';
          break;
        case 's':
        case 'arrowdown':
          newPosition.y = Math.min(gameHeight - CHARACTER_SIZE, position.y + moveSpeed);
          newDirection = '/assets/character_down.png';
          break;
        case 'a':
        case 'arrowleft':
          newPosition.x = Math.max(0, position.x - moveSpeed);
          newDirection = '/assets/character_left.png';
          break;
        case 'd':
        case 'arrowright':
          newPosition.x = Math.min(gameWidth - CHARACTER_SIZE, position.x + moveSpeed);
          newDirection = '/assets/character_right.png';
          break;
        default:
          return;
      }

      setPosition(newPosition);
      setDirection(newDirection);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, gameWidth, gameHeight]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: `${CHARACTER_SIZE}px`,
        height: `${CHARACTER_SIZE}px`,
        backgroundImage: `url(${direction})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        transition: 'all 0.1s ease',
      }}
    />
  );
};

export default Character;
