import { http } from "@/lib/api-client";
import { ApiSuccessResponse } from "@/types/api.types";
import { SignUpInput, LoginInput, VerifyEmailInput, User, LoggedInUser } from "@/types/auth.types";

export const authService = {
  register(data: SignUpInput): Promise<ApiSuccessResponse<User>> {
    return http.post<ApiSuccessResponse<User>>("/auth/register", data);
  },

  login(data: LoginInput): Promise<ApiSuccessResponse<LoggedInUser>> {
    return http.post<ApiSuccessResponse<LoggedInUser>>("/auth/login", data);
  },

  logout(userId: string, deviceId: string): Promise<ApiSuccessResponse<void>> {
    return http.post<ApiSuccessResponse<void>>(`/auth/logout/${userId}`, { deviceId });
  },

  verifyEmail(data: VerifyEmailInput): Promise<ApiSuccessResponse<User>> {
    return http.post<ApiSuccessResponse<User>>("/auth/verify-email", data);
  },
};
