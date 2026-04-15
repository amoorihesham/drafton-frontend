import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400">
            Choose the plan that best fits your workflow. Automate your proposals and close deals faster.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Free Plan */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-sm flex flex-col transition-transform hover:-translate-y-1 duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">Perfect for individuals just getting started.</p>
            </div>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-neutral-500 dark:text-neutral-400">/month</span>
            </div>
            <div className="space-y-4 flex-1">
              <FeatureItem text="5 AI-generated proposals / month" />
              <FeatureItem text="Standard proposal templates" />
              <FeatureItem text="Basic e-signature support" />
              <FeatureItem text="Export to PDF" />
              <FeatureItem text="Flowbie Integration" included={false} />
            </div>
            <div className="mt-8">
              <Link href="/auth/sign-up" className="block w-full">
                <Button variant="outline" className="w-full h-12">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-xl flex flex-col relative scale-100 lg:scale-105 z-10">
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Most Popular
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Pro</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">For growing teams that need more volume.</p>
            </div>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold">$10</span>
              <span className="text-neutral-500 dark:text-neutral-400">/month</span>
            </div>
            <div className="space-y-4 flex-1">
              <FeatureItem text="30 AI-generated proposals / month" />
              <FeatureItem text="Custom branding & templates" />
              <FeatureItem text="Advanced e-signature insights" />
              <FeatureItem text={
                <span>
                  <strong className="text-neutral-900 dark:text-neutral-100">Flowbie Integration</strong><br/>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">Manage work progress and tasks</span>
                </span>
              } />
              <FeatureItem text="Priority email support" />
            </div>
            <div className="mt-8">
              <Link href="/auth/sign-up" className="block w-full">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white border-0">Upgrade to Pro</Button>
              </Link>
            </div>
          </div>

          {/* Ultimate Plan */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-sm flex flex-col transition-transform hover:-translate-y-1 duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Ultimate</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">For high-volume established businesses.</p>
            </div>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold">$20</span>
              <span className="text-neutral-500 dark:text-neutral-400">/month</span>
            </div>
            <div className="space-y-4 flex-1">
              <FeatureItem text="80 AI-generated proposals / month" />
              <FeatureItem text="Everything in Pro plan" />
              <FeatureItem text={
                <span>
                  <strong className="text-neutral-900 dark:text-neutral-100">Flowbie Integration</strong><br/>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">Manage work progress and tasks</span>
                </span>
              } />
              <FeatureItem text="Volume API Access" />
              <FeatureItem text="Dedicated account manager" />
            </div>
            <div className="mt-8">
              <Link href="/auth/sign-up" className="block w-full">
                <Button variant="outline" className="w-full h-12">Upgrade to Ultimate</Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text, included = true }: { text: React.ReactNode; included?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${included ? 'text-neutral-700 dark:text-neutral-300 font-medium' : 'text-neutral-400 dark:text-neutral-600'}`}>
      {included ? (
        <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
      ) : (
        <X className="w-5 h-5 opacity-50 shrink-0 mt-0.5" />
      )}
      <div className="text-sm leading-tight">{text}</div>
    </div>
  );
}
