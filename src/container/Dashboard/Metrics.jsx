import React from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

function Metrics() {
  const data = [
    {
      id: 1,
      icon: "/img/emp3.jpg",
      stat: 120,
      name: "Total Employees",
      up: true,
      persentage: 10,
    },
    {
      id: 2,
      icon: "/img/leave.png",
      stat: 5,
      name: "On leave today",
      up: true,
      persentage: 20,
    },
    {
      id: 3,
      icon: "/img/newHires.png",
      stat: 8,
      name: "New hires",
      up: false,
      persentage: 9,
    },
    {
      id: 4,
      icon: "/img/jobOpening.png",
      stat: 3,
      name: "Job openings",
      up: false,
      persentage: 20,
    },
    {
      id: 5,
      icon: "/img/pendingapp.png",
      stat: 12,
      name: "Pending application",
      up: true,
      persentage: 10,
    },
  ];

  return (
    <div className="">
      <div className="hidden lg:inline-block bg-white h-auto py-6 rounded-[8px] text-black  shadow-lg  w-full">
        <div className="flex flex-row items-center">
          {data.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-row gap-4 items-start px-[25px] border-r-2 border-[#F2F4F6] min-w-[215px]"
            >
              <img src={stat.icon} alt="icon" className="w-[40px] h-[40px]" />
              <div className="flex flex-col">
                <h1 className="text-[14px] font-normal text-[#8491A5]">
                  {stat.name}
                </h1>
                <p className="text-[28px] font-semibold text-[#09244B]">
                  {stat.stat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </p>
                <div className="flex flex-row gap-2 items-center">
                  {stat.up ? (
                    <BiSolidUpArrow color="green" />
                  ) : (
                    <BiSolidDownArrow color="red" />
                  )}
                  <p
                    className={`${
                      stat.up ? "text-green-500" : "text-red-500"
                    } text-[14px] font-normal`}
                  >
                    {stat.persentage}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Metrics;
