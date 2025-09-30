import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Main Content Section */}
      <div className="relative z-10 px-4 py-16">
        <div className="max-w-sm sm:max-w-md mx-auto space-y-4">
          <h2 className="text-5xl sm:text-6xl font-urbanist font-bold text-fashion-white leading-tight text-left">
            Duality
          </h2>
          <p className="text-sm sm:text-base font-pretendard text-fashion-white leading-relaxed tracking-tight text-left">
            ; 경계를 허물고 진리의 빛을 잇다
          </p>
        </div>
        
        <div className="mt-30 sm:mt-40 max-w-sm sm:max-w-md mx-auto">
          <div className="text-xs sm:text-sm font-pretendard text-fashion-white leading-relaxed space-y-10">
            <div className="space-y-3">
              <p>우리가 살아가는 세계는 수많은 단면과 이면들이 교차하고 있으며,</p>
              <p>그 속에서 무수히 많은 이중성을 만들어냅니다.</p>            
              <p>이중성은 때로 서로를 가르고, 때로는 서로를 비추며,</p>
              <p>우리의 삶을 더 깊고 입체적으로 만듭니다.</p>
            </div>

            <div className="space-y-3">
              <p>서로 반대되는 세계는 경계 위에서 맞물리고,</p>
              <p>그 틈에서 우리는 이중적이지만 솔직한 세계의 숨결을 느낍니다.</p>
            </div>

            <div className="space-y-3">
              <p>빛과 어둠,</p>
              <p>사랑과 미움,</p>
              <p>삶과 죽음,</p>
              <p>꿈과 현실,</p>
              <p>자유와 억압,</p>
              <p>전통과 혁신.</p>
            </div>

            <div className="space-y-3">
              <p>어둠은 빛의 윤곽을 드러내고,</p>
              <p>삶은 죽음으로부터 의미를 가집니다.</p>
              <p>모든 미움은 사랑으로부터 시작되며,</p>
              <p>억압은 자유의 가치를 더욱 선명하게 합니다.</p>
              <p>꿈은 현실에 닿아야 숨을 쉬고,</p>
              <p>현재는 과거의 메아리 속에서 더욱 깊어집니다.</p>
            </div>

            <div className="space-y-3">
              <p>반대되는 모든 것들은 서로의 부재로 증명되고,</p>
              <p>또한 서로의 존재로 완성됩니다.</p>
            </div>

            <div className="space-y-3">
              <p>제44회 의류학과 패션쇼 「Duality」에서는 </p>
              <p>서로를 그 자체로 받아들이기가 점점 어려워지는 극단의 시대에서</p>
              <p>극과 극의 필연적인 관계를 성찰하며,</p>
              <p>서로 다름이 아름다움을 만드는 순간을 조명합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
