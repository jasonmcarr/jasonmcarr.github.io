export const palette = ["#b2cd9f", "#85b9b2", "#d6bd89", "#b6a9cc", "#c8907d"];
const sageScale = [
  [0, "#52756b"],
  [0.45, "#8eaf84"],
  [1, "#dce7bb"],
];
export function themeTrace(trace, index) {
  const color = palette[index % palette.length];
  if (trace.type === "table")
    return {
      ...trace,
      header: {
        ...trace.header,
        height: 34,
        font: { color: "#ecf0e8", family: "Barlow", size: 15 },
        fill: { color: "#293a2e" },
        line: { color: "#52634f" },
      },
      cells: {
        ...trace.cells,
        height: 30,
        font: { color: "#d3ddcf", family: "Barlow", size: 14 },
        fill: { color: "#17201b" },
        line: { color: "#344237" },
      },
    };
  return {
    ...trace,
    type: trace.type === "scattergl" ? "scatter" : trace.type,
    line: { ...trace.line, color },
    marker: {
      ...trace.marker,
      color: Array.isArray(trace.marker?.color) ? trace.marker.color : color,
      colorscale: sageScale,
      line: {
        ...trace.marker?.line,
        color,
        width: trace.marker?.line?.width || 0,
      },
    },
  };
}
export function themeAxis(axis = {}) {
  return {
    ...axis,
    color: "#cbd7c4",
    linecolor: "#73866d",
    tickcolor: "#a9bf9e",
    tickfont: { ...axis.tickfont, color: "#cbd7c4", size: 12 },
    title: {
      ...axis.title,
      font: { color: "#dce7d5", size: 14 },
      standoff: 14,
    },
    gridcolor: "rgba(173,200,156,0.12)",
    zerolinecolor: "#4b5f4e",
    automargin: true,
    ...(axis.tickvals
      ? {
          tickmode: "array",
          tickvals: [...axis.tickvals],
          ticktext: axis.ticktext?.slice(0, axis.tickvals.length),
        }
      : {}),
  };
}
export function themeLayout(layout, table = false) {
  return {
    ...layout,
    template: {},
    autosize: true,
    width: undefined,
    height: table ? 190 : 430,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { family: "Barlow, sans-serif", color: "#dce7d5", size: 13 },
    colorway: palette,
    xaxis: themeAxis(layout.xaxis),
    yaxis: themeAxis(layout.yaxis),
    legend: {
      ...layout.legend,
      font: { color: "#dce7d5", size: 12 },
      bgcolor: "rgba(0,0,0,0)",
      orientation: "h",
      y: 1.12,
      x: 0,
      xanchor: "left",
      yanchor: "bottom",
    },
    hoverlabel: {
      bgcolor: "#1d2a22",
      bordercolor: "#a9c299",
      font: { color: "#ecf0e8" },
    },
    margin: table ? { l: 0, r: 0, t: 5, b: 0 } : { l: 65, r: 20, t: 60, b: 70 },
  };
}
