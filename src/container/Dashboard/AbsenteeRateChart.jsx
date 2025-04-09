import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const absenteeData = [
  { date: "Mar 1", absenteeRate: 5 },
  { date: "Mar 2", absenteeRate: 8 },
  { date: "Mar 3", absenteeRate: 6 },
  { date: "Mar 4", absenteeRate: 10 },
  { date: "Mar 5", absenteeRate: 7 },
  { date: "Mar 6", absenteeRate: 12 },
  { date: "Mar 7", absenteeRate: 9 },
];

const AbsenteeRateChart = () => {
  return (
    <div className="bg-white p-10 rounded-lg shadow-xl mt-6 ">
      <h2 className="text-xl font-semibold mb-4">Absentee Rate</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={absenteeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="absenteeRate"
            stroke="#8884d8"
            strokeWidth={6}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AbsenteeRateChart;
