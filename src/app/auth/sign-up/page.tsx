import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Enter your details below to get started</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="janedoe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jane@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full" size="lg">
          Create account
        </Button>
      </div>

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
