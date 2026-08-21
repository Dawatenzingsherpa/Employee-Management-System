import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json ",
  },
});

export const APIAuthenticated = axios.create({
  baseURL: "http://localhost:3000/",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json ",
    Authorization: localStorage.getItem("token"),
  },
});

APIAuthenticated.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

APIAuthenticated.interceptors.response.use(
  (response) => {
    const method = response.config.method;
    if (method === "post" || method === "patch" || method === "delete") {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    toast.error(error.response.data.message);
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error(error.response.data.message);
    return Promise.reject(error);
  },
);

export default API;
