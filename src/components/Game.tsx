// src/components/Game.tsx
import { useNavigate } from 'react-router-dom';
import Character from './Character';

const GAME_WIDTH = 512;
const GAME_HEIGHT = 512;

const buildings = [
  { src: '/assets/school.png', alt: 'School', x: 100, y: 100, route: '/school-room' },
  { src: '/assets/hackers.png', alt: 'Hackers', x: 250, y: 100, route: '/hackers-room' },
  { src: '/assets/alphaco.png', alt: 'Alphaco', x: 100, y: 250, route: '/academy-room' },
  { src: '/assets/hk.png', alt: 'HK', x: 250, y: 250, route: '/hk-room' }
];

const Game = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col bg-black text-white">
      {/* 상단 UI */}
      <div className="w-full p-4 flex justify-between items-center">
        <div className="text-lg">
          <span className="font-bold">WASD</span> 또는 방향키로 이동
        </div>
        <div className="text-2xl font-bold">My Quest</div>
      </div>

      {/* 게임 영역 */}
      <div className="flex-1 flex items-center justify-center">
        <div
          style={{
            width: `${GAME_WIDTH}px`,
            height: `${GAME_HEIGHT}px`,
            backgroundImage: 'url(/assets/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid #333',
            borderRadius: '8px',
          }}
        >
        {buildings.map((building, index) => (
  <img
    key={index}
    src={building.src}
    alt={building.alt}
    style={{
      position: 'absolute',
      top: building.y,
      left: building.x,
      width: '48px', // or 64px 등 조절 가능
      height: 'auto',
      cursor: 'pointer',
    }}
    onClick={() => window.location.href = building.route}
  />
))}

          <Character gameWidth={GAME_WIDTH} gameHeight={GAME_HEIGHT} />

        </div>
      </div>
    </div>
  );
};

export default Game;

