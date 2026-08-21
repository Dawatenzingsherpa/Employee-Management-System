import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-management-system-kwag.onrender.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const APIAuthenticated = axios.create({
  baseURL: "https://employee-management-system-kwag.onrender.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  },
});

APIAuthenticated.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default API;
