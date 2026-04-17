import { LogoutButton } from "@/components/buttons/LogoutButton";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getDeviceId } from "@/lib/device-id";
import { handleError } from "@/lib/errors/handling";
import { authService } from "@/services/auth.service";
import Link from "next/link";
import { toast } from "sonner";

export const Authentication = async () => {
  const user = await getCurrentUser();

  if (!user)
    return (
      <>
        <Button variant="ghost" asChild className="transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800">
          <Link href="/auth/login">Log in</Link>
        </Button>
        <Button
          asChild
          className="transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
        >
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </>
    );
  return (
    <>
      <Button
        asChild
        className="transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <LogoutButton />
    </>
  );
};
