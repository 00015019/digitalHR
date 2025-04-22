import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import EmployeeCard from "./EmployeeCard";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteEmployee from "./DeleteEmployee";
import { Button, Select } from "antd";
import request from "../../components/config";

const { Option } = Select;

function EmployeeList() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const handleEmployeeDeletion = (id) => {
    setData((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };
  const getData = async () => {
    try {
      const res = await request.get(`/user/user/list/`);
      setData(res?.data.splice(1, 4));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredEmployees = selectedDepartment
    ? data.filter((emp) => emp.department === selectedDepartment)
    : data;

  return (
    <div>
      <div className="md:h-20 flex gap-4 md:items-center items-start flex-col md:flex-row justify-between mb-[30px]">
        <h1 className="text-[22px] md:text-3xl font-bold text-textColor">
          Employee List
        </h1>

        <button
          type="button"
          onClick={() => navigate("/employees/add")}
          className="flex items-center shadow-lg shadow-primary/15 gap-2 h-10 md:h-12 px-4 font-semibold text-white bg-primary rounded-[14px] hover:bg-primary/85 duration-200"
        >
          <FaPlus size={18} />
          <span className="text-[14px] md:text-[16px]">Employee add</span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
        <Select
          placeholder="Filter by Department"
          onChange={(value) => setSelectedDepartment(value)}
          style={{ width: 200 }}
          allowClear
        >
          <Option value="IT">IT</Option>
          <Option value="HR">HR</Option>
          <Option value="Finance">Finance</Option>
        </Select>
      </div>
      <div>
        {filteredEmployees.map((emp, index) => (
          <EmployeeCard
            key={index}
            data={emp}
            handleDeleteCallback={handleEmployeeDeletion}
          />
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
