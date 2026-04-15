"use client";

import { useForm } from "@tanstack/react-form";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema } from "@/lib/validations/auth";
import { signUpAction } from "@/actions/auth.actions";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await signUpAction(value);

      if (response.success) {
        toast.success(response.message);
        router.push(`/auth/verify-email?email=${response.data?.email}`);
      } else {
        toast.error(response.error?.code, { description: response.error?.message });
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
        name="username"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Username</Label>
            <Input
              id={field.name}
              name={field.name}
              placeholder="janedoe"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={form.state.isSubmitting}
            />
            {field.state.meta.errors ? (
              <p className="text-sm font-medium text-red-500">{field.state.meta.errors.join(", ")}</p>
            ) : null}
          </div>
        )}
      />

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
              <p className="text-sm font-medium text-red-500">{field.state.meta.errors.join(", ")}</p>
            ) : null}
          </div>
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Password</Label>
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
              <p className="text-sm font-medium text-red-500">{field.state.meta.errors.join(", ")}</p>
            ) : null}
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" className="w-full" size="lg" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        )}
      />
    </form>
  );
}
