import React from 'react';
import DesignerCard from './DesignerCard';

const StageSection = ({ stage }) => {
  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-11">
      {/* Stage Header */}
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-urbanist text-fashion-white px-4 py-2 bg-fashion-black w-fit">
            Stage {stage.id}
          </span>
          <div className="w-full h-px bg-fashion-border"></div>
        </div>
        
        <div className="text-center space-y-1">
          <h3 className="text-2xl sm:text-3xl font-urbanist font-bold text-fashion-white">
            {stage.title}
          </h3>
          <p className="text-xs sm:text-sm font-pretendard text-fashion-white leading-relaxed tracking-tight">
            ♦ {stage.subtitle}
          </p>
        </div>
      </div>
      
      {/* Designer Cards */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {stage.designers.map((designer, index) => (
          <DesignerCard 
            key={index} 
            designer={designer} 
          />
        ))}
      </div>
      
      {/* Description */}
      <div className="px-2">
        <div className="text-xs sm:text-sm font-pretendard text-fashion-white leading-relaxed whitespace-pre-line">
          {stage.description}
        </div>
      </div>
    </div>
  );
};

export default StageSection;
