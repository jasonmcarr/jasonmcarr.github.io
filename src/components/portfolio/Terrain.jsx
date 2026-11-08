import React, { useMemo } from "react";

// Marching squares over a smooth height field. SVG paths stay sharp at every DPI.
export function contourPaths() {
  const nx = 120,
    ny = 80,
    w = 1440,
    h = 960;
  const field = Array.from({ length: ny + 1 }, (_, y) =>
    Array.from({ length: nx + 1 }, (_, x) => {
      const u = (x / nx) * 6,
        v = (y / ny) * 4;
      return (
        Math.sin(u * 0.85 + Math.sin(v * 0.9) * 1.2) +
        0.55 * Math.cos(v * 1.6 - u * 0.3) +
        0.25 * Math.sin(u * 2.2 + v * 1.3)
      );
    }),
  );
  const paths = [];
  for (let level = -1.75; level <= 1.8; level += 0.105) {
    let d = "";
    for (let y = 0; y < ny; y++)
      for (let x = 0; x < nx; x++) {
        const points = [
          [x, y],
          [x + 1, y],
          [x + 1, y + 1],
          [x, y + 1],
        ];
        const values = [
          field[y][x],
          field[y][x + 1],
          field[y + 1][x + 1],
          field[y + 1][x],
        ];
        const cuts = [];
        for (let e = 0; e < 4; e++) {
          const j = (e + 1) % 4;
          const aboveStart = values[e] >= level;
          const aboveEnd = values[j] >= level;
          if (aboveStart !== aboveEnd) {
            const t = (level - values[e]) / (values[j] - values[e]);
            cuts.push([
              ((points[e][0] + t * (points[j][0] - points[e][0])) * w) / nx,
              ((points[e][1] + t * (points[j][1] - points[e][1])) * h) / ny,
            ]);
          }
        }
        for (let k = 0; k + 1 < cuts.length; k += 2)
          d += `M${cuts[k][0].toFixed(2)},${cuts[k][1].toFixed(2)}L${cuts[k + 1][0].toFixed(2)},${cuts[k + 1][1].toFixed(2)}`;
      }
    paths.push(d);
  }
  return paths;
}
export default function Terrain({ paused }) {
  const paths = useMemo(contourPaths, []);
  return (
    <svg
      className={`terrain ${paused ? "terrain-paused" : ""}`}
      viewBox="0 0 1440 960"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="elevation-fill" cx="65%" cy="40%" r="80%">
          <stop className="elevation-high" offset="0%" stopColor="#2c3c30" />
          <stop className="elevation-mid" offset="50%" stopColor="#1a2923" />
          <stop offset="100%" stopColor="#111715" />
        </radialGradient>
        <linearGradient
          id="elevation-lines"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#6a846f" stopOpacity=".12" />
          <stop offset="55%" stopColor="#adc89c" stopOpacity=".32" />
          <stop offset="100%" stopColor="#86b0a6" stopOpacity=".12" />
        </linearGradient>
      </defs>
      <rect width="1440" height="960" fill="url(#elevation-fill)" />
      <g
        fill="none"
        stroke="url(#elevation-lines)"
        strokeWidth=".8"
        strokeLinecap="round"
      >
        {paths.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
