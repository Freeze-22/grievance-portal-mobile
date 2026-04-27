import axios from "axios";

// Using a placeholder base URL. Can be replaced with environment config.
const API_URL = "https://api.grievance-portal.demo";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: add auth token if needed
api.interceptors.request.use(
  async (config) => {
    // e.g. const token = await SecureStore.getItemAsync("auth_token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if network error or 500 etc.
    if (!error.response) {
      console.warn("Network error or server down:", error);
    }
    return Promise.reject(error);
  }
);
