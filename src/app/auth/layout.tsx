import { ReactNode } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-neutral-950">
      {/* Left pane - branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-neutral-900 text-white">
        <div>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <span>Drafton</span>
          </Link>
        </div>
        
        <div className="max-w-lg">
          <h1 className="text-4xl font-semibold leading-tight mb-6">
            Close drafts faster with AI-powered proposals.
          </h1>
          <p className="text-neutral-400 text-lg">
            Drafton generates professional proposals with AI, lets you send documents directly to clients, and collects e-signatures seamlessly.
          </p>
        </div>
        
        <div className="text-sm text-neutral-500">
          © {new Date().getFullYear()} Drafton Inc. All rights reserved.
        </div>
      </div>

      {/* Right pane - auth forms */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-[380px]">
          {children}
        </div>
      </div>
    </div>
  );
}
