import React, { useState } from "react";
import { useCreateNotiPage } from "../../hooks/useCreateNotionPage";

// Placeholder Icons
const GmailIcon = () => (
  <svg
    className="w-6 h-6 text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);
const NotionIcon = () => (
  <svg
    className="w-6 h-6 text-gray-800"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    ></path>
  </svg>
); // Simplified Notion-like icon
const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const steps = [
  {
    step: 1,
    title: "Gmail 계정 연결",
    description:
      '서비스의 핵심 가치를 한 문장으로 보여주고, "Gmail 계정으로 시작하기" 버튼을 클릭하세요.',
    icon: <GmailIcon />,
  },
  {
    step: 2,
    title: "Notion 워크스페이스 연결",
    description:
      "이메일을 저장할 Notion 페이지 또는 데이터베이스에 대한 접근 권한을 부여하여 연동을 완료합니다.",
    icon: <NotionIcon />,
  },
  {
    step: 3,
    title: "완료 및 자동화 시작",
    description:
      "설정이 완료되면 자동으로 이메일이 Notion에 저장됩니다. 이제 중요한 이메일을 놓치지 마세요.",
    icon: <CheckIcon />,
  },
];

const StepCard = ({ step, title, description, icon, isRight }) => (
  <div
    className={`w-full lg:w-1/2 ${
      isRight ? "lg:pl-16" : "lg:pr-16 lg:text-right"
    }`}
  >
    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
      <div
        className={`flex items-center gap-4 ${
          isRight ? "" : "lg:flex-row-reverse"
        }`}
      >
        <div className="bg-blue-100 text-blue-600 font-bold w-10 h-10 rounded-full flex items-center justify-center">
          {step}
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mt-4">
        {description}
      </p>
    </div>
  </div>
);

const TimelineIcon = ({ icon, isFirst, isLast }) => (
  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-4 bg-white h-8 w-8 rounded-full border-4 border-blue-600 flex items-center justify-center">
    {icon}
  </div>
);

const SetupGuide = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createNotionPageMutation = useCreateNotiPage();

  const handleCreatePage = () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // Notion 데이터베이스 ID를 여기에 입력하세요.
    // 이 ID는 Notion에서 데이터베이스의 URL에서 찾을 수 있습니다.
    // 예: https://www.notion.so/yourworkspace/Your-Database-Name-YOUR_DATABASE_ID?v=...
    const NOTION_DATABASE_ID = "27dffdeeef008081bdc3000cfab2f17f"; // TODO: Replace with actual Notion Database ID

    createNotionPageMutation.mutate({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: title } }] }, // Notion 데이터베이스의 제목 속성 이름이 'Name'이라고 가정
      },
      content: content,
    });
  };

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            간단한 설정 과정
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            복잡한 메뉴 없이, 사용자가 여정을 따라가기만 하면 설정이 완료되는
            경험을 제공합니다.
          </p>
        </div>

        <div className="relative">
          {/* The vertical line */}
          <div className="hidden lg:block absolute top-0 left-1/2 w-0.5 h-full bg-gray-200"></div>

          <div className="relative flex flex-col gap-12 lg:gap-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex justify-center ${
                  index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"
                }`}
              >
                <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white p-2 rounded-full border-4 border-gray-200">
                    {step.icon}
                  </div>
                </div>
                <StepCard {...step} isRight={index % 2 !== 0} />
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default SetupGuide;
