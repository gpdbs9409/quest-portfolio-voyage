// src/components/Game.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Character from './Character';
import React from 'react';

const GAME_WIDTH = 768;
const GAME_HEIGHT = 512;

const buildings = [
  { src: '/assets/buildings/school.png', alt: 'School', x: 100, y: 100, route: '/school-room', logo: '/assets/building-logo/seoultech.png' },
  { src: '/assets/buildings/hackers.png', alt: 'Hackers', x: 500, y: 100, route: '/hackers-room', logo: '/assets/building-logo/hackers-logo.png' },
  { src: '/assets/buildings/alphaco.png', alt: 'Alphaco', x: 100, y: 250, route: '/shinhan-room', logo: '/assets/building-logo/shinhan.png' },
  { src: '/assets/buildings/hk.png', alt: 'HK', x: 400, y: 250, route: '/hk-room', logo: '/assets/building-logo/hk.png' }
];
console.log(buildings);
const Game = () => {
  const navigate = useNavigate();
  const [characterPos, setCharacterPos] = useState({ x: 200, y: 200 });
  const [showModal, setShowModal] = useState(false);
  const [targetBuilding, setTargetBuilding] = useState<{ alt: string, route: string } | null>(null);

  // 키보드 이동
  useEffect(() => {
    const speed = 6;

    const handleKeyDown = (e: KeyboardEvent) => {
      setCharacterPos(prev => {
        const newPos = { ...prev };

        if (e.key === 'ArrowUp' || e.key === 'w') newPos.y -= speed;
        if (e.key === 'ArrowDown' || e.key === 's') newPos.y += speed;
        if (e.key === 'ArrowLeft' || e.key === 'a') newPos.x -= speed;
        if (e.key === 'ArrowRight' || e.key === 'd') newPos.x += speed;

        return newPos;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 빌딩 근접 감지
  useEffect(() => {
    for (const building of buildings) {
      const dist = Math.sqrt(
        Math.pow(characterPos.x - building.x, 2) +
        Math.pow(characterPos.y - building.y, 2)
      );
      if (dist < 40) {
        setTargetBuilding(building);
        setShowModal(true);
        break;
      }
    }
  }, [characterPos]);

  return (
    <div className="w-full h-full flex flex-col bg-black text-white">
      {/* 상단 UI */}
      <div className="w-full px-4 pt-4 pb-2 flex justify-between items-start">
        <div className="bg-black bg-opacity-70 text-white border-2 border-white px-3 py-2 font-pixel text-xs" style={{ imageRendering: 'pixelated' }}>
          <div>🎮 WASD 또는 화살표 키로 이동</div>
          <div>🏠 건물 접근 시 입장</div>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-white font-pixel px-2 py-1 bg-black border-2 border-white">Yoon's RPG</h1>
          <p className="text-white font-pixel bg-black px-2 border-2 border-t-0 border-white text-xs">RPG 포트폴리오 탐험기</p>
        </div>
      </div>

      {/* 게임 영역 */}
      <div className="flex-1 flex items-center justify-center">
        <div
          style={{
            width: `${GAME_WIDTH}px`,
            height: `${GAME_HEIGHT}px`,
            backgroundImage: 'url(/assets/buildings/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid #333',
            borderRadius: '8px',
          }}
        >
          {/* 빌딩들 */}
          {buildings.map((building, index) => (
            <React.Fragment key={index}>
              <img
                src={building.src}
                alt={building.alt}
                style={{
                  position: 'absolute',
                  top: building.y,
                  left: building.x,
                  width: '100px',
                  height: 'auto',
                }}
              />
              {building.alt === 'HK' ? (
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: building.y-10, 
                    left: building.x + 25, 
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 0 #000',
                    zIndex: 20 
                  }}
                >
                  HK
                </div>
              ) : (
                <img 
                  src={building.logo} 
                  alt={`${building.alt} Logo`}
                  style={{ 
                    position: 'absolute', 
                    top: building.y-10, 
                    left: building.x + 25, 
                    width: '50px', 
                    height: 'auto',
                    zIndex: 20 
                  }} 
                />
              )}
            </React.Fragment>
          ))}

          {/* 캐릭터 */}
          <Character
            position={characterPos}
            direction="down"
            isMoving={false}
            width={48}
            height={64}
          />
        </div>
      </div>

      {/* 모달 */}
      {showModal && targetBuilding && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded shadow-xl text-center font-pixel w-[300px] border-4 border-black">
            <p className="mb-4 text-sm">{`[${targetBuilding.alt}] 입장하시겠습니까?`}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate(targetBuilding.route);
                }}
                className="px-4 py-1 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition font-pixel text-xs"
              >
                예
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 bg-gray-300 text-black border-2 border-black hover:bg-white transition font-pixel text-xs"
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
