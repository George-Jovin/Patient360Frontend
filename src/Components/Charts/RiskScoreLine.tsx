import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card,Typography } from "antd";
const  {Text} = Typography ;
const data = [
  { name: "Jan", riskScore: 15 },
  { name: "Feb", riskScore: 25 },
  { name: "Mar", riskScore: 35 },
  { name: "Apr", riskScore: 45 },
  { name: "May", riskScore: 55 },
  { name: "Jun", riskScore: 65 },
  { name: "Jul", riskScore: 70 },
  { name: "Aug", riskScore: 80 },
  { name: "Sep", riskScore: 85 },
  { name: "Oct", riskScore: 90 },
  { name: "Nov", riskScore: 95 },
  { name: "Dec", riskScore: 98 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    let color = "";
    if (score <= 50) color = "text-green-500";
    else if (score <= 75) color = "text-yellow-500";
    else color = "text-red-500";

    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border">
        <p className="text-gray-600">{label}</p>
        <p className={`font-bold ${color}`}>Risk Score: {score}</p>
      </div>
    );
  }
  return null;
};

const RiskScoreLine: React.FC = () => {
  const gradientColors = useMemo(() => {
    return (
      <defs>
        <linearGradient id="riskScoreGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="40%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="65%" stopColor="#eab308" />
          <stop offset="75%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    );
  }, []);

  return (
    <Card className="w-full shadow-custom rounded-3xl">
      <Text className="text-[black] font-bold text-lg">
        Risk Score Trend
      </Text>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: -25, right: 10,top:20 }}>
            {gradientColors}
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="riskScore"
              stroke="url(#riskScoreGradient)"
              strokeWidth={3}
              dot={false}
              name="Risk Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RiskScoreLine;
