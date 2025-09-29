import React from 'react';
import Logo from '../ui/Logo';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <nav>

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;