
import React, { useState } from 'react';

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

interface RoomObjectProps {
  object: RoomObjectData;
  onClick: () => void;
}

const RoomObject = ({ object, onClick }: RoomObjectProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getObjectImage = (id: string) => {
    switch (id) {
      case 'bed':
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAsklEQVR4Ae2WwQ2DMBAEpeQKUkIqoARKoIRUkA6cEtIBJVBCOkhJlDB6WMEhQeCLLrav9ow0vrw2xjTqglR6vIdEnDqgTqgEi0/fZ3xJAPTBCPjKCFwW0PcZbwLYD3m1gL7P+CCgBdpOvk9AC3yAlwT0UYyA6p8CkgAJkAAJkICUgGNvTTj6iVty9pK8Id8IyzYCJOAIsJTqX8J+D6kqEMlVa5WAJCBXOq3+b0+QPpJTmPADHCvyKTdR9JIAAAAASUVORK5CYII=`;
      case 'bookshelf':
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAp0lEQVR4Ae3ZsQ2DMBCG0ePShSkYIRsxQkZghGyATAD7ABNkMUIMZzu0Kd0UcXPVf9JXnAtu7jQc7gAuQDngkJDjItYLcMt64r1OUw44Y7kD+4zFAAAAAAAAAP+FAe+lfwDjOuCOpQ44J+S4iLVecNiA5YP/9RlxrRMa0FfQlxDTg7TGTQ2ocWsD1jjqBkcNiDvQl+fXuo8aECsmuhfjnFD1SciA6gu4A9PcG8zfoanCAAAAAElFTkSuQmCC`;
      case 'computer':
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVR4Ae2WQQ6CMBBFZ+IKXMOVx8AVXHkM9Bh6DPQYuDJexzW48Bi44DP5idHEBGiZ4qbMSxoKTf95mWlhABDAA1gAB9VxAPQVZw+sAaQMzLtcBtxkIBLAgY6pKHFbA38z8GPP3VtbIENXQw/4omt7+xuNrk8NeIqtpK6xnhrr69izFdS4HhpwFTuVYL133YJ3HRemWPXWgJPYYeL6FkAJXtLNNQvELGbhoZdVA1ERxaCZXYRZNo38J+B7IkRCJKCpkLwFHnICa+hwY1AaqAG/JRHE0CkfA38fqhLs3dMJzLEVkOSUhCUAAAAASUVORK5CYII=`;
      case 'printer':
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVUlEQVR4Ae3TMQoAIAiFYTtXdzF38BqeoyvYETqETCJuu4T/gQ8UfSo9InIAMzuAiEQHgDmA3VNI0gBs/QawXQB2nFMAakXf7IB0qVbIEpfKEvDGA3wZc1WIj7KpaQAAAABJRU5ErkJggg==`;
      case 'door':
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAgCAYAAADNLCKpAAAAZElEQVR4Ae3SMQoAIQxE0Ym9nkcTvJZX9CKWFoIIu2jjFoLFm5CPIXXkh6q6CXpEXEQ+EuQZwDXK+p9hZgGeblUQCbIpqNvMUt1MXvvQzPLbzOx7gF5AbwG9BfQW0FtAb2E+oxQR3HrhE9UAAAAASUVORK5CYII=`;
      case 'table':
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAU0lEQVR4Ae3WMQoAIAxDUa/g6F08nkdwdBeurjq4iH+BMoRHSAepIlJVRyAzu8EpJtbYthY4YsutuQF+B/A7gN8B/A7gd+DTdyA6wPABFnABYeAGPhWyMPxIJlEAAAAASUVORK5CYII=`;
      default:
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAVElEQVR4Ae3WwQkAIAiFYRfqxm3cEdzGGTpCN7AR7BCCgX3wP1AQPnvqiEgTkXLPzAwNUFXz1bEXGNaZWt85YMCAAQMGDBgw8McAW7+CvgP4HTjxzAaOzj0xIwGJYAAAAABJRU5ErkJggg==`;
    }
  };

  const getHoverClass = (id: string) => {
    switch (id) {
      case 'bed':
        return 'border-red-400';
      case 'bookshelf':
        return 'border-amber-400';
      case 'computer':
        return 'border-blue-400';
      case 'printer':
        return 'border-gray-400';
      case 'door':
        return 'border-green-400';
      case 'table':
        return 'border-yellow-400';
      default:
        return 'border-purple-400';
    }
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-200 ${
        isHovered ? `${getHoverClass(object.id)} border-2 scale-105 z-10` : 'z-5 border-transparent border-2'
      }`}
      style={{
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
        imageRendering: 'pixelated',
        backgroundImage: `url("${getObjectImage(object.id)}")`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black border border-white text-white text-xs px-2 py-1 whitespace-nowrap font-mono">
          {object.name}
        </div>
      )}
      
      {/* Interaction indicator */}
      {isHovered && (
        <div className="absolute -top-2 -right-2 text-yellow-400 text-sm animate-pulse">
          ✨
        </div>
      )}
    </div>
  );
};

export default RoomObject;
