/**
 * Auth-specific types for request and response data
 */
import { ApiResponse } from "./api.types";

// Request types
export type SignUpInput = {
  username: string;
  email: string;
  password: string;
};

// Response data types (what backend returns in data field)
export type SignUpResponseData = {
  id: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

// Action return type — alias of ApiResponse to prevent silent drift
export type SignUpResult = ApiResponse<SignUpResponseData>;

// ─── Login ───────────────────────────────────────────────────────────────────

// Request types
export type LoginInput = {
  email: string;
  password: string;
  /** Generated client-side via getDeviceId() and passed into the server action */
  deviceId: string;
};

// Response data types (what backend returns in the `data` field)
export type LoginResponseData = {
  id: string;
  email: string;
  username: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  accessToken: string;
};

// Action return type
export type LoginResult = ApiResponse<LoginResponseData>;

// ─── Verify Email ───────────────────────────────────────────────────────────

export type VerifyEmailInput = {
  email: string;
  otp: string;
};

export type VerifyEmailResponseData = {
  id: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VerifyEmailResult = ApiResponse<VerifyEmailResponseData>;
