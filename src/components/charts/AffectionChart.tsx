import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface AffectionChartProps {
  data: ChartData[];
}

const AffectionChart: React.FC<AffectionChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Affection Levels</h2>
      <div className="h-[300px]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AffectionChart;
