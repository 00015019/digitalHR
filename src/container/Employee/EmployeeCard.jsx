import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { MdMoreVert } from "react-icons/md";
import { Dropdown } from "antd";
import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function EmployeeCard({ data, handleOpenDeleteModal }) {
  const navigate = useNavigate();

  const DropdownItems = [
    {
      key: "1",
      label: (
        <button
          onClick={() => navigate("/employees/details")}
          className="flex items-center gap-3"
        >
          <IoInformationCircleSharp size={20} />
          <span className="text-[18px]">Details</span>
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => navigate("/employees/add", {})}
          className="flex items-center text-textColor gap-3"
        >
          <BiEditAlt size={20} />
          <span className="text-[18px]">Edit</span>
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          onClick={() => handleOpenDeleteModal()}
          className="flex items-center gap-3"
        >
          <FaRegTrashAlt size={16} />
          <span className="text-[18px]">Delete</span>
        </button>
      ),
      danger: true,
    },
  ];

  const menu = { items: DropdownItems };

  return (
    <div className="bg-white flex flex-row items-center justify-between mb-4 p-[16px] rounded-[16px]">
      <div>
        <img
          src={data.image}
          alt="profilePic"
          className="rounded-full h-12 w-12"
        />
      </div>
      <div className="flex flex-col items-start w-[150px] ">
        <p className="text-[14px] font-semibold text-gray-500">Full Name</p>
        <h1 className="line-clamp-1">{data.fullName}</h1>
      </div>
      <div className="flex flex-col items-start w-[150px]">
        <p className="text-[14px] font-semibold text-gray-500">Job title</p>
        <h1>{data.jobTitle}</h1>
      </div>
      <div className="flex flex-col items-start w-[150px]">
        <p className="text-[14px] font-semibold text-gray-500">Department</p>
        <h1>{data.department}</h1>
      </div>
      <div className="flex flex-col items-start w-[150px]">
        <p className="text-[14px] font-semibold text-gray-500">Id</p>
        <h1>{data.empId}</h1>
      </div>
      <div className="flex flex-col items-start w-[150px]">
        <p className="text-[14px] font-semibold text-gray-500">Joined</p>
        <h1>{data.joined}</h1>
      </div>
      <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
        <button
          type="button"
          className="w-11 h-11 hidden md:flex items-center text-textColor justify-center rounded-[14px] bg-primary/20"
        >
          <MdMoreVert size={24} />
        </button>
      </Dropdown>
    </div>
  );
}

export default EmployeeCard;
