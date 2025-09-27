function Button({ onClick, children }) {
  return (
    <button
      className="w-20 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
