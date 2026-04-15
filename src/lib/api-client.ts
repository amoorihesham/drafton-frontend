import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3125/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// We can add interceptors here later if needed (e.g. for injecting Auth tokens)
apiClient.interceptors.request.use((config) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
