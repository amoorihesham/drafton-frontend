import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Enter your email to sign in to your account
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jane@example.com" required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/reset-password" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full" size="lg">
          Sign In
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-200 dark:border-neutral-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" className="w-full">
           Github
        </Button>
        <Button variant="outline" type="button" className="w-full">
           Google
        </Button>
      </div>

      <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="font-medium text-neutral-900 border-b border-neutral-900/10 hover:border-neutral-900 dark:text-white dark:border-white/10 dark:hover:border-white transition-colors">
          Sign up
        </Link>
      </div>
    </div>
  );
}
