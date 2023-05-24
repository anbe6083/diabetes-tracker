// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";
import Box from "@mui/material/Box";
import { ColorModeContext, useMode, tokens } from "../../styles/theme";
import { useTheme } from "@mui/material/";
import { useContext } from "react";

const LineChart = ({ data, yUnits, colors }) => {
  return (
    <Box minHeight={"300px"} height={"700px"}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 132, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: yUnits,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={[colors]}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        lineWidth={4}
        useMesh={true}
        areaBaselineValue={140}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default LineChart;
