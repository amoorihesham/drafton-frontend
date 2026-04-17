"use client";
import { authService } from "@/services/auth.service";
import { useSession } from "../providers/AuthProvider";
import { Button } from "../ui/button";
import { getDeviceId } from "@/lib/device-id";
import { handleError } from "@/lib/errors/handling";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { user } = useSession();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const result = await authService.logout(user!.id, getDeviceId());
        toast.success("logout successful");
        router.push("/");
      } catch (error: unknown) {
        const e = handleError(error);
        toast.error(e.error.code, { description: e.error.message });
      }
    });
  };

  return (
    <Button
      variant="destructive"
      className="transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800"
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? "Logging out..." : "Log out"}
    </Button>
  );
}
