'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleError } from '@/lib/errors/handling';
import { userService } from '@/services/user.service';

interface DeactivateAccountProps {
  userId: string;
  username: string;
}

export function DeactivateAccount({ userId, username }: DeactivateAccountProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');

  const canConfirm = confirmInput === username;

  const handleDeactivate = () => {
    startTransition(async () => {
      try {
        await userService.deactivate(userId);
        toast.success('Account deactivated');
        router.push('/auth/login');
      } catch (error) {
        const e = handleError(error);
        toast.error(e.error.code, { description: e.error.message });
      }
    });
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setConfirmInput('');
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Deactivate Account
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
            Deactivating your account will revoke your access. Your data is retained and
            can be restored by contacting support.
          </p>
        </div>
        {!showConfirm && (
          <Button
            size="sm"
            onClick={() => setShowConfirm(true)}
            className="shrink-0 bg-red-600 hover:bg-red-700 text-white border-0"
          >
            Deactivate
          </Button>
        )}
      </div>

      {showConfirm && (
        <div className="mt-4 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/10 p-4 space-y-3">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <p className="text-sm font-semibold">This action cannot be undone.</p>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Type{' '}
            <strong className="font-semibold text-neutral-800 dark:text-neutral-200">
              {username}
            </strong>{' '}
            to confirm you want to deactivate this account.
          </p>
          <input
            type="text"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            placeholder={username}
            autoComplete="off"
            className="w-full border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <div className="flex gap-2 justify-end pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!canConfirm || isPending}
              onClick={handleDeactivate}
              className="bg-red-600 hover:bg-red-700 text-white border-0 disabled:opacity-40"
            >
              {isPending ? 'Deactivating…' : 'Confirm Deactivation'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
