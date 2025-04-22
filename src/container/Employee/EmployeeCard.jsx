import React, { useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { MdMoreVert } from "react-icons/md";
import { Dropdown } from "antd";
import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DeleteEmployee from "./DeleteEmployee";
function EmployeeCard({ data, handleDeleteCallback }) {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const DropdownItems = [
    {
      key: "1",
      label: (
        <button
          onClick={() => navigate(`/user/user/${data.id}`)}
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
          onClick={() => navigate(`/user/user/${data.id}/update`)}
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
          onClick={() => setIsOpenModal(true)}
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
    <>
      <DeleteEmployee
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        id={data.id}
        onDeleteCallback={handleDeleteCallback}
      />
      <div className="bg-white flex flex-row items-center justify-between mb-4 p-[16px] rounded-[16px]">
        <div>
          <img
            src={data.profile_image}
            alt="profilePic"
            className="rounded-full h-12 w-12"
          />
        </div>
        <div className="flex flex-col items-start w-[150px] ">
          <p className="text-[14px] font-semibold text-gray-500">Full Name</p>
          <h1 className="line-clamp-1">
            {data.last_name} {data.first_name}
          </h1>
        </div>
        <div className="flex flex-col items-start w-[150px]">
          <p className="text-[14px] font-semibold text-gray-500">Job title</p>
          <h1>{data.job_title}</h1>
        </div>

        <div className="flex flex-col items-start w-[150px]">
          <p className="text-[14px] font-semibold text-gray-500">Contact</p>
          <h1>{data.contact}</h1>
        </div>
        <div className="flex flex-col items-start w-[150px]">
          <p className="text-[14px] font-semibold text-gray-500">Joined</p>
          <h1>{data.joined_date}</h1>
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
    </>
  );
}

export default EmployeeCard;
