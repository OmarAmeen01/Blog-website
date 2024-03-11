import React from "react";

function Logo({ className }) {
  return (
    <div className={`p-1 font-bold tracking-wider text-[20px] ${className}`}>
      <h1>Giga BLog</h1>
    </div>
  );
}

export default Logo;
