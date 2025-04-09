"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import Request from "../src/components/config/index";
import { useNotification } from "../src/components/ui/Notification";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUserNameDirty, setIsUserNameDirty] = useState(false);
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  const { openNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    setUserNameError("");
    setPasswordError("");

    setIsUserNameDirty(true);
    setIsPasswordDirty(true);

    if (!email) {
      setUserNameError("login_name_error");
      hasError = true;
    }

    if (!password) {
      setPasswordError("login_password_error");
      hasError = true;
    } else if (password.length < 5) {
      setPasswordError("Parol kamida 5 ta belgidan iborat bo'lishi kerak");
      hasError = true;
    }

    if (hasError) return;

    const newData = {
      email: email,
      password: password,
    };

    setButtonLoading(true);
    try {
      const res = await Request.post("/user/login/", newData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      Cookies.set("access_token", res?.data?.access);
      navigate("/");
    } catch (err) {
      openNotification("error", "errorMsg");
      console.error(err);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleUserNameChange = (e) => {
    setEmail(e.target.value);
    if (isUserNameDirty) {
      if (e.target.value) {
        setUserNameError("");
      } else {
        setUserNameError("Foydalanuvchi nomi boʻsh boʻlishi mumkin emas");
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (isPasswordDirty) {
      if (e.target.value.length >= 5) {
        setPasswordError("");
      } else if (!e.target.value) {
        setPasswordError("Parol bo'sh bo'lishi mumkin emas");
      } else {
        setPasswordError("Parol kamida 5 ta belgidan iborat bo'lishi kerak");
      }
    }
  };

  return (
    <>
      <div className="flex h-[100vh]">
        <div className="bg-primary hidden w-[50%] h-full lg:flex items-center justify-center bg-no-repeat bg-center">
          <h1 className="text-white text-[70px] font-bold">DigitalHR</h1>
        </div>
        <div className="w-full lg:w-[50%] h-full flex lg:items-center justify-center pt-[200px] lg:pt-0 px-6 md:px-10">
          <div className="w-[523px] flex flex-col items-center">
            <p className="font-bold text-[28px] md:text-[32px] text-[#002B48] mb-2 md:mb-3">
              Login
            </p>
            <p className="text-[#787F95] text-sm md:text-base font-medium mb-7 md:mb-10">
              Login description
            </p>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative mb-6">
                <input
                  className={`w-full ring-4 ring-transparent h-[46px] text-[#002B48] font-medium rounded-md outline-none border-2 px-[45px] duration-150 ${
                    userNameError
                      ? "border-red-400 focus:ring-red-100"
                      : "border-[#EEF0F4] focus:border-primary focus:ring-primary/10"
                  }`}
                  type="text"
                  placeholder="Login name"
                  value={email}
                  onChange={handleUserNameChange}
                />
                <FaRegUser className="text-[20px] absolute top-3 left-3 text-[#002B48]" />
                {userNameError && (
                  <p className="absolute -bottom-[18px] text-red-400 text-[12px] font-medium mt-1">
                    {userNameError}
                  </p>
                )}
              </div>
              <div className="relative mb-10">
                <input
                  className={`w-full ring-4 ring-transparent h-[46px] text-[#002B48] font-medium rounded-md outline-none border-2 px-[45px] duration-150 ${
                    passwordError
                      ? "border-red-400 focus:ring-red-100"
                      : "border-[#EEF0F4] focus:border-primary focus:ring-primary/10"
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Login password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <HiOutlineLockClosed className="text-[24px] absolute top-[10px] left-3 text-[#002B48]" />
                <div className="absolute top-3 right-4">
                  {showPassword ? (
                    <button
                      type="button"
                      onClick={() => setShowPassword(false)}
                    >
                      <FiEyeOff className="text-[#002B48] text-[22px]" />
                    </button>
                  ) : (
                    <button type="button" onClick={() => setShowPassword(true)}>
                      <FiEye className="text-[#002B48] text-[22px]" />
                    </button>
                  )}
                </div>
                {passwordError && (
                  <p className="absolute -bottom-[18px] text-red-400 text-[12px] font-medium mt-1">
                    {passwordError}
                  </p>
                )}
              </div>
              <button
                disabled={buttonLoading}
                className={`w-full h-12 md:h-[54px] bg-primary text-[#FFFFFF] text-[18px] shadow-[0_7px_15px_5px] shadow-primary/15 font-semibold rounded-md text-center duration-150 focus:outline-none ${
                  buttonLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 hover:bg-primary/85"
                }`}
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
