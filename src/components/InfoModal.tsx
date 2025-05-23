
import React from 'react';
import { X } from 'lucide-react';

interface RoomObjectData {
  id: string;
  name: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: {
    title: string;
    description: string;
    links?: { text: string; url: string }[];
  };
}

interface InfoModalProps {
  object: RoomObjectData;
  onClose: () => void;
}

const InfoModal = ({ object, onClose }: InfoModalProps) => {
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

  const handleLinkClick = (url: string) => {
    if (url.startsWith('mailto:') || url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      // Handle internal navigation or file download
      console.log('Navigate to:', url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-black text-white max-w-md w-full border-4 border-white transform animate-scale-in"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Header */}
        <div className="bg-gray-900 px-4 py-3 border-b-4 border-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <img 
                src={getObjectImage(object.id)} 
                alt={object.name}
                className="w-full h-full"
              />
            </div>
            <h2 className="text-xl font-bold text-white font-mono">
              {object.content.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <p className="text-white leading-relaxed mb-6 font-mono text-sm">
            {object.content.description}
          </p>
          
          {/* Links */}
          {object.content.links && object.content.links.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-white font-mono text-sm border-b-2 border-gray-700 pb-1">
                🔗 바로가기
              </h3>
              <div className="space-y-2">
                {object.content.links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleLinkClick(link.url)}
                    className="w-full text-left bg-gray-900 hover:bg-gray-800 px-4 py-2 border-2 border-white font-mono text-sm text-white"
                  >
                    📄 {link.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-900 px-4 py-2 border-t-2 border-white">
          <p className="text-xs text-gray-400 font-mono text-center">
            ESC 키 또는 X 버튼으로 닫기
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
