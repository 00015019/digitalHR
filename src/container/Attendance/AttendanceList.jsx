import React, { useState } from "react";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

const AttendanceList = () => {
  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("All");

  const employees = [
    {
      image: "./img/profilePic.jpg",
      fullName: "Ali Vohidov",
      department: "IT",
      phone: "+998 90 123 45 67",
      status: "Present",
    },
    {
      image: "/img/profileGirl1.jpeg",
      fullName: "Sara Karimova",
      department: "HR",
      phone: "+998 97 234 56 78",
      status: "Present",
    },
    {
      image: "/img/profileBoy1.jpeg",
      fullName: "Rustam Otabekov",
      department: "Finance",
      phone: "+998 93 345 67 89",
      status: "Present",
    },
    {
      image: "/img/profileGirl2.jpeg",
      fullName: "Nilufar Islomova",
      department: "Marketing",
      phone: "+998 99 456 78 90",
      status: "Present",
    },
    {
      image: "/img/profileBoy3.jpeg",
      fullName: "Javohir Saidov",
      department: "Sales",
      phone: "+998 91 567 89 01",
      status: "Present",
    },
    {
      image: "/img/ProfileGirl3.jpeg",
      fullName: "Kamila Nasriddinova",
      department: "IT",
      phone: "+998 90 678 90 12",
      status: "Present",
    },
    {
      image: "/img/profileBoy2.jpeg",
      fullName: "Shoxrux Murodov",
      department: "Operations",
      phone: "+998 95 789 01 23",
      status: "Present",
    },
    {
      image: "/img/profileGirl1.jpeg",
      fullName: "Madina Tursunova",
      department: "HR",
      phone: "+998 94 890 12 34",
      status: "Absent",
    },
    {
      image: "/img/profilePic.jpg",
      fullName: "Bekzod Tohirov",
      department: "Finance",
      phone: "+998 98 901 23 45",
      status: "Absent",
    },
    {
      image: "/img/profileBoy1.jpeg",
      fullName: "Dilshod Rakhimov",
      department: "Sales",
      phone: "+998 93 012 34 56",
      status: "Absent",
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      (department === "All" || emp.department === department) &&
      emp.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="">
      <div className="md:h-20 flex gap-4 md:items-center items-start flex-col md:flex-row justify-between mb-[30px]">
        <h1 className="text-[22px] md:text-3xl font-bold text-textColor">
          Attendance
        </h1>
      </div>
      <div className="flex gap-4 mb-6">
        <Search
          placeholder="Search employee"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          className="w-1/3"
        />
        <Select value={department} onChange={setDepartment} className="w-1/4">
          <Option value="All">All Departments</Option>
          <Option value="IT">IT</Option>
          <Option value="HR">HR</Option>
          <Option value="Finance">Finance</Option>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="bg-green-600 rounded-xl p-2 mb-4">
            <h2 className="text-xl font-semibold text-white text-center">
              Present Employees
            </h2>
          </div>
          {filteredEmployees
            .filter((emp) => emp.status === "Present")
            .map((emp) => (
              <div className="bg-white flex flex-row items-center justify-between mb-4 p-[16px] rounded-[16px]">
                <div>
                  <img
                    src={emp.image}
                    alt="profilePic"
                    className="rounded-full h-12 w-12 mr-4 "
                  />
                </div>
                <div className="flex flex-col items-start w-[150px] ">
                  <p className="text-[14px] font-semibold text-gray-500">
                    Full Name
                  </p>
                  <h1 className="line-clamp-1">{emp.fullName}</h1>
                </div>

                <div className="flex flex-col items-start w-[150px]">
                  <p className="text-[14px] font-semibold text-gray-500">
                    Department
                  </p>
                  <h1>{emp.department}</h1>
                </div>
                <div className="flex flex-col items-start w-[150px]">
                  <p className="text-[14px] font-semibold text-gray-500">
                    Phone Number
                  </p>
                  <h1>{emp.phone}</h1>
                </div>
              </div>
            ))}
        </div>
        <div>
          <div className="bg-red-600 rounded-xl p-2 mb-4">
            <h2 className="text-xl font-semibold text-center text-white">
              Absent Employees
            </h2>
          </div>
          {filteredEmployees
            .filter((emp) => emp.status === "Absent")
            .map((emp) => (
              <div className="bg-white flex flex-row items-center justify-between mb-4 p-[16px] rounded-[16px]">
                <div>
                  <img
                    src={emp.image}
                    alt="profilePic"
                    className="rounded-full h-12 w-12 mr-4"
                  />
                </div>
                <div className="flex flex-col items-start w-[150px] ">
                  <p className="text-[14px] font-semibold text-gray-500">
                    Full Name
                  </p>
                  <h1 className="line-clamp-1">{emp.fullName}</h1>
                </div>

                <div className="flex flex-col items-start w-[150px]">
                  <p className="text-[14px] font-semibold text-gray-500">
                    Department
                  </p>
                  <h1>{emp.department}</h1>
                </div>
                <div className="flex flex-col items-start w-[150px]">
                  <p className="text-[14px] font-semibold text-gray-500">
                    Phone number
                  </p>
                  <h1>{emp.phone}</h1>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
