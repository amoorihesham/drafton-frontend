import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Authentication } from "./layout/navbar/Authentication";
import { Suspense } from "react";

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="text-xl font-bold tracking-tight">
          <Link href="/">Drafton</Link>
        </div>
        <div className="flex items-center gap-4">
          <Suspense fallback={<Button>Loading...</Button>}>
            <Authentication />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
