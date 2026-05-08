import React, { useState } from "react";

function Button({ text, color, size, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-lg font-medium transition-all duration-300
        ${size == "small" ? "text-sm px-4 py-1" : ""}
        ${size == "large" ? "text-lg px-8 py-3" : ""}
        ${color == "primary" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
        ${color == "secondary" ? "bg-gray-500 hover:bg-gray-600 text-white" : ""}
        ${color == "danger" ? "bg-red-500 hover:bg-red-600 text-white" : ""}
        ${color == "success" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
    >
      {text}
    </button>
  );
}

function BasicProps() {
  const [clickCount, setClickCount] = useState(0);
  return <div className="text-white">BasicProps</div>;
}

export default BasicProps;
