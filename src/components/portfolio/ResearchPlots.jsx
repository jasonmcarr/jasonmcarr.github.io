import React from "react";
import Plot from "react-plotly.js";
import { themeTrace, themeLayout } from "./plotTheme";
import thermal from "../../assets/json_files/thermalmotionscatterplot.json";
import vertical from "../../assets/json_files/verticalhistogram.json";
import transverse from "../../assets/json_files/transversehistogram.json";
import airline from "../../assets/json_files/avgpricebyairline.json";
import day from "../../assets/json_files/avgpricebyairlinebyday.json";
import time from "../../assets/json_files/avgpricebyairlinebytime.json";

export default function ResearchPlots({ type }) {
  const plots =
    type === "optical"
      ? [
          ["Particle position", thermal],
          ["Vertical displacement", vertical],
          ["Transverse displacement", transverse],
        ]
      : [
          ["Average price by airline", airline],
          ["Average price by departure date", day],
          ["Price by departure time", time],
        ];
  return (
    <div className="research-plots">
      {type === "optical" && (
        <p className="calibration-note">
          Original axis calibration: particle position in µm; displacement
          histograms in µm². Histogram tick positions and occurrence labels are
          retained from the original analysis.
        </p>
      )}
      {plots.map(([title, plot]) => (
        <figure key={title}>
          <h3>{title}</h3>
          <Plot
            data={plot.data.map(themeTrace)}
            layout={themeLayout(plot.layout, plot.data[0]?.type === "table")}
            useResizeHandler
            style={{ width: "100%" }}
            config={{ responsive: true, displaylogo: false, scrollZoom: false }}
          />
        </figure>
      ))}
    </div>
  );
}
