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

const HKRoom = () => {
  const [characterPosition, setCharacterPosition] = useState<Position>({ x: 240, y: 240 });
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
            width={32}
            height={48}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col">
      {/* 상단 UI (Game.tsx 스타일) */}
      <div className="w-full px-4 pt-4 pb-2 flex justify-between items-start">
        <div className="bg-black bg-opacity-70 text-white border-2 border-white px-3 py-2 font-mono text-xs" style={{ imageRendering: 'pixelated' }}>
          <div>🎮 WASD 또는 화살표 키로 이동</div>
          <div>✔️ 로고클릭시 자세히 보기</div>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-white font-mono px-2 py-1 bg-black border-2 border-white">Hackers</h1>
          <p className="text-white font-mono bg-black px-2 border-2 border-t-0 border-white text-xs">서비스 기획 인턴</p>
        </div>
      </div>
      {/* 중앙 512x512 박스 */}
      <div className="flex-1 flex items-center justify-center">
        {generateFloorTiles()}
      </div>
      {/* Info Modal */}
      {selectedObject && (
        <InfoModal object={selectedObject} onClose={closeModal} />
      )}
    </div>
  );
};

export default HKRoom;
  
  