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

import SupportImage from "../components/assets/icons/support-image.svg";
import SupportButton from "../components/assets/icons/support-button.svg";
import SearchIcon from "../components/assets/icons/Search.svg";
import NotificationIcon from "../components/assets/icons/notification.svg";
import { Drawer, Dropdown, Empty } from "antd";
import { LuCalendarClock } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineNotification } from "react-icons/ai";
import { HiClipboardDocument } from "react-icons/hi2";
// import SupportModal from "./ui/SupportModal";

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
            {/* <div className="relative w-[168px] h-[168px] bg-[#01A1B7]/10 rounded-[24px] px-[20px] py-[26px] flex items-end">
              <img
                className="absolute left-[18px] bottom-[90px]"
                src={SupportImage}
                alt="support image"
              />
              <Link to={"https://t.me/repidsupportbot"} target="_blank">
                <button
                  type="button"
                  className="bg-primary hover:bg-primary/85 duration-150 w-full rounded-[14px] px-4 h-[48px] flex items-center justify-between"
                >
                  <img src={SupportButton} alt="sms icon" />
                  <span className="font-semibold text-white">Support</span>
                </button>
              </Link>
            </div> */}
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
                {/* <button
                  type="button"
                  className={`text-lg font-medium duration-150 ${
                    i18n?.language === "uz" ? "text-textColor" : "text-gray-400"
                  }`}
                  onClick={() => changeLanguage("uz")}
                >
                  Uz
                </button>
                <button
                  type="button"
                  className={`text-lg font-medium duration-150 ${
                    i18n?.language === "ru" ? "text-textColor" : "text-gray-400"
                  }`}
                  onClick={() => changeLanguage("ru")}
                >
                  Ру
                </button> */}
              </div>
              {/* <button
                type="button"
                className="w-11 h-11 relative rounded-full bg-[#F1F5F9] flex items-center justify-center"
              >
                <img src={NotificationIcon} alt="notification icon" />
                <div className="absolute top-3 right-3 w-[6px] h-[6px] bg-[#F43F5E] rounded-full" />
              </button> */}
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
                            : `https://api.repid.uz${userInfo?.profile_image}`
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
            {/* <div
              className={`h-[70px] flex items-center justify-between duration-200 bg-white rounded-[24px] p-[15px] ${
                isScrolled && "shadow-[0_3px_15px_#00000038]"
              }`}
            >
              <Link to="/">
                <MinLogo />
              </Link>
              <div className="flex items-center gap-6">
                <button onClick={() => setOpenSearch(true)}>
                  <img src={SearchIcon} alt="search icon" />
                </button>
                <button onClick={() => setOpenDrawer(true)}>
                  <RiMenu3Fill color="#64748B" size={24} />
                </button>
              </div>
              <Drawer
                title={
                  <div className="flex items-center justify-between pt-3">
                    <div className="w-[280px] relative">
                      <div className="absolute top-0 left-0 w-[24px] h-[24px] bg-[#F1F5F9] rounded-full flex items-center justify-center">
                        <img src={SearchIcon} alt="search icon" />
                      </div>
                      <input
                        type="text"
                        placeholder="Qidiruv..."
                        className="w-full outline-none pl-10"
                        ref={searchInputRef}
                        onChange={(e) => {
                          getSearchData(e);
                          setSearchValue(e.target.value);
                        }}
                        value={searchValue}
                      />
                    </div>
                    <button onClick={() => setOpenSearch(false)}>
                      <IoMdClose color="#64748B" size={26} />
                    </button>
                  </div>
                }
                closeIcon={false}
                onClose={() => setOpenSearch(false)}
                open={openSearch}
                width={1024}
              >
                <div className={`w-full ${searchValue == "" && "hidden"}`}>
                  {employeeList?.map((item) => (
                    <button
                      onClick={() => {
                        navigate("/employees", { state: item }),
                          setSearchValue("");
                        setOpenSearch(false);
                        setSearchValue("");
                      }}
                      key={item.id}
                      className={`flex w-full items-start active:bg-black/5 duration-200 rounded-lg p-2 ${
                        item.type == "admin" && "hidden"
                      }`}
                    >
                      <span className="text-textColor font-medium text-lg">
                        {item.first_name} {item.last_name}
                      </span>
                    </button>
                  ))}
                  {searchData.products?.map((item) => (
                    <button
                      onClick={() => {
                        navigate("/products", { state: item }),
                          setOpenDropdown(false),
                          setOpenSearch(false);
                        setSearchValue("");
                      }}
                      key={item.id}
                      className="flex w-full items-start active::bg-black/5 duration-200 rounded-lg p-2 text-textColor font-medium text-lg"
                    >
                      {item.name_uz}
                    </button>
                  ))}
                  {searchData.foods?.map((item) => (
                    <button
                      onClick={() => {
                        navigate("/food", { state: item }),
                          setOpenDropdown(false);
                        setOpenSearch(false);
                        setSearchValue("");
                      }}
                      key={item.id}
                      className="flex w-full items-start active:bg-black/5 duration-200 rounded-lg p-2 text-textColor font-medium text-lg"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </Drawer>
              <Drawer
                title={
                  <div className="flex items-center justify-between pt-[9px]">
                    <div>
                      <Link onClick={() => setOpenDrawer(false)} to="/">
                        <MinLogo />
                      </Link>
                    </div>
                    <button onClick={() => setOpenDrawer(false)}>
                      <IoMdClose color="#64748B" size={26} />
                    </button>
                  </div>
                }
                closeIcon={false}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                width={600}
              >
                <div className="flex items-center gap-6 justify-center mb-8">
                  {/* <button>
                    <img src={NotificationIcon} alt="notification icon" />
                  </button> */}
            {/* <button
                    onClick={() => {
                      navigate("/profile");
                      setOpenDrawer(false);
                    }}
                    className="w-11 h-11 rounded-full flex items-center justify-center bg-[#EEF0F4] shadow-[0_2px_5px_silver]"
                  >
                    {userInfo?.profile_image ? (
                      <img
                        src={
                          userInfo?.profile_image.slice(0, 4) == "http"
                            ? userInfo?.profile_image
                            : `https://api.repid.uz${userInfo?.profile_image}`
                        }
                        alt="profile image"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <FaRegUser color="#64748B" size={22} />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-center flex-col gap-5">
                  <Link to="/">
                    <button
                      onClick={() => setOpenDrawer(false)}
                      className={`flex w-full text-lg items-center gap-3 font-medium duration-200 ${
                        pathname == "/" ? "text-primary" : "text-textColor"
                      }`}
                    >
                      {t("dashboard")}
                    </button>
                  </Link>
                  <Link to="/employees">
                    <button
                      onClick={() => setOpenDrawer(false)}
                      className={`flex w-full text-lg items-center gap-3 font-medium duration-200 ${
                        pathname.slice(0, 10) === "/employees"
                          ? "text-primary"
                          : "text-textColor"
                      }`}
                    >
                      {t("employees")}
                    </button>
                  </Link>
                  <Link to="/food">
                    <button
                      onClick={() => setOpenDrawer(false)}
                      className={`flex w-full text-lg items-center gap-3 font-medium duration-200 ${
                        pathname == "/food" ? "text-primary" : "text-textColor"
                      }`}
                    >
                      {t("foods")}
                    </button>
                  </Link>
                  <Link to="/products">
                    <button
                      onClick={() => setOpenDrawer(false)}
                      className={`flex w-full text-lg items-center gap-3 font-medium duration-200 ${
                        pathname == "/products"
                          ? "text-primary"
                          : "text-textColor"
                      }`}
                    >
                      {t("products")}
                    </button>
                  </Link>
                  <Link to="/orders">
                    <button
                      onClick={() => setOpenDrawer(false)}
                      className={`flex w-full text-lg items-center gap-3 font-medium duration-200 ${
                        pathname == "/orders"
                          ? "text-primary"
                          : "text-textColor"
                      }`}
                    >
                      {t("orders")}
                    </button>
                  </Link>
                  <Link to="/payments">
                    <button
                      onClick={() => setOpenDrawer(false)}
                      className={`flex w-full text-lg items-center gap-3 font-medium duration-200 ${
                        pathname == "/payments"
                          ? "text-primary"
                          : "text-textColor"
                      }`}
                    >
                      {t("payments")}
                    </button>
                  </Link>
                  <Link to="/payments-history">
                    <button
                      onClick={() => setOpenDrawer(false)}
                      className={`flex w-full text-lg items-center gap-3 font-medium duration-200 ${
                        pathname == "/payments-history"
                          ? "text-primary"
                          : "text-textColor"
                      }`}
                    >
                      {t("payments_history")}
                    </button>
                  </Link>
                </div>
                <div className="flex gap-4 justify-center mt-10">
                  <button
                    type="button"
                    className={`text-xl font-medium duration-150 ${
                      i18n?.language === "uz"
                        ? "text-textColor"
                        : "text-gray-400"
                    }`}
                    onClick={() => changeLanguage("uz")}
                  >
                    Uz
                  </button>
                  <button
                    type="button"
                    className={`text-xl font-medium duration-150 ${
                      i18n?.language === "ru"
                        ? "text-textColor"
                        : "text-gray-400"
                    }`}
                    onClick={() => changeLanguage("ru")}
                  >
                    Ру
                  </button>
                </div>
              </Drawer>
            </div> */}
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
