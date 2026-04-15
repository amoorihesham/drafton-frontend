import Link from "next/link";
import { SignUpForm } from "./components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Enter your details below to get started</p>
      </div>

      <SignUpForm />

      <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-neutral-900 border-b border-neutral-900/10 hover:border-neutral-900 dark:text-white dark:border-white/10 dark:hover:border-white transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
