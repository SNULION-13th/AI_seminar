import React from "react";

const iconCls = "w-6 h-6 !w-6 !h-6 flex-none block"; // ! = important (전역 CSS 이김)

const LinkIcon = () => (
  <svg
    className={iconCls}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const DocumentTextIcon = () => (
  <svg
    className={iconCls}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className={iconCls}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const featuresData = [
  {
    icon: <LinkIcon />,
    title: "간편한 계정 연동",
    description:
      "복잡한 API 키 발급 과정 없이, 버튼 클릭 몇 번으로 Google(Gmail)과 Notion 계정을 안전하게 연동합니다.",
  },
  {
    icon: <DocumentTextIcon />,
    title: "본문 미리보기",
    description:
      "Notion 페이지에는 이메일 본문의 첫 200자 정도가 텍스트로 저장되어 내용을 빠르게 파악할 수 있습니다.",
  },
  {
    icon: <ExternalLinkIcon />,
    title: "원본 링크 제공",
    description:
      "클릭 한 번으로 원본 Gmail을 바로 열 수 있는 링크가 함께 제공되어 언제든 원본 확인이 가능합니다.",
  },
];

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 flex-none">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            주요 기능
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            사용자가 '설정하고 잊어버릴(Set it and forget it)' 수 있도록,
            직관적이고 필수적인 기능에 집중합니다.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
