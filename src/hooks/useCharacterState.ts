import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface CharacterState {
  position: Position;
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
}

export const useCharacterState = (gameAreaRef: React.RefObject<HTMLDivElement>) => {
  const [characterState, setCharacterState] = useState<CharacterState>({
    position: { x: 240, y: 200 },
    direction: 'down',
    isMoving: false
  });
  
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
      setCharacterState(prev => ({ ...prev, isMoving: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
      if (keysPressed.current.size === 0) {
        setCharacterState(prev => ({ ...prev, isMoving: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const moveCharacter = () => {
      if (keysPressed.current.size === 0) return;
      
      const speed = 6;
      const gameArea = gameAreaRef.current;
      if (!gameArea) return;

      const rect = gameArea.getBoundingClientRect();
      const maxX = rect.width - 32;
      const maxY = rect.height - 48;

      setCharacterState(prev => {
        let newX = prev.position.x;
        let newY = prev.position.y;
        let newDirection = prev.direction;

        if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
          newY = Math.max(0, prev.position.y - speed);
          newDirection = 'up';
        } else if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
          newY = Math.min(maxY, prev.position.y + speed);
          newDirection = 'down';
        }

        if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) {
          newX = Math.max(0, prev.position.x - speed);
          newDirection = 'left';
        } else if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) {
          newX = Math.min(maxX, prev.position.x + speed);
          newDirection = 'right';
        }

        return {
          position: { x: newX, y: newY },
          direction: newDirection,
          isMoving: true
        };
      });
    };

    const animationFrameId = requestAnimationFrame(function animate() {
      moveCharacter();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameAreaRef]);

  return characterState;
}; 