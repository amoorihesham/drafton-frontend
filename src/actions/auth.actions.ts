"use server";

import { authService } from "@/services/auth.service";
import { signUpSchema, SignUpInput } from "@/lib/validations/auth";
import { handleError } from "@/lib/errors/handling";

export async function signUpAction(data: SignUpInput) {
  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input data",
      },
    };
  }

  try {
    const response = await authService.register(parsed.data);

    return response;
  } catch (error: unknown) {
    return handleError(error);
  }
}
