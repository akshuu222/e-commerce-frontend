import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({ orders, ismd }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const newData = orders?.map((o) => {
    const date = new Date(o?._id?.year, o?._id?.month - 1, o?._id?.day);

    return {
      x: daysOfWeek[date.getDay()],
      y: o?.totalOrders,
    };
  });

  const data = [
    {
      id: "last week",
      color: "hsl(342, 70%, 50%)",
      data: newData,
    },
  ];

  return (
    <ResponsiveLine
      data={data}
      margin={{
        top: ismd ? 50 : 50,
        right: ismd ? 20 : 110,
        bottom: 50,
        left: ismd ? 50 : 60,
      }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Days",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Product Sold",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "set3" }}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      pointLabel="y"
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={0.35}
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "row",
          justify: false,
          translateX: 20,
          translateY: -36,
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
  );
};

export default LineChart;
