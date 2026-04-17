import { ApiResponse } from "./api.types";

export type User = {
  id: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SignUpInput = {
  username: string;
  email: string;
  password: string;
};

export type SignUpResult = ApiResponse<User>;


export type LoggedInUser = User & { accessToken: string };

export type LoginInput = {
  email: string;
  password: string;
  deviceId: string;
};

export type LoginResult = ApiResponse<
  User & {
    accessToken: string;
  }
>;

export type VerifyEmailInput = {
  email: string;
  otp: string;
};

export type VerifyEmailResult = ApiResponse<User>;
