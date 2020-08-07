import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineGraphRight = ({ graphData }) => {
  return (
    <div
      className="pushups_graph"
      style={{
        height: "500px",
        background: "",
        maxHeight: "490px",
        margin: "2rem",
        boxShadow: "0 8px 18px rgba(0, 0, 0, 0.08)",
        borderRadius: "10px",
        paddingBottom: "100px",
      }}
    >
      <ResponsiveLine
        data={graphData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        enableGridY={false}
        yScale={{
          type: "linear",
          min: 0,
          max: 110,
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
        axisBottom={null}
        axisLeft={null}
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
          textColor: "red",
        }}
        legends={[]}
      />
    </div>
  );
};

export default LineGraphRight;
