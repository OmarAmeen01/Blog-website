import React, { useId, forwardRef } from "react";

function Select({ options = [], className = "", label, ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className=" font-semibold after:content-['*'] after:text-red-600 after:text-2xl text-xl"
        >
          {label}
        </label>
      )}{" "}
      <select
        id={id}
        ref={ref}
        className={className}
        {...props}
        value="Set status"
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
