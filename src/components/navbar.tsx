import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="text-xl font-bold tracking-tight">
          <Link href="/">Drafton</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <Link href="/auth/login">Log in</Link>
          </Button>
          <Button asChild className="transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
            <Link href="/auth/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
