
import React from 'react';

// A specific logo version for the dark footer
const FooterLogo = () => {
  return (
    <a href="#" className="flex items-center gap-2">
      <div className="w-6 h-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 7L22 7" stroke="#60A5FA" strokeWidth="2"/>
          <path d="M2 4L22 4V20L2 20L2 4Z" stroke="#60A5FA" strokeWidth="2"/>
        </svg>
      </div>
      <span className="text-lg font-bold text-white">NotiMail</span>
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <FooterLogo />
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">이용약관</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">개인정보처리방침</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition">문의하기</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">© 2025 NotiMail. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
