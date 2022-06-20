import axios from "axios";
import { BASE_URL } from "@/constants";
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

service.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

service.interceptors.request.use((res) => {
  const { success, message, data } = res.data;
  if (success) {
    return data;
  }
  return Promise.reject(new Error(message));
});

export default service;
