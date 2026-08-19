import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const APIAuthenticated = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization : `${localStorage.getItem("token")}`
  },
});

export default API;
