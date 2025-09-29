import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <a href="#" className={`flex items-center gap-2 ${className}`}>
      <svg
        className="w-6 h-6 flex-none"
        width="24"
        height="24" // 혹시 모를 글로벌 CSS 무시
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M4 9L20 9" stroke="#2563EB" strokeWidth="2" />
        <path d="M4 6L20 6V18L4 18L4 6Z" stroke="#2563EB" strokeWidth="2" />
      </svg>
      <span className="text-lg font-bold text-black">NotiMail</span>
    </a>
  );
};

export default Logo;
