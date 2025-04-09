import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { CgFileDocument, CgProfile } from "react-icons/cg";
import LogOutModal from "./ui/LogOutModal";
import request from "../components/config/index";
import { RiShoppingBasketLine } from "react-icons/ri";

import {
  Logo,
  DashboardIcon,
  EmployeesIcon,
  FoodIcon,
  ProductsIcon,
  PaymentIcon,
  PaymentHistoryIcon,
  MinLogo,
} from "../components/assets/icons/icon";
import SearchIcon from "../components/assets/icons/Search.svg";

import { Drawer, Dropdown, Empty } from "antd";
import { LuCalendarClock } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineNotification } from "react-icons/ai";
import { HiClipboardDocument } from "react-icons/hi2";

function Layout() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [openSupport, setOpenSupport] = useState(false);
  const searchInputRef = useRef(null);
  const [searchData, setSearchData] = useState({
    employees: [],
    foods: [],
    products: [],
  });
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (openSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [openSearch]);

  useEffect(() => {
    setSearchValue("");
    setSearchData({
      employees: [],
      foods: [],
      products: [],
    });
  }, [openSearch]);

  const getSearchData = async (event) => {
    if (event.target.value != "") {
      setOpenDropdown(true);
    } else {
      setOpenDropdown(false);
    }
    const payload = {
      query: event.target.value,
    };
    try {
      const res = await request.post("/crm/search/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSearchData({
        employees: res.data.employees,
        foods: res.data.foods,
        products: res.data.products,
      });
    } catch (e) {
      console.error("Error fetching search data:", e);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await request.get("/accounts/user/profile/");
      setUserInfo(res.data);
    } catch (e) {
      console.error("Error fetching user info:", e);
      return null;
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const employeeList = searchData.employees.filter(
    (item) => item.type !== "admin"
  );

  const DropdownItms = [
    {
      key: "1",
      label: (
        <button className="flex items-center gap-2">
          <CgProfile size={20} />
          <span className="text-lg">Information</span>
        </button>
      ),
      onClick: () => navigate("/profile"),
    },
    {
      key: "2",
      label: (
        <button className="flex items-center gap-2">
          <MdLogout size={20} />
          <span className="text-lg">LogOut</span>
        </button>
      ),
      danger: true,
      onClick: () => setOpenModal(true),
    },
  ];

  const menu = { items: DropdownItms };

  return (
    <>
      <LogOutModal open={openModal} close={() => setOpenModal(false)} />
      <div className="w-[100%] min-h-[100vh] lg:h-[100vh] flex bg-[#F7F9FE]">
        {/* Aside */}
        <div
          id="aside"
          className="h-full hidden lg:block bg-[#fff] min-w-[306px] overflow-auto shadow-[5px_0_30px] shadow-primary/5"
          style={{
            overflow: "hidden",
            overflowY: "scroll",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <div className="mb-[42px] flex pt-6">
            <Link to={"/"} className="font-semibold text-[35px] ml-[35px]">
              <h1 className="text-primary text-[30px] font-bold">DigitalHR</h1>
            </Link>
          </div>
          <div className="px-[35px] flex flex-col gap-2 mb-[100px]">
            <Link to={"/"}>
              <button
                type="button"
                className={`menu-button flex rounded-[9px] items-center gap-[12px] w-full h-[48px] px-3.5 duration-150 ${
                  pathname === "/"
                    ? "bg-primary text-white"
                    : "hover:bg-[#002b4810] text-[#3B424A]"
                }`}
              >
                <span className="menu-button-icon duration-150">
                  <DashboardIcon
                    color={pathname === "/" ? "#fff" : "#3B424A"}
                  />
                </span>
                <span className="font-medium text-[16px]">Dashboard</span>
              </button>
            </Link>

            <Link to={"/employees"}>
              <button
                type="button"
                className={`menu-button flex rounded-[9px] items-center gap-[12px] w-full h-[48px] px-3.5 duration-150 ${
                  pathname.slice(0, 10) === "/employees"
                    ? "bg-primary text-white"
                    : "hover:bg-[#002b4810] text-[#3B424A]"
                }`}
              >
                <span className="menu-button-icon duration-150">
                  <EmployeesIcon
                    color={
                      pathname.slice(0, 10) === "/employees"
                        ? "#fff"
                        : "#3B424A"
                    }
                  />
                </span>
                <span className="font-medium text-[16px]">Employees</span>
              </button>
            </Link>

            <Link to={"/attendance"}>
              <button
                type="button"
                className={`menu-button flex rounded-[9px] items-center gap-[12px] w-full h-[48px] px-3.5 duration-150 ${
                  pathname === "/attendance"
                    ? "bg-primary text-white"
                    : "hover:bg-[#002b4810] text-[#3B424A]"
                }`}
              >
                <span className="menu-button-icon duration-150">
                  <LuCalendarClock
                    size={24}
                    color={pathname === "/attendance" ? "#fff" : "#3B424A"}
                  />
                </span>
                <span className="font-medium text-[16px]">Attendance</span>
              </button>
            </Link>

            <Link to={"/vacancies"}>
              <button
                type="button"
                className={`menu-button flex rounded-[9px] items-center gap-[12px] w-full h-[48px] px-3.5 duration-150 ${
                  pathname === "/vacancies"
                    ? "bg-primary text-white"
                    : "hover:bg-[#002b4810] text-[#3B424A]"
                }`}
              >
                <span className="menu-button-icon duration-150">
                  <AiOutlineNotification
                    size={25}
                    color={pathname === "/vacancies" ? "#fff" : "#3B424A"}
                  />
                </span>
                <span className="font-medium text-[16px]">Vacancies</span>
              </button>
            </Link>
            <Link to={"/application"}>
              <button
                type="button"
                className={`menu-button flex rounded-[9px] items-center gap-[12px] w-full h-[48px] px-3.5 duration-150 ${
                  pathname === "/application"
                    ? "bg-primary text-white"
                    : "hover:bg-[#002b4810] text-[#3B424A]"
                }`}
              >
                <span className="menu-button-icon duration-150">
                  <CgFileDocument
                    size={25}
                    color={pathname === "/application" ? "#fff" : "#3B424A"}
                  />
                </span>
                <span className="font-medium text-[16px]">Applications</span>
              </button>
            </Link>

            <Link to={"/payments"}>
              <button
                type="button"
                className={`menu-button flex rounded-[9px] items-center gap-[12px] w-full h-[48px] px-3.5 duration-150 ${
                  pathname === "/payments"
                    ? "bg-primary text-white"
                    : "hover:bg-[#002b4810] text-[#3B424A]"
                }`}
              >
                <span className="menu-button-icon duration-150">
                  <PaymentIcon
                    color={pathname === "/payments" ? "#fff" : "#3B424A"}
                  />
                </span>
                <span className="font-medium text-[16px]">Payments</span>
              </button>
            </Link>
            <Link to={"/leave-request"}>
              <button
                type="button"
                className={`menu-button flex rounded-[9px] items-center gap-[12px] w-full h-[48px] px-3.5 duration-150 ${
                  pathname === "/leave-request"
                    ? "bg-primary text-white"
                    : "hover:bg-[#002b4810] text-[#3B424A]"
                }`}
              >
                <span className="menu-button-icon duration-150">
                  <HiClipboardDocument
                    size={28}
                    color={pathname === "/leave-request" ? "#fff" : "#3B424A"}
                  />
                </span>
                <span className="font-medium text-[16px]">Leave request</span>
              </button>
            </Link>
          </div>
          <div className="flex items-center justify-center w-full">
           
          </div>
        </div>

        <div className="flex flex-col w-full">
          {/* Header */}
          <div
            id="header"
            className="min-h-[80px] hidden bg-[#fff] w-full border-b-2 border-b-[#EEF0F4] lg:flex items-center pl-[30px] pr-10 justify-between"
          >
            <div className="relative">
              <input
                className="w-[372px] h-11 pl-11 pr-4 bg-[#F5F5FA] outline-none font-medium rounded-lg text-textColor"
                placeholder="search"
                type="text"
                onChange={(e) => {
                  getSearchData(e);
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              />
              <img
                className="absolute top-[10px] left-[10px]"
                src={SearchIcon}
                alt="search icon"
              />
              <div
                className={`absolute bg-white shadow-lg overflow-y-auto w-[370px] max-h-[300px] px-2 py-3 rounded-lg flex flex-col gap-1 z-40 ${
                  openDropdown ? "" : "hidden"
                }`}
              >
                {employeeList?.length ||
                searchData.products.length ||
                searchData.foods.length ? (
                  <div className="w-full">
                    {employeeList?.map((item) => (
                      <button
                        onClick={() => {
                          navigate("/employees", { state: item }),
                            setOpenDropdown(false),
                            setSearchValue("");
                        }}
                        key={item.id}
                        className={`flex w-full items-start hover:bg-black/5 duration-200 rounded-lg p-2 ${
                          item.type == "admin" && "hidden"
                        }`}
                      >
                        <span>
                          {item.first_name} {item.last_name}
                        </span>
                      </button>
                    ))}
                    {searchData.products?.map((item) => (
                      <button
                        onClick={() => {
                          navigate("/products", { state: item }),
                            setOpenDropdown(false),
                            setSearchValue("");
                        }}
                        key={item.id}
                        className="flex w-full items-start hover:bg-black/5 duration-200 rounded-lg p-2"
                      >
                        {item.name_uz}
                      </button>
                    ))}
                    {searchData.foods?.map((item) => (
                      <button
                        onClick={() => {
                          navigate("/food", { state: item }),
                            setOpenDropdown(false),
                            setSearchValue("");
                        }}
                        key={item.id}
                        className="flex w-full items-start hover:bg-black/5 duration-200 rounded-lg p-2"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3">
                    <Empty description="empty" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-[18px]">
              <div className="flex items-center gap-3">
               
              </div>
             
              <div>
                <svg
                  width="1"
                  height="52"
                  viewBox="0 0 1 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.00146484"
                    y="0.000366211"
                    width="1"
                    height="52"
                    rx="0.5"
                    fill="#E2E8F0"
                  />
                </svg>
              </div>
              <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
                <button type="button" className="flex items-center gap-3">
                  <button className="w-11 h-11 rounded-full flex items-center justify-center bg-[#EEF0F4] shadow-[0_2px_5px_silver]">
                    {userInfo?.profile_image ? (
                      <img
                        src={
                          userInfo?.profile_image.slice(0, 4) == "http"
                            ? userInfo?.profile_image
                            : `${userInfo?.profile_image}`
                        }
                        alt="profile image"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <FaRegUser color="#64748B" size={22} />
                    )}
                  </button>
                  <p className="text-[#40444D] text-lg font-medium">
                    {userInfo.first_name} {userInfo.last_name}
                  </p>
                </button>
              </Dropdown>
            </div>
          </div>
          {/* Mobile Header */}
          <div className="w-full sticky top-0 px-[10px] pt-[10px] mb-6 lg:hidden z-[1000]">
           
          </div>
          {/* Content */}
          <main className="w-full px-5 md:px-10 pb-14 lg:overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
