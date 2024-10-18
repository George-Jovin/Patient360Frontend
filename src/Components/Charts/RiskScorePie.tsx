import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, Typography } from "antd";
const { Text } = Typography;

interface DataType {
  name: string;
  value: number;
  fill: string;
}

const data: DataType[] = [
  { name: "Heart rate", value: 60, fill: "#5856D6" },
  { name: "Blood Pressure", value: 40, fill: "#204496" },
  { name: "SpO2", value: 20, fill: "#5AA2D7" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: DataType }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, fill } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-md p-2 shadow-md">
        <p className="m-0" style={{ color: fill }}>
          {name}
        </p>
        <p className="m-0" style={{ color: fill }}>{`Value: ${value}%`}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      {data.map((entry, index) => (
        <div key={`item-${index}`} className="flex  flex-col">
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.fill }}
            />
            <Text className="text-lg font-semibold">{`${entry.value}%`}</Text>
          </div>
          <Text className="text-sm text-gray-500">{entry.name}</Text>
        </div>
      ))}
    </div>
  );
};

const RiskScorePie: React.FC = () => {
  return (
    <Card className="w-full shadow-custom rounded-3xl">
      <Text className="text-[black] font-bold text-lg">
        Risk Score Weightage
      </Text>
      <div className="w-full h-[250px] flex items-center">
        <div className="w-2/3 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="100%"
              barSize={20}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="value" background />
              <Tooltip content={<CustomTooltip />} cursor={false} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/3">
          <CustomLegend />
        </div>
      </div>
    </Card>
  );
};

export default RiskScorePie;
