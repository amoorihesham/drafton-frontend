"use server";

import { authService } from "@/services/auth.service";
import { signUpSchema, loginSchema } from "@/lib/validations/auth";
import { handleError } from "@/lib/errors/handling";
import {
  SignUpInput,
  SignUpResult,
  LoginInput,
  LoginResult,
} from "@/types/auth.types";

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
