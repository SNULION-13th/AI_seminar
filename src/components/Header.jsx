import React from 'react';
import SettingsIcon from '../assets/settings.svg';

const Header = () => {
  return (
    <header className="bg-white shadow-sm w-full">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-bold text-sky-600">Focus Todo</h1>
        <button>
          <img src={SettingsIcon} alt="Settings" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
