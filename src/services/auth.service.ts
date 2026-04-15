import { apiClient } from "@/lib/api-client";
import { SignUpInput } from "@/lib/validations/auth";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export const authService = {
  async register(data: SignUpInput) {
    const response = await apiClient.post<
      ApiResponse<{
        id: string;
        email: string;
        username: string;
        role: string;
        isActive: boolean;
        isEmailVerified: boolean;
        createdAt: string;
        updatedAt: string;
      }>
    >("/auth/register", data);
    return response.data;
  },
};
