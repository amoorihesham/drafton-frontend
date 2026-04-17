"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoggedInUser } from "@/types";

export const getCurrentUser = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  if (!token) return null;
  try {
    const decode = jwt.decode(token);
    if (!decode || typeof decode === "string") return null;

    return decode as LoggedInUser;
  } catch (error) {
    return null;
  }
};
