import React, { forwardRef, useId } from "react";

const Input = forwardRef(function input(
  { label, type = "text", className, ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label
          className="after:content-['*'] after:text-red-600 after:text-2xl text-xl"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
