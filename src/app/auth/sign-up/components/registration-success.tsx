import Link from "next/link";
import { MailCheck } from "lucide-react";

export function RegistrationSuccess({ email }: { email: string }) {
  return (
    <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-center">
        <div className="h-20 w-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
          <MailCheck className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Check your inbox</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          We sent a confirmation link to{" "}
          <span className="font-medium text-neutral-900 dark:text-white">{email}</span>.
          Click the link in the email to activate your account.
        </p>
      </div>
      <div className="text-sm text-neutral-500 dark:text-neutral-400">
        <Link
          href="/auth/login"
          className="font-medium text-neutral-900 border-b border-neutral-900/10 hover:border-neutral-900 dark:text-white dark:border-white/10 dark:hover:border-white transition-colors"
        >
          Back to log in
        </Link>
      </div>
    </div>
  );
}
