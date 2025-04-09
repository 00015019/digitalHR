import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: "http://95.130.227.13/api/v1",
});

request.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default request;
