import React from "react";
import contours from "../../assets/images/terrain-contours.svg";

export default function Terrain({ paused }) {
  return (
    <div className={`terrain ${paused ? "terrain-paused" : ""}`} aria-hidden="true">
      <img className="terrain-contours" src={contours} alt="" />
    </div>
  );
}
