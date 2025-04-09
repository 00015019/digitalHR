import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthGuard = ({ children }) => {
  const token = Cookies.get("access_token");
  return token ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;
