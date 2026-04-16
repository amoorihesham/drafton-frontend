import { ApiErrorResponse } from "@/types/api.types";

/**
 * Converts any caught value into a typed ApiErrorResponse.
 *
 * After Option B's response interceptor, errors thrown by `http.*` helpers
 * are already ApiErrorResponse objects. This function handles that case and
 * provides a safe fallback for anything else (e.g. thrown strings or unknown
 * runtime errors).
 */
export function handleError(error: unknown): ApiErrorResponse {
  // Interceptor already normalized the error — pass it through
  if (
    typeof error === "object" &&
    error !== null &&
    "success" in error &&
    (error as ApiErrorResponse).success === false
  ) {
    return error as ApiErrorResponse;
  }

  // Catch-all for unexpected throws
  return {
    success: false,
    error: {
      code: "UNKNOWN_ERROR",
      message: "An unexpected error occurred",
    },
  };
}
