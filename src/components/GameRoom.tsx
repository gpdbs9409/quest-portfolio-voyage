
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

const GameRoom = () => {
  const [characterPosition, setCharacterPosition] = useState<Position>({ x: 240, y: 200 });
  const [selectedObject, setSelectedObject] = useState<RoomObjectData | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const roomObjects: RoomObjectData[] = [
    {
      id: 'bed',
      name: '침대',
      position: { x: 50, y: 300 },
      size: { width: 64, height: 96 },
      content: {
        title: '성장 배경',
        description: '안녕하세요! 저는 끊임없이 배우고 성장하는 개발자입니다. 새로운 기술에 대한 호기심과 문제 해결에 대한 열정으로 매일 발전해나가고 있습니다.',
      }
    },
    {
      id: 'bookshelf',
      name: '책장',
      position: { x: 384, y: 48 },
      size: { width: 96, height: 64 },
      content: {
        title: '기술 스택',
        description: 'React, TypeScript, Node.js, Python, AWS 등 다양한 기술을 활용하여 풀스택 개발을 진행합니다.',
      }
    },
    {
      id: 'computer',
      name: '컴퓨터',
      position: { x: 128, y: 96 },
      size: { width: 64, height: 48 },
      content: {
        title: '포트폴리오',
        description: '제가 개발한 프로젝트들을 확인해보세요!',
        links: [
          { text: 'GitHub 보기', url: 'https://github.com' },
          { text: '프로젝트 둘러보기', url: '#' }
        ]
      }
    },
    {
      id: 'table',
      name: '탁자',
      position: { x: 224, y: 224 },
      size: { width: 48, height: 48 },
      content: {
        title: '취미',
        description: '코딩 외에도 게임, 독서, 음악 감상 등 다양한 취미를 즐깁니다.',
      }
    },
    {
      id: 'printer',
      name: '프린터',
      position: { x: 400, y: 300 },
      size: { width: 48, height: 48 },
      content: {
        title: '이력서',
        description: '상세한 이력서를 다운로드하실 수 있습니다.',
        links: [
          { text: '이력서 다운로드', url: '#' }
        ]
      }
    },
    {
      id: 'door',
      name: '문',
      position: { x: 480, y: 192 },
      size: { width: 16, height: 64 },
      content: {
        title: '연락처',
        description: '프로젝트 제안이나 협업 문의는 언제든 환영합니다!',
        links: [
          { text: 'Email 보내기', url: 'mailto:your.email@example.com' },
          { text: 'LinkedIn', url: 'https://linkedin.com' }
        ]
      }
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 6;
      const gameArea = gameAreaRef.current;
      if (!gameArea) return;

      const rect = gameArea.getBoundingClientRect();
      const maxX = rect.width - 32; // character width
      const maxY = rect.height - 48; // character height

      setCharacterPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            newY = Math.max(0, prev.y - speed);
            break;
          case 'ArrowDown':
          case 's':
          case 'S':
            newY = Math.min(maxY, prev.y + speed);
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            newX = Math.max(0, prev.x - speed);
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            newX = Math.min(maxX, prev.x + speed);
            break;
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleObjectClick = (object: RoomObjectData) => {
    setSelectedObject(object);
  };

  const closeModal = () => {
    setSelectedObject(null);
  };

  // Generate a grid background pattern for the floor
  const generateFloorTiles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Tile-based floor */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAASklEQVR4AezBAQEAIAzDsE7/oHYgF5DIu23A7FRVq6q4u/feC8AK00NVraru7r33AjA9PAAwPQAAAAAAMD0AAEwPAAAAAAB8PRuMAVWn2XP9AAAAAElFTkSuQmCC")`,
            backgroundSize: '32px 32px',
            backgroundRepeat: 'repeat',
            imageRendering: 'pixelated'
          }}
        />

        {/* Brick wall border */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          {/* Top wall */}
          <div 
            className="absolute top-0 left-0 right-0 h-16"
            style={{
              backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtElEQVR4Ae2X0Q3CMAxEHzNkhIzQEdghI2SE7lB2mJQZ6A7NVajkfFTUX5KP55OsKMovOvucYwHm3yWO4JypOnMPLj8Bd4ALB1QFzWnACFQF5y3gDeahKnjeAlaQ+gLmy4A1cFX0/AZ7hwZ24KF4D9GCAjoFr9GKtVcDV8WyPWLZIbUdY9tB5odI22HqD7I/yqce5UvfRdVU7nyaii+iaqS0vnqeXD9QRrQKpO1PC+i0fQNlRCsUuFmAdgAAAABJRU5ErkJggg==")`,
              backgroundSize: '32px 32px',
              backgroundRepeat: 'repeat-x',
              imageRendering: 'pixelated'
            }}
          />
          {/* Bottom wall */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{
              backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtElEQVR4Ae2X0Q3CMAxEHzNkhIzQEdghI2SE7lB2mJQZ6A7NVajkfFTUX5KP55OsKMovOvucYwHm3yWO4JypOnMPLj8Bd4ALB1QFzWnACFQF5y3gDeahKnjeAlaQ+gLmy4A1cFX0/AZ7hwZ24KF4D9GCAjoFr9GKtVcDV8WyPWLZIbUdY9tB5odI22HqD7I/yqce5UvfRdVU7nyaii+iaqS0vnqeXD9QRrQKpO1PC+i0fQNlRCsUuFmAdgAAAABJRU5ErkJggg==")`,
              backgroundSize: '32px 32px',
              backgroundRepeat: 'repeat-x',
              imageRendering: 'pixelated'
            }}
          />
          {/* Left wall */}
          <div 
            className="absolute left-0 top-16 bottom-16 w-16"
            style={{
              backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtElEQVR4Ae2X0Q3CMAxEHzNkhIzQEdghI2SE7lB2mJQZ6A7NVajkfFTUX5KP55OsKMovOvucYwHm3yWO4JypOnMPLj8Bd4ALB1QFzWnACFQF5y3gDeahKnjeAlaQ+gLmy4A1cFX0/AZ7hwZ24KF4D9GCAjoFr9GKtVcDV8WyPWLZIbUdY9tB5odI22HqD7I/yqce5UvfRdVU7nyaii+iaqS0vnqeXD9QRrQKpO1PC+i0fQNlRCsUuFmAdgAAAABJRU5ErkJggg==")`,
              backgroundSize: '32px 32px',
              backgroundRepeat: 'repeat-y',
              imageRendering: 'pixelated'
            }}
          />
          {/* Right wall */}
          <div 
            className="absolute right-0 top-16 bottom-16 w-16"
            style={{
              backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtElEQVR4Ae2X0Q3CMAxEHzNkhIzQEdghI2SE7lB2mJQZ6A7NVajkfFTUX5KP55OsKMovOvucYwHm3yWO4JypOnMPLj8Bd4ALB1QFzWnACFQF5y3gDeahKnjeAlaQ+gLmy4A1cFX0/AZ7hwZ24KF4D9GCAjoFr9GKtVcDV8WyPWLZIbUdY9tB5odI22HqD7I/yqce5UvfRdVU7nyaii+iaqS0vnqeXD9QRrQKpO1PC+i0fQNlRCsUuFmAdgAAAABJRU5ErkJggg==")`,
              backgroundSize: '32px 32px',
              backgroundRepeat: 'repeat-y',
              imageRendering: 'pixelated'
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden font-mono">
      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="w-full h-full relative"
      >
        {/* Room background with tiles */}
        {generateFloorTiles()}
        
        {/* Room Objects */}
        {roomObjects.map(obj => (
          <RoomObject
            key={obj.id}
            object={obj}
            onClick={() => handleObjectClick(obj)}
          />
        ))}
        
        {/* Character */}
        <Character position={characterPosition} />
        
        {/* Instructions */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-none border-2 border-white font-mono text-xs" style={{imageRendering: 'pixelated'}}>
          <div>🎮 WASD 또는 화살표 키로 이동</div>
          <div>🖱️ 오브젝트 클릭으로 상호작용</div>
        </div>
        
        {/* Title */}
        <div className="absolute top-4 right-4 text-right">
          <h1 className="text-2xl font-bold text-white font-mono px-2 py-1 bg-black border-2 border-white">My Quest</h1>
          <p className="text-white font-mono bg-black px-2 border-2 border-t-0 border-white">RPG 포트폴리오 탐험기</p>
        </div>
      </div>
      
      {/* Info Modal */}
      {selectedObject && (
        <InfoModal object={selectedObject} onClose={closeModal} />
      )}
    </div>
  );
};

export default GameRoom;
