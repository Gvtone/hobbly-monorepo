import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    const data = error.response?.data;
    const raw = data?.message;

    const message = Array.isArray(raw)
      ? raw[0] // just the first one
      : (raw ?? "Something went wrong");

    return Promise.reject(new Error(message));
  }
);

export default api;
