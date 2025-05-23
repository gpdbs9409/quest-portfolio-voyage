
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
  const getObjectIcon = (id: string) => {
    switch (id) {
      case 'bed':
        return '🛏️';
      case 'bookshelf':
        return '📚';
      case 'computer':
        return '🖥️';
      case 'printer':
        return '🖨️';
      case 'door':
        return '🚪';
      default:
        return '❓';
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform animate-scale-in border-4 border-amber-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-200 to-amber-300 px-6 py-4 rounded-t-lg border-b-4 border-amber-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getObjectIcon(object.id)}</span>
              <h2 className="text-xl font-bold text-amber-900 font-mono">
                {object.content.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-amber-700 hover:text-amber-900 transition-colors p-1 rounded-full hover:bg-amber-100"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed mb-6 font-mono text-sm">
            {object.content.description}
          </p>
          
          {/* Links */}
          {object.content.links && object.content.links.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 font-mono text-sm border-b-2 border-amber-200 pb-1">
                🔗 바로가기
              </h3>
              <div className="space-y-2">
                {object.content.links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleLinkClick(link.url)}
                    className="w-full text-left bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 px-4 py-3 rounded-lg border-2 border-amber-300 transition-all duration-200 hover:shadow-md font-mono text-sm text-amber-900 hover:text-amber-800"
                  >
                    📄 {link.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-amber-50 px-6 py-3 rounded-b-lg border-t-2 border-amber-200">
          <p className="text-xs text-amber-600 font-mono text-center">
            ESC 키 또는 X 버튼으로 닫기
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
