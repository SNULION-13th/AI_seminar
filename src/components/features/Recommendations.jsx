import React from "react";

const iconCls = "w-6 h-6 flex-none block"; // 필요시 !w-6 !h-6로 강제

const BriefcaseIcon = () => (
  <svg
    className={iconCls}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const AcademicCapIcon = () => (
  <svg
    className={iconCls}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);
const CodeIcon = () => (
  <svg
    className={iconCls}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const recommendationsData = [
  {
    icon: <BriefcaseIcon />,
    title: "직장인/프리랜서",
    description:
      "클라이언트 문의, 프로젝트 업데이트, 세금계산서 등 업무 관련 이메일을 Notion의 프로젝트 보드나 업무 일지에 자동으로 기록하세요.",
  },
  {
    icon: <AcademicCapIcon />,
    title: "학생/연구원",
    description:
      "학과 공지, 교수님 메일, 구독하는 학술 뉴스레터 등을 Notion의 학습 관리 페이지에 모아보고 효율적으로 관리하세요.",
  },
  {
    icon: <CodeIcon />,
    title: "개인 프로젝트 진행자",
    description:
      "GitHub 알림, 서비스 장애 리포트, 사용자 피드백 등 흩어져 있는 정보를 한곳에서 관리하여 프로젝트를 더 쉽게 운영하세요.",
  },
];

// Reusable Card component, similar to the one in Features.jsx
const RecommendationCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 flex-none">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const Recommendations = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            이런 분들에게 추천합니다
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Zapier, IFTTT 같은 다목적 자동화 툴의 복잡함에 피로를 느끼고, 오직
            'Gmail → Notion'이라는 하나의 목표에만 집중된 직관적인 서비스를
            원하는 분들을 위한 솔루션입니다.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {recommendationsData.map((rec, index) => (
            <RecommendationCard key={index} {...rec} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
