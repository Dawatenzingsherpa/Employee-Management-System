import axios from "axios";

const API = axios.create({
  url: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default API;
