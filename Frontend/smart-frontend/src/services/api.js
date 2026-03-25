import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT to every request when available.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Flask endpoints (existing backend uses /api/* and "query" as the search param name).
export const login = async (email, password) => {
  const response = await api.post("/api/login", {
    // Backend expects "username" (we map from the email input).
    username: email,
    password,
  });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post("/api/register", {
    // Backend expects "username" + "password".
    // We map from the email input; extra fields are safe to include.
    username: email,
    password,
    name,
  });
  return response.data;
};

export const searchKnowledge = async (query) => {
  const response = await api.get("/api/search", { params: { query } });
  return response.data;
};

export default api;