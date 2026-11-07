import React, { useEffect, useRef } from "react";

// A deterministic height field. Color and contours derive from the same elevation.
export default function Terrain({ paused }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame,
      last = 0,
      phase = 0;
    const draw = () => {
      const width = canvas.width,
        height = canvas.height;
      const image = ctx.createImageData(width, height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const u = (x / width) * 6,
            v = (y / height) * 4;
          const h =
            Math.sin(u * 0.85 + Math.sin(v * 0.9 + phase) * 1.2) +
            0.55 * Math.cos(v * 1.6 - u * 0.3 + phase * 0.7) +
            0.25 * Math.sin(u * 2.2 + v * 1.3 - phase * 0.5);
          const level = (h + 1.8) / 3.6;
          const contour = Math.pow(Math.max(0, Math.cos(h * 25)), 24);
          const glow = Math.max(0, level) * 14;
          const i = (y * width + x) * 4;
          image.data[i] = 17 + glow * 0.65 + contour * 17;
          image.data[i + 1] = 23 + glow + contour * 23;
          image.data[i + 2] = 21 + glow * 0.65 + contour * 16;
          image.data[i + 3] = 255;
        }
      }
      ctx.putImageData(image, 0, 0);
    };
    const resize = () => {
      canvas.width = Math.min(720, Math.round(window.innerWidth * 0.55));
      canvas.height = Math.min(520, Math.round(window.innerHeight * 0.55));
      draw();
    };
    const tick = (now) => {
      if (now - last > 65) {
        phase += Math.min((now - last) / 1000, 0.1) * 0.035;
        last = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (!paused && !reduced.matches && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else draw();
    };
    resize();
    sync();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [paused]);
  return <canvas ref={canvasRef} className="terrain" aria-hidden="true" />;
}
