// src/api.ts
import axios from "axios";
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
