"use client";
import { use } from "react";
import { DeactivateAccount } from "./DeactivateAccount";
import { UserProfileResponse } from "@/types";

export const AccountCenter = ({ userPromise }: { userPromise: Promise<UserProfileResponse> }) => {
  const { user } = use(userPromise);
  return (
    <section className="bg-white dark:bg-neutral-900 rounded-xl border border-red-200 dark:border-red-900/40 overflow-hidden">
      <div className="px-6 py-4 border-b border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10">
        <h2 className="font-semibold text-red-700 dark:text-red-400">Account Center</h2>
        <p className="text-xs text-red-500/80 dark:text-red-500/60 mt-0.5">
          Irreversible actions — proceed with caution.
        </p>
      </div>

      <div className="px-6 py-5">
        <DeactivateAccount userId={user!.id} username={user!.username} />
      </div>
    </section>
  );
};
