import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { UserProfileResponse } from "@/types";

export const SubscriptionSection = ({ userPromise }: { userPromise: Promise<UserProfileResponse> }) => {
  const { plan, proposalsCount, percentageUsage } = use(userPromise);
  return (
    <section className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">Subscription</h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Your current plan and usage.</p>
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* Plan info + upgrade */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">Free Plan</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Current
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {plan.max_documents_per_day} AI-generated proposals / day · Basic e-signature support
            </p>
          </div>
          <Button asChild size="sm" className="shrink-0 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white border-0">
            <Link href="/pricing">
              <Sparkles className="w-3.5 h-3.5" />
              Upgrade
            </Link>
          </Button>
        </div>

        {/* Usage bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span>Proposals used this month</span>
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">{proposalsCount} / 5</span>
          </div>
          <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${percentageUsage}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
};
