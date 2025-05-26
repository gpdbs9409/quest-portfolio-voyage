import React, { useState, useEffect, useRef } from 'react';
import Character from './Character';
import RoomObject from './RoomObject';
import InfoModal from './InfoModal';

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

const ShinhanRoom = () => {
  const [characterPosition, setCharacterPosition] = useState<Position>({ x: 240, y: 200 });
  const [selectedObject, setSelectedObject] = useState<RoomObjectData | null>(null);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  
  const roomObjects: RoomObjectData[] = [];

  // 캐릭터 이미지 경로 반환 함수
  const getCharacterSrc = () => `/assets/character/character_${direction}.png`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
      setIsMoving(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
      if (keysPressed.current.size === 0) {
        setIsMoving(false);
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
    const speed = 6;
    const handleKeyDown = (e: KeyboardEvent) => {
      setCharacterPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;
        let newDirection = direction;
        if (e.key === 'ArrowUp' || e.key === 'w') {
          newY -= speed;
          newDirection = 'up';
        }
        if (e.key === 'ArrowDown' || e.key === 's') {
          newY += speed;
          newDirection = 'down';
        }
        if (e.key === 'ArrowLeft' || e.key === 'a') {
          newX -= speed;
          newDirection = 'left';
        }
        if (e.key === 'ArrowRight' || e.key === 'd') {
          newX += speed;
          newDirection = 'right';
        }
        // 경계 체크
        newX = Math.max(0, Math.min(512 - 32, newX));
        newY = Math.max(0, Math.min(512 - 48, newY));
        if (newDirection !== direction) setDirection(newDirection);
        return { x: newX, y: newY };
      });
      setIsMoving(true);
    };
    const handleKeyUp = () => setIsMoving(false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [direction]);

  const handleObjectClick = (object: RoomObjectData) => {
    setSelectedObject(object);
  };

  const closeModal = () => {
    setSelectedObject(null);
  };

  // 배경 및 중앙 정렬 박스
  const generateFloorTiles = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="relative"
          style={{ width: 768, height: 512 }}
        >
          <img
            src="/assets/buildings/background.png"
            alt="room background"
            style={{ width: 768, height: 512, objectFit: 'cover', imageRendering: 'pixelated' }}
          />
          {/* Room Objects */}
          {roomObjects.map(obj => (
            <RoomObject
              key={obj.id}
              object={obj}
              onClick={() => handleObjectClick(obj)}
            />
          ))}
          {/* 캐릭터 */}
          <Character
            position={characterPosition}
            direction={direction}
            isMoving={isMoving}
            src={getCharacterSrc()}
            width={48}
            height={64}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden font-mono">
      <div 
        ref={gameAreaRef}
        className="w-full h-full relative"
      >
        {generateFloorTiles()}
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-none border-2 border-white font-mono text-xs" style={{imageRendering: 'pixelated'}}>
          <div>🎮 WASD 또는 화살표 키로 이동</div>
          <div>🖱️ 오브젝트 클릭으로 상호작용</div>
        </div>
        <div className="absolute top-4 right-4 text-right">
          <img 
            src="/assets/building-logo/shinhan.png" 
            alt="Shinhan Logo" 
            style={{ 
              width: '100px', 
              imageRendering: 'pixelated',
              backgroundColor: 'black'
            }} 
          />
        </div>
      </div>
      {selectedObject && (
        <InfoModal object={selectedObject} onClose={closeModal} />
      )}
    </div>
  );
};

export default ShinhanRoom; 