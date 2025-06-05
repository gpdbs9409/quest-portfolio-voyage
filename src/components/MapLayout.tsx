import React from 'react';

const MapLayout = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url("/assets/city.png")`, // 🔥 다운받은 이미지 사용
        backgroundSize: 'cover',                     // 전체 배경 채우기
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default MapLayout;
