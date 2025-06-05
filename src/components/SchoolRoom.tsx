import React, { useState, useEffect, useRef } from 'react';
import Character from './Character';
import RoomObject from './RoomObject';
import InfoModal from './InfoModal';

interface Position {
  x: number;
  y: number;
}

interface RoomObjectContent {
  title: string;
  description: string;
  details?: string[];
  links?: { text: string; url: string; }[];
}

interface RoomObjectData {
  id: string;
  name: string;
  position: Position;
  size: { width: number; height: number };
  content: RoomObjectContent;
  image: string;
}

const SchoolRoom = () => {
  const [characterPosition, setCharacterPosition] = useState<Position>({ x: 240, y: 240 });
  const [selectedObject, setSelectedObject] = useState<RoomObjectData | null>(null);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  
  const roomObjects: RoomObjectData[] = [
    {
      id: 'nodejs',
      name: 'Node.js',
      position: { x: 100, y: 200 },
      size: { width: 48, height: 48 },
      content: {
        title: 'Node.js 백엔드 개발',
        description: 'Express.js를 활용한 RESTful API 개발 경험',
        details: [
          'Express.js 프레임워크 활용',
          'MongoDB 데이터베이스 연동',
          'JWT 기반 인증 시스템 구현',
          'RESTful API 설계 및 개발'
        ],
        links: [
          { text: '프로젝트 보기', url: 'https://github.com/gpdbs9409/Chehum-Moa-nodejs' }
        ]
      },
      image: '/assets/experience-logo/nodejs.png'
    },
    {
      id: 'flutter',
      name: 'Flutter',
      position: { x: 120, y: 70 },
      size: { width: 56, height: 48 },
      content: {
        title: 'Flutter 앱 개발',
        description: '크로스 플랫폼 모바일 앱 개발 경험',
        details: [
          'Flutter 프레임워크를 활용한 UI 개발',
          '상태 관리 및 라우팅 구현',
          'Firebase 연동 및 실시간 데이터 처리',
          '반응형 디자인 및 애니메이션 구현'
        ],
        links: [
          { text: '프로젝트 보기', url: 'https://github.com/gpdbs9409/Jachwi_in-App-Flutter-main-flutter' }
        ]
      },
      image: '/assets/experience-logo/flutter.png'
    },
    {
      id: 'ubuntu',
      name: 'Ubuntu',
      position: { x: 300, y: 280 },
      size: { width: 70, height: 48 },
      content: {
        title: 'Linux 시스템 관리',
        description: 'Ubuntu 서버 운영 및 관리 경험',
        details: [
          'Ubuntu 서버 설치 및 설정',
          'Nginx 웹 서버 구성',
          'Docker 컨테이너 관리',
          '시스템 모니터링 및 보안 설정'
        ],
        links: [
          { text: '프로젝트 보기', url: 'https://github.com/gpdbs9409/LetStudy' }
        ]
      },
      image: '/assets/experience-logo/ubuntu.png'
    }
  ];

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
            style={{ width:768, height: 512, objectFit: 'cover', imageRendering: 'pixelated' }}
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
    <div className="w-full h-screen bg-black flex flex-col">
      {/* 상단 UI (Game.tsx 스타일) */}
      <div className="w-full px-4 pt-4 pb-2 flex justify-between items-start">
        <div className="bg-black bg-opacity-70 text-white border-2 border-white px-3 py-2 font-mono text-xs" style={{ imageRendering: 'pixelated' }}>
          <div>🎮 WASD 또는 화살표 키로 이동</div>
          <div>✔️ 로고클릭시 자세히 보기</div>
        </div>
        <div className="text-right">
          <img 
            src="/assets/building-logo/seoultech.png" 
            alt="Seoultech Logo" 
            style={{ 
              width: '100px', 
              imageRendering: 'pixelated',
              backgroundColor: 'black'
            }} 
          />
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

export default SchoolRoom;
  