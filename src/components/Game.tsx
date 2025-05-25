import Character from './Character';

const GAME_WIDTH = 512;
const GAME_HEIGHT = 512;

const Game = () => {
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
          <Character gameWidth={GAME_WIDTH} gameHeight={GAME_HEIGHT} />
        </div>
      </div>
    </div>
  );
};

export default Game;
