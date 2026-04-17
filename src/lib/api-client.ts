import axios, { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/api.types";

// ─── Axios instance ───────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3125/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ─── Request interceptor: inject auth token ────────────────────────────────
apiClient.interceptors.request.use((config) => {
  // const token = getToken();
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Response interceptor ─────────────────────────────────────────────────
// Happy path  → strip the AxiosResponse envelope, return raw backend JSON.
// Error path  → convert AxiosError into a typed ApiErrorResponse and reject
//               with it so every catch block receives a known shape.
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorResponse>) => {
    const serverError = error.response?.data;

    // Backend returned a structured error body
    if (serverError?.success === false) {
      return Promise.reject(serverError);
    }

    // Network / timeout / proxy errors — synthesize a typed fallback
    const fallback: ApiErrorResponse = {
      success: false,
      error: {
        code: error.code ?? "NETWORK_ERROR",
        message: error.message ?? "A network error occurred",
      },
    };
    return Promise.reject(fallback);
  },
);

// ─── Typed HTTP helpers ───────────────────────────────────────────────────
// The second generic on request<TResponse, TResponse> tells Axios that the
// *resolved* value is TResponse — not AxiosResponse<TResponse> — which is
// true because our interceptor already stripped the envelope.
function request<T>(method: string, url: string, data?: unknown): Promise<T> {
  return apiClient.request<T, T>({ method, url, data });
}

export const http = {
  get: <T>(url: string) => request<T>("get", url),
  post: <T>(url: string, data: unknown) => request<T>("post", url, data),
  put: <T>(url: string, data: unknown) => request<T>("put", url, data),
  patch: <T>(url: string, data: unknown) => request<T>("patch", url, data),
  delete: <T>(url: string) => request<T>("delete", url),
};
