import React, { useState } from "react";
import { Input, Select, Button, Table, Tag } from "antd";

const { Search } = Input;
const { Option } = Select;

function SalaryPayments() {
  const [filter, setFilter] = useState({
    search: "",
    department: "",
    status: "",
  });
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      department: "IT",
      salary: "$3000",
      status: "Unpaid",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Bob Smith",
      department: "HR",
      salary: "$2800",
      status: "Paid",
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Charlie Brown",
      department: "Finance",
      salary: "$3500",
      status: "Unpaid",
      phone: "456-789-0123",
    },
    {
      id: 4,
      name: "Diana Prince",
      department: "IT",
      salary: "$3200",
      status: "Paid",
      phone: "654-321-0987",
    },
  ]);

  const handleMarkAsPaid = (id) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: "Paid" } : emp))
    );
  };

  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(filter.search.toLowerCase()) &&
      (filter.department ? emp.department === filter.department : true) &&
      (filter.status ? emp.status === filter.status : true)
    );
  });

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Salary", dataIndex: "salary", key: "salary" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        record.status === "Unpaid" ? (
          <Button type="primary" onClick={() => handleMarkAsPaid(record.id)}>
            Mark as Paid
          </Button>
        ) : (
          <Tag color="blue">Paid</Tag>
        ),
    },
  ];

  return (
    <div className="">
      <div className="md:h-20 flex gap-4 md:items-center items-start flex-col md:flex-row justify-between mb-[30px]">
        <h1 className="text-[22px] md:text-3xl font-bold text-textColor">
          Payments
        </h1>
      </div>

      <div className="flex gap-4 mb-4">
        <Search
          placeholder="Search Employee"
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="w-1/3"
          size="large"
        />
        <Select
          placeholder="Filter by Department"
          onChange={(value) => setFilter({ ...filter, department: value })}
          allowClear
          className="w-1/4"
          size="large"
        >
          <Option value="IT">IT</Option>
          <Option value="HR">HR</Option>
          <Option value="Finance">Finance</Option>
        </Select>
        <Select
          placeholder="Filter by Status"
          onChange={(value) => setFilter({ ...filter, status: value })}
          allowClear
          className="w-1/4"
          size="large"
        >
          <Option value="Paid">Paid</Option>
          <Option value="Unpaid">Unpaid</Option>
        </Select>
      </div>

      <Table dataSource={filteredEmployees} columns={columns} rowKey="id" />
    </div>
  );
}

export default SalaryPayments;
