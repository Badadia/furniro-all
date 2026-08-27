import { API_BASE_URL } from "@/config/env";
import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      const token = parsed?.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      // Ignore 401 on login and register forms (invalid credentials error is handled by the form)
      if (!url.includes("/auth/login") && !url.includes("/auth/register")) {
        try {
          const authStorage = localStorage.getItem("auth-storage");
          if (authStorage) {
            localStorage.removeItem("auth-storage");
            toast.error("Session expired. Please sign in again.");
            if (
              typeof window !== "undefined" &&
              !window.location.pathname.includes("/login")
            ) {
              window.location.href = "/login";
            }
          }
        } catch {
          // ignore
        }
      }
    }
    return Promise.reject(error);
  },
);
