import React from 'react';

const DesignerCard = ({ designer }) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Designer Image Placeholder */}
      <div className="w-40 h-40 sm:w-44 sm:h-44 bg-fashion-border flex items-center justify-center">
        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
          <span className="text-fashion-white text-sm font-urbanist">Image</span>
        </div>
      </div>
      
      {/* Designer Info */}
      <div className="flex flex-col items-center space-y-6">
        {/* Vertical Line */}
        <div className="w-px h-32 bg-fashion-white"></div>
        
        {/* Designer Details */}
        <div className="text-center space-y-1">
          <p className="text-xs sm:text-sm font-urbanist text-fashion-white">
            {designer.role}
          </p>
          <p className="text-sm sm:text-base font-pretendard font-bold text-fashion-white tracking-tight">
            {designer.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesignerCard;
