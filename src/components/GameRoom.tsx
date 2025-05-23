
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
  const [characterPosition, setCharacterPosition] = useState<Position>({ x: 200, y: 300 });
  const [selectedObject, setSelectedObject] = useState<RoomObjectData | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const roomObjects: RoomObjectData[] = [
    {
      id: 'bed',
      name: '침대',
      position: { x: 50, y: 100 },
      size: { width: 80, height: 60 },
      content: {
        title: '성장 배경',
        description: '안녕하세요! 저는 끊임없이 배우고 성장하는 개발자입니다. 새로운 기술에 대한 호기심과 문제 해결에 대한 열정으로 매일 발전해나가고 있습니다.',
      }
    },
    {
      id: 'bookshelf',
      name: '책장',
      position: { x: 500, y: 50 },
      size: { width: 60, height: 100 },
      content: {
        title: '기술 스택',
        description: 'React, TypeScript, Node.js, Python, AWS 등 다양한 기술을 활용하여 풀스택 개발을 진행합니다.',
      }
    },
    {
      id: 'computer',
      name: '컴퓨터',
      position: { x: 350, y: 150 },
      size: { width: 70, height: 50 },
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
      id: 'printer',
      name: '프린터',
      position: { x: 150, y: 200 },
      size: { width: 50, height: 40 },
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
      position: { x: 580, y: 280 },
      size: { width: 20, height: 80 },
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
      const speed = 5;
      const gameArea = gameAreaRef.current;
      if (!gameArea) return;

      const rect = gameArea.getBoundingClientRect();
      const maxX = rect.width - 40; // character width
      const maxY = rect.height - 40; // character height

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

  return (
    <div className="w-full h-screen bg-gradient-to-b from-amber-100 to-amber-200 relative overflow-hidden">
      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="w-full h-full relative"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.1) 0%, transparent 25%)
          `
        }}
      >
        {/* Room boundaries */}
        <div className="absolute inset-4 border-8 border-amber-800 rounded-lg bg-amber-50 bg-opacity-50" />
        
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
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg font-mono text-sm">
          <div>🎮 WASD 또는 화살표 키로 이동</div>
          <div>🖱️ 오브젝트 클릭으로 상호작용</div>
        </div>
        
        {/* Title */}
        <div className="absolute top-4 right-4 text-right">
          <h1 className="text-2xl font-bold text-amber-900 font-mono">My Quest</h1>
          <p className="text-amber-700 font-mono">RPG 포트폴리오 탐험기</p>
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
