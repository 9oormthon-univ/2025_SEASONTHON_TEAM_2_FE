import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // API 기본 URL
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
