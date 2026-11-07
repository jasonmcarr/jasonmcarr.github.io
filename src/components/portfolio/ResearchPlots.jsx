import React from "react";
import Plot from "react-plotly.js";
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
      {plots.map(([title, plot]) => (
        <figure key={title}>
          <h3>{title}</h3>
          <Plot
            data={plot.data.map((trace) => ({
              ...trace,
              type: trace.type === "scattergl" ? "scatter" : trace.type,
            }))}
            layout={{
              ...plot.layout,
              autosize: true,
              width: undefined,
              height: 400,
              margin: { l: 65, r: 30, t: 40, b: 75 },
            }}
            useResizeHandler
            style={{ width: "100%" }}
            config={{ responsive: true, displaylogo: false, scrollZoom: false }}
          />
        </figure>
      ))}
    </div>
  );
}
