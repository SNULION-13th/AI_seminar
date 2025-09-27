function Input({ value, onChange, onKeyDown, placeholder }) {
  return (
    <input
      type="text"
      className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default Input;
