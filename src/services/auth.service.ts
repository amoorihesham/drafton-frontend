import { http } from "@/lib/api-client";
import { ApiSuccessResponse } from "@/types/api.types";
import {
  SignUpInput,
  SignUpResponseData,
  LoginInput,
  LoginResponseData,
} from "@/types/auth.types";

export const authService = {
  register(data: SignUpInput): Promise<ApiSuccessResponse<SignUpResponseData>> {
    return http.post<ApiSuccessResponse<SignUpResponseData>>("/auth/register", data);
  },

  login(data: LoginInput): Promise<ApiSuccessResponse<LoginResponseData>> {
    return http.post<ApiSuccessResponse<LoginResponseData>>("/auth/login", data);
  },
};

