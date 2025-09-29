import React, { useState, useEffect } from "react";
import { useNotionContent } from "../../hooks/useNotionContent";
import { useGmailEmails } from "../../hooks/useGmailEmails"; // Changed from useGmailContent
import { getGoogleAuthUrl } from "../../services/gmail";

const Hero = () => {
  // Placeholder for Notion Page ID
  const [notionPageId, setNotionPageId] = useState(
    "27dffdeeef00801bb1fbd7c0231a2b96"
  ); // TODO: Replace with actual Notion Page ID
  const [gmailAccessToken, setGmailAccessToken] = useState(""); // This would come from OAuth flow

  // Effect to check for accessToken in URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    if (accessToken) {
      setGmailAccessToken(accessToken);
      // Clean the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // Run only once on mount

  const {
    notionContent,
    isLoading: isNotionLoading,
    error: notionError,
  } = useNotionContent(notionPageId);
  // Use useGmailEmails instead of useGmailContent
  const {
    gmailEmails,
    isLoading: isGmailLoading,
    error: gmailError,
  } = useGmailEmails(gmailAccessToken); // No emailId needed here

  const handleGoogleAuth = () => {
    window.location.href = getGoogleAuthUrl();
  };

  return (
    <section className="bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Gmail과 Notion의 <span className="text-blue-600">핵심 정보</span>
              를 한눈에
            </h1>
            <p className="text-gray-600 text-lg">
              NotiMail은 중요한 Gmail 이메일과 Notion 페이지의 핵심 내용을 메인
              화면에서 바로 보여줍니다. 더 이상 여러 앱을 오가지 않고 중요한
              정보를 빠르게 파악하세요.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleGoogleAuth}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                Gmail 계정으로 시작하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
              <a
                href="#"
                className="bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
              >
                서비스 둘러보기
              </a>
            </div>
          </div>

          {/* Right Column - Content Display */}
          <div className="hidden lg:block p-4 bg-blue-50 rounded-lg shadow-inner"> {/* Added a container with subtle styling */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">핵심 정보 요약</h2> {/* Added a section title */}
            <div className="space-y-8">
              {/* Notion Content Card */}
              <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Notion 페이지 미리보기</h3>
                {isNotionLoading && <p className="text-gray-500">Notion 콘텐츠 로딩 중...</p>}
                {notionError && <p className="text-red-500">Notion 콘텐츠 로드 오류: {notionError.message}</p>}
                {notionContent && (
                  <div>
                    <p className="font-semibold text-blue-600">{notionContent.title}</p>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-3">{notionContent.snippet}</p>
                  </div>
                )}
                {!notionPageId && <p className="text-yellow-600">Notion Page ID를 설정해주세요.</p>}
              </div>

              {/* Gmail Content List */}
              <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2">최근 Gmail 이메일</h3>
                {isGmailLoading && <p className="text-gray-500">Gmail 이메일 로딩 중...</p>}
                {gmailError && <p className="text-red-500">Gmail 이메일 로드 오류: {gmailError.message}</p>}
                {gmailEmails.length > 0 ? (
                  <div className="space-y-4">
                    {gmailEmails.map((email) => (
                      <div key={email.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                        <p className="font-semibold text-gray-800">{email.subject}</p>
                        <p className="text-gray-600 text-sm">보낸 사람: {email.sender}</p>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{email.snippet}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  !isGmailLoading && !gmailError && gmailAccessToken && (
                    <p className="text-gray-500">표시할 Gmail 이메일이 없습니다.</p>
                  )
                )}
                {!gmailAccessToken && <p className="text-yellow-600">Gmail 계정을 연결해주세요.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
