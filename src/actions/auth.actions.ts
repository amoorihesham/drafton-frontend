"use server";

import { authService } from "@/services/auth.service";
import { signUpSchema, loginSchema, verifyEmailSchema } from "@/lib/validations/auth";
import { handleError } from "@/lib/errors/handling";
import {
  SignUpInput,
  SignUpResult,
  LoginInput,
  LoginResult,
  VerifyEmailInput,
  VerifyEmailResult,
} from "@/types/auth.types";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function signUpAction(data: SignUpInput): Promise<SignUpResult> {
  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: parsed.error.issues[0]?.message || "Invalid input data",
      },
    };
  }

  try {
    return await authService.register(parsed.data);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function loginAction(data: LoginInput): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: parsed.error.issues[0]?.message || "Invalid input data",
      },
    };
  }

  try {
    return await authService.login(parsed.data);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function verifyEmailAction(data: VerifyEmailInput): Promise<VerifyEmailResult> {
  const parsed = verifyEmailSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: parsed.error.issues[0]?.message || "Invalid input data",
      },
    };
  }

  try {
    return await authService.verifyEmail(parsed.data);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export const getCurrentUser = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token");

  if (!token) return null;
  try {
    const decode = jwt.decode(token?.value!);
    console.log(decode, "SERVER_SESSION");

    return decode;
  } catch (error) {
    return null;
  }
};
