import { ApiResponse } from "@/services/auth.service";
import { isAxiosError } from "axios";

export function handleError(error: unknown): ApiResponse<undefined> {
  if (isAxiosError(error)) {
    if (error.response?.data) return { success: error.response.data.success, error: error.response.data.error };
  }

  return { success: false, error: { code: "UNKNOWN_ERROR", message: "An unexpected error occurred" } };
}
