import { Flex } from "antd";
import React from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    title: string;
    sales: number;
  }[];
}

const RankChart: React.FC<Props> = ({ data }) => {
  return (
    <Flex
      style={{ height: "70vh", width: "100%", padding: "20px" }}
      justify="center"
    >
      <ResponsiveContainer width="80%" height="100%">
        <BarChart data={data} layout="vertical">
          <YAxis
            dataKey="title"
            type="category"
            width={300}
            tick={<CustomYAxisTick />}
          />
          <XAxis dataKey="sales" type="number" />
          <Tooltip />
          <Bar dataKey="sales" fill="#8884d8">
            <LabelList dataKey="sales" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
};

const CustomYAxisTick: React.FC<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        dx={-10}
        fontSize={"1.1em"}
        textAnchor="end"
        fill="black"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default RankChart;
