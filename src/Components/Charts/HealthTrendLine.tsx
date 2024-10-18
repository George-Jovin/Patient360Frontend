import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography } from "antd";
const { Text } = Typography;

interface HealthMetric {
  key: string;
  label: string;
  color: string;
  defaultValue: number;
  variance: number;
}

interface DataPoint {
  name: string;
  [key: string]: number | string;
}

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  color: string;
  label: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
  }>;
  label?: string;
}

const healthMetrics: HealthMetric[] = [
  {
    key: "heartRate",
    label: "Heart Rate",
    color: "#F64E60",
    defaultValue: 60,
    variance: 15,
  },
  {
    key: "spO2",
    label: "SpO2",
    color: "#348DC5",
    defaultValue: 98,
    variance: 2,
  },
  {
    key: "stress",
    label: "Stress",
    color: "#AF52DE",
    defaultValue: 50,
    variance: 20,
  },
  {
    key: "systolic",
    label: "Systolic",
    color: "#FF3B30",
    defaultValue: 120,
    variance: 10,
  },
  {
    key: "diastolic",
    label: "Diastolic",
    color: "#007AFF",
    defaultValue: 80,
    variance: 8,
  },
];

const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const generateData = (): DataPoint[] => {
  return months.map((month) => {
    const dataPoint: DataPoint = { name: month };
    healthMetrics.forEach((metric) => {
      const randomVariance = (Math.random() - 0.5) * 2 * metric.variance;
      dataPoint[metric.key] = Math.round(metric.defaultValue + randomVariance);
    });
    return dataPoint;
  });
};

const data = generateData();

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  color,
  label,
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative w-4 h-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-4 h-4 border-2 rounded transition-colors ${
            checked ? "bg-white" : "bg-white"
          }`}
          style={{ borderColor: color }}
        />
        {checked && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: color }}
          >
            <svg
              className="w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6L5 9L10 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      <span className="text-sm text-[#7887A6]">{label}</span>
    </label>
  );
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border">
        <p className="text-gray-600 font-semibold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-medium">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const HealthTrendLine: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>(
    healthMetrics.reduce(
      (acc, metric) => ({
        ...acc,
        [metric.key]: true,
      }),
      {}
    )
  );

  const handleCheckboxChange = (metric: string) => {
    setVisibleLines((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-3xl">
      <Text className="text-[black] font-bold text-lg">Health Trend</Text>
      <div className="flex flex-wrap gap-4 py-4">
        {healthMetrics.map((metric) => (
          <CustomCheckbox
            key={metric.key}
            checked={visibleLines[metric.key]}
            onChange={() => handleCheckboxChange(metric.key)}
            color={metric.color}
            label={metric.label}
          />
        ))}
      </div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: -25, right: 10, top: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666" }} />
            <Tooltip content={<CustomTooltip />} />
            {healthMetrics.map(
              (metric) =>
                visibleLines[metric.key] && (
                  <Line
                    key={metric.key}
                    type="monotone"
                    dataKey={metric.key}
                    name={metric.label}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={false}
                  />
                )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HealthTrendLine;
