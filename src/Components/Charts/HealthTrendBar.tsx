import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography } from "antd";
const { Text } = Typography;
interface DataType {
  name: string;
  actual: number;
  average: number;
}

const data: DataType[] = [
  { name: "Heart Rate", actual: 75, average: 72 },
  { name: "SpO2", actual: 98, average: 97 },
  { name: "Blood Pressure", actual: 120, average: 118 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-2 shadow-md">
        <p className="font-bold">{label}</p>
        <p className="text-[#BEC2FC]">{`Actual: ${payload[0].value}`}</p>
        <p className="text-[#204496]">{`Average: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4">
      <div className="flex items-center">
        <span
          className="inline-block w-4 h-4 mr-2 rounded-full"
          style={{ backgroundColor: "#BEC2FC" }}
        ></span>
        Actual
      </div>
      <div className="flex items-center">
        <span
          className="inline-block w-4 h-4 mr-2 rounded-full"
          style={{ backgroundColor: "#204496" }}
        ></span>
        Average
      </div>
    </div>
  );
};

const HealthTrendBar: React.FC = () => {
  return (
    <Card className="w-full shadow-custom rounded-3xl">
      <Text className="text-[black] font-bold text-lg">Avg vs Actual</Text>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -50 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.1} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tick={false} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Legend content={<CustomLegend />} iconType="circle" />
            <Bar dataKey="actual" fill="#BEC2FC" barSize={15} />
            <Bar dataKey="average" fill="#204496" barSize={15} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HealthTrendBar;
