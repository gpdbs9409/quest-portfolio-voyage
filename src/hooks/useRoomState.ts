import { useState } from 'react';

interface Position {
  x: number;
  y: number;
}

export interface RoomObjectData {
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

export const useRoomState = () => {
  const [selectedObject, setSelectedObject] = useState<RoomObjectData | null>(null);

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

  const handleObjectClick = (object: RoomObjectData) => {
    setSelectedObject(object);
  };

  const closeModal = () => {
    setSelectedObject(null);
  };

  return {
    roomObjects,
    selectedObject,
    handleObjectClick,
    closeModal
  };
}; 