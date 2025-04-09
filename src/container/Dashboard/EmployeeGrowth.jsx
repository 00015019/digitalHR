import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const EmployeeGrowth = () => {
  const employeeGrowthData = [
    { month: "Jan", employees: 10 },
    { month: "Feb", employees: 15 },
    { month: "Mar", employees: 20 },
    { month: "Apr", employees: 25 },
    { month: "May", employees: 30 },
    { month: "Jun", employees: 40 },
  ];

  const departmentData = [
    { name: "Engineering", value: 40 },
    { name: "Marketing", value: 25 },
    { name: "HR", value: 15 },
    { name: "Sales", value: 20 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mt-6">
      <div className="p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Employee Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={employeeGrowthData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="employees"
              fill="#4CAF50"
              barSize={40}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">
          Department-wise Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={departmentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {departmentData.map((entry, index) => (
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

export default EmployeeGrowth;
