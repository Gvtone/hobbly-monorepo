import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const isAuthError = error.response?.status === 401;
    const isRefreshCall = originalRequest.url?.includes("/auth/refresh-token");
    const alreadyRetried = originalRequest._retry;

    // Try to refresh on 401 (but not for the refresh endpoint itself)
    if (isAuthError && !isRefreshCall && !alreadyRetried) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh-token");
        return api(originalRequest); // retry the original request
      } catch {
        window.dispatchEvent(new CustomEvent("auth:session-expired"));
      }
    }

    const data = error.response?.data as { message?: string | string[] };
    const raw = data?.message;
    const message = Array.isArray(raw)
      ? raw[0]
      : (raw ?? "Something went wrong");

    return Promise.reject(new Error(message));
  },
);

export default api;
