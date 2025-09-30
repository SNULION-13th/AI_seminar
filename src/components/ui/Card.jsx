import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
