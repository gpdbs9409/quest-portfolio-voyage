export const roomObjects = [
  {
    id: 'building1',
    name: '서울과학기술대학교',
    top: 120,
    left: 60,
    width: 80,
    height: 150,
  },
  {
    id: 'building2',
    name: '신한투자 디지털아카데미',
    top: 100,
    left: 180,
    width: 70,
    height: 150,
  },
  {
    id: 'building3',
    name: '해커스',
    top: 390,
    left: 140,
    width: 60,
    height: 70,
  },
  {
    id: 'building4',
    name: '홍콩',
    top: 80,
    left: 260,
    width: 70,
    height: 160,
  },
];


import React from 'react';
import { RoomObjectData } from '../hooks/useRoomState';

interface InteractionLayerProps {
  roomObjects: RoomObjectData[];
  onObjectClick: (object: RoomObjectData) => void;
}

const InteractionLayer = ({ roomObjects, onObjectClick }: InteractionLayerProps) => {
  return (
    <div className="absolute inset-0 z-10">
      {roomObjects.map(obj => (
        <div
          key={obj.id}
          className="absolute cursor-pointer"
          style={{
            top: obj.top,
            left: obj.left,
            width: obj.width,
            height: obj.height,
          }}
          onClick={() => onObjectClick(obj)}
        >
          {/* 이름표 항상 표시 */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-xs bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap opacity-100">
            {obj.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InteractionLayer;
