import React from "react";
export default function Arrow({ direction = "up" }) {
  return (
    <svg
      className={`arrow-icon arrow-${direction}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}
