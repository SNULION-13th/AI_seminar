import React from 'react';

const Input = ({ value, onChange, placeholder, className }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-l-lg p-2 w-full ${className}`}
    />
  );
};

export default Input;
