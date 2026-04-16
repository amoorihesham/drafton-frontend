"use client";

import { verifyEmailAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function VerificationComponent() {
  const router = useRouter();
  const email = useSearchParams().get("email");
  const otp = useSearchParams().get("otp");

  const [verificationState, setVerificationState] = useState<"idle" | "verifying" | "success" | "error">("idle");

  async function VerifyEmail() {
    setVerificationState("verifying");
    const response = await verifyEmailAction({ email: email!, otp: otp! });

    if (response.success) {
      toast.success("Email verified successfully");
      setVerificationState("success");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } else {
      toast.error(response.error?.code, {
        description: response.error?.message,
      });
      setVerificationState("error");
    }
  }

  useEffect(() => {
    VerifyEmail();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        {(verificationState === "idle" || verificationState === "verifying") && <Loader className="animate-spin" />}
        {verificationState === "success" && <CheckCircle className="text-green-500" />}
        {verificationState === "error" && <X className="text-red-500" />}
      </div>
      {!(verificationState === "verifying" || verificationState === "success") && (
        <div className="space-y-4">
          <Button variant="outline" className="w-full" size="lg">
            Resend verification email
          </Button>
        </div>
      )}
    </>
  );
}
