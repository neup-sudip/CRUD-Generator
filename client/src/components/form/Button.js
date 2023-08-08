import React from "react";

const Button = ({ label, type, color, hoverColor }) => {
  return (
    <div className="mb-1">
      <div>
        <button
          type={type}
          className={`inline-block px-6 py-2 ${color} text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:${hoverColor}`}
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default Button;
