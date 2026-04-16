"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validations/auth";
import { loginAction } from "@/actions/auth.actions";
import { getDeviceId } from "@/lib/device-id";

export function LoginForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      // loginSchema includes deviceId but it's not in defaultValues — we
      // inject it at submit time so Zod still validates it.
      onSubmit: loginSchema.omit({ deviceId: true }),
    },
    onSubmit: async ({ value }) => {
      const response = await loginAction({
        ...value,
        deviceId: getDeviceId(),
      });

      if (response.success) {
        toast.success("Welcome back!");
        router.push("/");
      } else {
        toast.error(response.error?.code, {
          description: response.error?.message,
        });
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
            {field.state.meta.errors ? (
              <p className="text-sm font-medium text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
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
            {field.state.meta.errors ? (
              <p className="text-sm font-medium text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        )}
      />
    </form>
  );
}
