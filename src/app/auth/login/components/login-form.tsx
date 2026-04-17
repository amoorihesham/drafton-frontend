"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validations/auth";
import { getDeviceId } from "@/lib/device-id";
import { useSession } from "@/components/providers/AuthProvider";
import { authService } from "@/services/auth.service";
import { handleError } from "@/lib/errors/handling";

export function LoginForm() {
  const router = useRouter();
  const { setUser, user } = useSession();
  console.log(user);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema.omit({ deviceId: true }),
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await authService.login({ ...value, deviceId: getDeviceId() });
        toast.success("Login successful");
        setUser(result.data);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error: unknown) {
        const e = handleError(error);
        toast.error(e.error.code, { description: e.error.message });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="email"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              name={field.name}
              type="email"
              placeholder="jane@example.com"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={form.state.isSubmitting}
            />
            {field.state.meta.errors && (
              <div className="space-y-1">
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-sm font-medium text-red-500">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={field.name}>Password</Label>
              <Link
                href="/auth/reset-password"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id={field.name}
              name={field.name}
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={form.state.isSubmitting}
            />
            {field.state.meta.errors && (
              <div className="space-y-1">
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-sm font-medium text-red-500">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" className="w-full" size="lg" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        )}
      />
    </form>
  );
}
