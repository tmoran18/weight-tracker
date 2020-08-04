import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineGraph = ({ graphData }) => {
  return (
    <div
      style={{
        height: "500px",
        background: "",
        margin: "2rem",
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
        axisRight={null}
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
          textColor: "#00b2ff",
        }}
        legends={[]}
      />
    </div>
  );
};

export default LineGraph;
