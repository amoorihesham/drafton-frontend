import { loginAction } from "@/actions/auth.actions";
import { LoginInput } from "@/types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        deviceId: { label: "Device ID", type: "text" },
      },
      async authorize(credentials) {
        const { deviceId, email, password } = credentials as LoginInput;
        const response = await loginAction({ email: email!, password: password!, deviceId: deviceId! });
        console.log(response);
        if (response.success) return response.data;
        return decodeURI;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});
