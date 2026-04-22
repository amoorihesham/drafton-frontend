"use client";
import { LoggedInUser, UserProfileResponse } from "@/types";
import { AlertCircle, Calendar, CheckCircle2, Shield } from "lucide-react";
import { use } from "react";

function getInitials(username: string) {
  return username.slice(0, 2).toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const AvatarName = ({ userPromise }: { userPromise: Promise<UserProfileResponse> }) => {
  const { user } = use(userPromise);

  function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div className="px-6 py-3.5 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider w-32 shrink-0">{label}</span>
        <div className="flex-1 flex justify-end">{children}</div>
      </div>
    );
  }

  return (
    <>
      <div className="px-6 py-5 flex items-center gap-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shrink-0 select-none">
          <span className="text-xl font-bold text-white">{getInitials(user!.username)}</span>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg leading-tight">{user!.username}</p>
          <p className="text-sm text-neutral-500">{user!.email}</p>
        </div>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        <FieldRow label="Username">
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{user!.username}</span>
        </FieldRow>

        <FieldRow label="Email">
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{user!.email}</span>
            {user!.isEmailVerified ? (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                <AlertCircle className="w-2.5 h-2.5" />
                Unverified
              </span>
            )}
          </div>
        </FieldRow>

        <FieldRow label="Role">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 capitalize">
            <Shield className="w-3 h-3" />
            {user!.role}
          </span>
        </FieldRow>

        <FieldRow label="Member since">
          <div className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {formatDate(user!.createdAt)}
          </div>
        </FieldRow>
      </div>
    </>
  );
};
