import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StageSection from './components/StageSection';
import Footer from './components/Footer';
import './App.css';

import EventInfo from './components/EventInfo';

function App() {
  const stages = [
    {
      id: 1,
      title: "Dream & Reality",
      subtitle: "꿈을 꾸게 하는 현실과 현실을 바꾸는 꿈, 그 긴밀한 관계에 대하여",
      description: "꿈은 현실의 조각들이 엮여 탄생한 또 다른 세계다.\n예상치 못한 색과 열기로 번쩍이는 꿈의 장면은, 현실 속에 작지만 선명한 빛을 남긴다.\n우리는 그 조각을 품고 삶을 이어가며 새로운 시각과 발견을 얻고, \n불가능해 보였던 경계를 넘어 '꿈다운' 현실을 살아낸다.\n\n이 꿈과 현실의 관계는 몽환적이고 초현실주의적인 감각으로 재구성되어 \n동화적 실루엣과 색감, 르네 마그리트 작품에서 착안한 실험적 색채와 형태, \n반짝이는 비즈의 별들과 변형된 시계, 여러 겹의 레이어드와 혼재된 오브제로 연결된다.",
      designers: [
        { name: "서정원", role: "Designer" },
        { name: "여세아", role: "Designer" },
        { name: "신시은", role: "Designer" },
        { name: "반수현", role: "Designer" }
      ]
    },
    {
      id: 2,
      title: "Autonomy & Restraint",
      subtitle: "자유와 억압, 모순의 경계를 잇다.",
      description: "아이러니하게도 우리는 억압을 통해 존재를 실감하고, \n제약 속에서 더 명확히 자유를 느낀다.\n완벽한 자유는 방향 없는 허무로 흩어지고, \n완전한 억압은 스스로를 잃는 침묵으로 가라앉는다.\n자유와 억압, 그 모순의 경계에서 우리는 가장 선명한 존재로 거듭난다.\n\n해방과 구속이 한 공간에 머무는 순간은 \n비정형적인 실루엣과 구조의 해체, 자유롭고 실험적인 형태 위에 \n불편함과 긴장을 불러일으키는 오브제가 맞물리며 구현된다.\n모순이 만들어내는 긴장과 해방의 찰나를 \n시각적 언어로 옮기며 양가성의 미학을 조명한다.",
      designers: [
        { name: "김서정", role: "Designer" },
        { name: "김하윤", role: "Designer" },
        { name: "박유진", role: "Designer" }
      ]
    },
    {
      id: 3,
      title: "Tradition & Revolution",
      subtitle: "전통과 혁신, 기억을 넘어 미래로 잇다.",
      description: "전통은 고정된 표본이 아니다. \n오래된 손길과 이야기를 품은 전통은 오늘의 감각 속에서 다시 숨 쉬고, \n미래를 향한 혁신은 전통을 토대로 더욱 선명해진다. \n\n각 디자이너들이 선별한 전통적 모티프는 \n현대적 재료, 도발적인 구조, 실험적 질감을 통해 현재의 맥락에서 재구성된다. \n문화적 원형의 현대적 해석은\n시간을 관통하는 조형의 연속성과 변형 가능성을 증명하며\n전통이 새로운 정체성으로 이어지는 순간을 재현한다.",
      designers: [
        { name: "이채현", role: "Designer" },
        { name: "이동호", role: "Designer" },
        { name: "박서윤", role: "Designer" },
        { name: "남유진", role: "Designer" },
        { name: "율리아", role: "Designer" },
        { name: "이채은", role: "Designer" }
      ]
    }
  ];

  return (
    <div className="App bg-fashion-black text-fashion-white min-h-screen">
      <Header />
      <HeroSection />
      <div className="px-4 py-16 space-y-20 sm:space-y-24">
        {stages.map((stage) => (
          <StageSection key={stage.id} stage={stage} />
        ))}
      </div>
        <EventInfo />
        <Footer />
    </div>
  );
}

export default App;
