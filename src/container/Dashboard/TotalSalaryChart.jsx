import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Paid", value: 85000 },
  { name: "Unpaid", value: 25000 },
];

const COLORS = ["#4CAF50", "#FF5252"]; // Green for Paid, Red for Unpaid

const TotalSalaryChart = () => {
  const totalSalary = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <>
      <div className="bg-white p-10 rounded-lg shadow-lg mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Total Salary Paid & Unpaid
          </h2>
        </div>
        <div className="flex flex-row items-center  text-center mt-6">
          <div className="relative w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={0}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
              ${totalSalary.toLocaleString()}
            </div>
          </div>
          <div className="w-3/5 pl-6 flex flex-col justify-center">
            <h3 className="text-md font-semibold mb-3">Salary Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Total Employees Paid:</span>
                <span className="font-semibold">
                  {(data[0].value / 1000).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Total Employees Unpaid:</span>
                <span className="font-semibold">
                  {(data[1].value / 1000).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Average Salary Paid:</span>
                <span className="font-semibold">
                  ${(data[0].value / 20).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Outstanding Payments:</span>
                <span className="font-semibold text-red-500">
                  ${data[1].value.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalSalaryChart;
