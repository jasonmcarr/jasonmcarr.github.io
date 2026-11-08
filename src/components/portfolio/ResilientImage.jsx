import React, { useEffect, useRef, useState } from "react";

/**
 * Re-request research images when the browser occasionally drops or fails a load.
 * The retry parameter avoids a cached failure response.
 */
export default function ResilientImage({ src, alt, ...props }) {
  const [attempt, setAttempt] = useState(0);
  const retryTimer = useRef(null);

  useEffect(() => {
    setAttempt(0);
    return () => clearTimeout(retryTimer.current);
  }, [src]);

  const url = attempt
    ? `${src}${src.includes("?") ? "&" : "?"}retry=${attempt}`
    : src;

  return (
    <img
      {...props}
      alt={alt}
      src={url}
      decoding="async"
      onError={() => {
        if (attempt >= 3) return;
        clearTimeout(retryTimer.current);
        retryTimer.current = setTimeout(
          () => setAttempt((previous) => previous + 1),
          700 * (attempt + 1),
        );
      }}
    />
  );
}
