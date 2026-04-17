import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileSignature, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Drafton | Modern Document Drafting",
  description: "Slick, minimal, and lightning-fast document drafting platform tailored for modern professionals.",
  openGraph: {
    title: "Drafton | Modern Document Drafting",
    description: "Slick, minimal, and lightning-fast document drafting platform tailored for modern professionals.",
    type: "website",
  },
};

const features = [
  {
    title: "Lightning Fast",
    description: "Built on a bleeding-edge architecture for sub-200ms interactions.",
    icon: Zap,
  },
  {
    title: "Secure & Reliable",
    description: "Your documents are encrypted and safely stored with enterprise-grade security.",
    icon: ShieldCheck,
  },
  {
    title: "Effortless Drafting",
    description: "A minimal, distraction-free interface to help you focus on the content.",
    icon: FileSignature,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start relative overflow-hidden">
        {/* Ambient Animated Backgrounds */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-zinc-300/30 dark:bg-zinc-800/30 blur-[120px] animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-zinc-200/20 dark:bg-zinc-900/40 blur-[150px] animate-pulse"
            style={{ animationDuration: "7s" }}
          />
          <div
            className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-zinc-400/20 dark:bg-zinc-800/20 blur-[130px] animate-pulse"
            style={{ animationDuration: "5s" }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative w-full max-w-4xl mx-auto px-6 pt-40 pb-32 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md text-zinc-600 dark:text-zinc-300 ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 shadow-sm">
            <span className="flex w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Drafting, redefined.
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 text-balance leading-tight drop-shadow-sm font-sans">
            Create documents with <span className="text-zinc-500 dark:text-zinc-400">clarity</span>.
          </h1>
          <p className="max-w-2xl mx-auto text-lg  text-zinc-600 dark:text-zinc-400 mb-10  leading-tight font-mono">
            Drafton provides a minimal, ultra-fast environment to draft, share, and manage your important documents
            without the clutter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto h-12 px-8 text-base transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 group"
            >
              <Link href="/auth/sign-up">
                Get Started
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto h-12 px-8 text-base transition-all hover:-translate-y-1 hover:shadow-md active:translate-y-0 border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-black/50 backdrop-blur-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* Demonstrate Section */}
        <section
          id="features"
          className="relative w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 py-32 px-6 z-10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Designed for Focus</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                Everything you need to draft professional documents, stripped of unnecessary distractions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="group border-transparent shadow-none bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-zinc-200 dark:hover:border-zinc-700"
                  >
                    <CardHeader>
                      <div className="size-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-4 transition-colors group-hover:bg-zinc-900 group-hover:text-zinc-50 dark:group-hover:bg-zinc-50 dark:group-hover:text-zinc-900 shadow-sm">
                        <Icon className="size-6 text-zinc-600 dark:text-zinc-400 group-hover:text-current transition-colors" />
                      </div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative w-full border-t border-zinc-200 dark:border-zinc-800 py-12 px-6 bg-white dark:bg-zinc-950 z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            © {new Date().getFullYear()} Drafton. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <Link
              href="#"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="#"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
