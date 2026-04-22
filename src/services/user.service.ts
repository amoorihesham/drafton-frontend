import { http } from "@/lib/api-client";
import { UserProfileResponse } from "@/types";
import type { ApiSuccessResponse } from "@/types/api.types";

export const userService = {
  deactivate(id: string): Promise<ApiSuccessResponse<void>> {
    return http.patch<ApiSuccessResponse<void>>(`/users/${id}/deactivate`, {});
  },
  getUserProfile(id: string): Promise<ApiSuccessResponse<UserProfileResponse>> {
    return http.get<ApiSuccessResponse<UserProfileResponse>>(`/users/profile/${id}`);
  },
};
