
import React, { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface CharacterProps {
  position: Position;
  direction?: 'up' | 'down' | 'left' | 'right';
  isMoving?: boolean;
}

const Character = ({ 
  position, 
  direction = 'down', 
  isMoving = false 
}: CharacterProps) => {
  const [frameIndex, setFrameIndex] = useState(0);
  
  // 방향에 따른 캐릭터 이미지 (Base64 인코딩)
  const characterSprites = {
    down: [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAsElEQVR4Ae3WIQzCQBCF4UUggUAiQCKRCCQSiUQikUgkAoFAIpE3wLJ/u3NTmobc5H3JF9fdvN5Md5gF/5c38ILjD6YHRmSMmNsQJ1xxwA4rnLDFwIboKjziFg4ecLiPJVa44hh6M7zgvptwFzu0mEtvgitzfHnCFar4HXeoguPYt1CFauXzFakViVdl8k9JvCzFB0P8NIufZyoi4tFUPByriKwnxCPCD0e5d595AQ76dfPxkXxqAAAAAElFTkSuQmCC",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAr0lEQVR4Ae3WMQrCQBCF4cEiR7ATvIpn8RQWHkFv4A28hacwEFDIrLuQZLfYmcA+eF8Xu/NPmxQFOeRcJnKqNs7ZblGYiIqlMcU75wl1jY8V61oGJrKHbjPSYpRDLei2DbwjPbaBZ6TrNlBFeuSYH1/xKfoSxRVc8X8r8H0Fd2CKz/EdUHEVn+HboOIHfB2quI7v8b9QRY84VbyBVLzBVLzDmbiBqQDCVBhhKtDIf3F/TpvfIXytAAAAAElFTkSuQmCC"
    ],
    up: [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAo0lEQVR4Ae3WsQ3CMBCF4WcGYAJ2YAPYiF3YjJFYgBHsEaIUKSOlSPMktBLFdf73dD7prk7VQk5lJufFrnHO+xaFie6ixpTvnCfUNT421nUeGMkRuq1Ii1EOtaDbNvCK9NgGXpGu20AX6ZFjfnzFt+hLFFdwxf+twPcV3IEpPsd3QMVVPM9aO6DiB3wdqrjGH1DFG0jFG0zFO5yJG5gKIEyFEaYCjXzWVb5aV809eAAAAABJRU5ErkJggg==",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAApElEQVR4Ae3WsQ3CMBCF4YcYgAnYgQ1gI3bJxoxEC1l2YI4c0UQpInspIt8TTipOuT9n66S7OlFLeSgneb3adT7ktUVpYnBdjUm/uUyYa/w4sa7TwESOttsuLdYyyZ52OwZe1j1uwZd1XbeBwbqH5XR8w7folihO4IT/W4Hvc3AHUnyO74CKp3gO3wYVP+DroOLH+A5VvEEp3qApvsMUb5nf1CY6CkNrAAAAAElFTkSuQmCC"
    ],
    left: [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAp0lEQVR4Ae3WMQ6CQBCF4R+Wxs7OaOEZvI6n4AK2lDZ2XoFSEwsrSzcmGDKzFJvsvO82JO87LDFGNE/VwTb1qcZlCBFzpMMJJU4bcjc80eGOA6746FMYPjnetVPvStJrjhsOqE7SZ4531nnGBV98257vlPSY443lLvGU/F82yDtS9CNpoKek+NhlkDRQN7zAZZA0sBu+B0kD++F7kDTwP3wGSQP74TNIGvgC3GERajHQEXsAAAAASUVORK5CYII=",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAoklEQVR4Ae3WMQrCQBCF4Ycn8ABewLP4vUE8g3fwBh5DsLG0ThXILrObXcjOVps3+X+b7DAT9Si1NEbKsXdmZmtUYoSbXHCMzd3whBsu2OPqh9AMuXzXTr47x3UuWGO+k75zec46T6zw8W3b85wc1/yimzsu+b9sgHekoAYRQU+JwbWKiBq4DT+DiKCBv+E9iAga+B/eg4igAT+8BxFBDX54DyKCb58HBbYC94QCAAAAAElFTkSuQmCC"
    ],
    right: [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAApElEQVR4Ae3WsQ2DMBCF4YcYgAnYgQ1gI3ZhM0aiRVp2yBwxokGUUWR3KSLfE04qTrk/Z+uUT9FJL+UkrxerzgO5tiRNDJYaO1IQU75zmdDs+HFiXaeBiRxt6a5Scq9kkj3tdgq8rGvcgi/ruraBwbrH5XR8w7foXlGcwAn/twLf5+AOUHyO7wDF53gOHxHFD/iIKH6Mj4jiDUTxBk3xHab4DrTd1eII09qEAAAAAElFTkSuQmCC",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAApklEQVR4Ae3WMQ6CQBCF4R+Wxs7OaOEZvI6n4AK2lDZ2XoFSEwsrSzcmGDKzFJvsvO82JO87LDFGVE9Vwzb1qaplCBFzpMUJJU4bcjc80eGOA674+FMYfjnetVPvStJrjhsOWJ2kzxzvrPOMC7627ftOSY853ljvEk/J/2WDvCMFP5IGekqKj10GSQNNwwtcBkkDu+F7kDSwP74HSQP/wxeQNPAffAFJA1/WiBFqibY1EwAAAABJRU5ErkJggg=="
    ]
  };
  
  // 걷기 애니메이션을 위한 타이머
  useEffect(() => {
    let animationInterval: NodeJS.Timeout | null = null;
    
    if (isMoving) {
      animationInterval = setInterval(() => {
        setFrameIndex(prev => (prev === 0 ? 1 : 0));
      }, 200); // 200ms 마다 프레임 변경
    } else {
      setFrameIndex(0); // 멈추면 기본 포즈로
    }
    
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [isMoving]);

  return (
    <div
      className="absolute transition-all duration-100 ease-linear z-20"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '32px',
        height: '48px',
        imageRendering: 'pixelated',
      }}
    >
      {/* 픽셀 아트 캐릭터 */}
      <div className="w-full h-full relative">
        {/* 캐릭터 스프라이트 */}
        <div 
          className="w-full h-full bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("${characterSprites[direction][frameIndex]}")`,
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default Character;
