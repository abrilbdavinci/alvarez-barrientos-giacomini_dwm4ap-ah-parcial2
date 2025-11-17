import React from "react";

export default function Button({ text, color = "default", handleClick, type = "button", className = "" }) {
  return (
    <button
      onClick={handleClick}
      type={type}
      className={`btn btn-${color} ${className}`}
    >
      {text}
    </button>
  );
}
