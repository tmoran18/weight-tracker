import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineGraph = ({ graphData }) => {
  return (
    <div
      style={{
        height: "50vh",
        background: "white",
        margin: "2rem",
        boxShadow: "0 8px 18px rgba(0, 0, 0, 0.08)",
        borderRadius: "10px",
      }}
    >
      <ResponsiveLine
        data={graphData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 75,
          max: 98,
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={{
          orient: "right",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Pushups",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Weight - KG",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        colors={(d) => d.color}
        pointSize={7}
        pointColor="#ffffff"
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={false}
        theme={{
          fontSize: 16,
          fontFamily: "Sans-serif",
          textColor: "#222222",
        }}
        legends={[]}
      />
    </div>
  );
};

export default LineGraph;
