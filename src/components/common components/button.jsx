import React from "react";

function Button({ type, className = "", children, ...props }) {
  return (
    <button
      className={`p-2 text-lg font-semibold rounded-lg border border-black rounder-lg transition-transform hover:scale-105 hover:opacity-75 w-[150px]  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
