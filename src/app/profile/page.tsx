import { AvatarName } from "./_components/AvatarName";
import { SubscriptionSection } from "./_components/SubscriptionSection";
import { AccountCenter } from "./_components/AccountCenter";
import { Suspense } from "react";
import { getUserProfile } from "@/actions/auth.actions";

export default async function ProfilePage() {
  const user = getUserProfile();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* ── Content ── */}
      <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Account Settings</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your profile, subscription, and account preferences.
          </p>
        </div>

        {/* ── Section 1: User Info ── */}
        <section className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
            <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">Account Information</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Your personal details on file.</p>
          </div>

          {/* Avatar + name */}
          <Suspense fallback={<div>Loading...</div>}>
            <AvatarName userPromise={user} />
          </Suspense>
        </section>

        {/* ── Section 2: Subscription ── */}
        <Suspense fallback={<div>Loading...</div>}>
          <SubscriptionSection userPromise={user} />
        </Suspense>

        {/* ── Section 3: Account Center ── */}
        <Suspense fallback={<div>Loading...</div>}>
          <AccountCenter userPromise={user} />
        </Suspense>
      </main>
    </div>
  );
}
