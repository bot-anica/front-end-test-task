import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { COLORS } from "../../constants";

interface ChartData {
  name: string;
  value: number;
}

interface IndoorOutdoorChartProps {
  data: ChartData[];
}

const IndoorOutdoorChart: React.FC<IndoorOutdoorChartProps> = ({
  data,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        Indoor vs Outdoor Preference
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IndoorOutdoorChart;
