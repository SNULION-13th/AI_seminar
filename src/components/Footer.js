import React from 'react';

const Footer = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center space-y-6 max-w-sm sm:max-w-md">
        <h1 className="text-2xl font-urbanist font-bold text-fashion-gray leading-tight">
          Duality
        </h1>
        <p className="text-sm sm:text-base font-pretendard text-fashion-gray leading-relaxed tracking-tight">
          ; 경계를 허물고 진리의 빛을 잇다
        </p>
        <p className="text-xs sm:text-sm font-urbanist text-fashion-gray">
          44th Seoul Nat'l Univ. Fashion Show
        </p>
      </div>
    </div>
  );
};

export default Footer;
