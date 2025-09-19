"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const VerifyRequest = () => {

  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [emailPending, startTransition] = useTransition();
  const params = useSearchParams();

  const email = params.get("email") as string;
  const isOtpCompleted = otp.length === 6;

  function verifyOTP() {
    startTransition( async () => {
        // Verify the OTP
        await authClient.signIn.emailOtp({
            email: email,
            otp: otp,
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Email verified");
                    router.push("/");
                },
                onError: () => {
                    toast.error("Email verification failed");
                }
            }
        })
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We've sent you a verification email. Please check your inbox and paste
          the code below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="item-center flex justify-center">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="mx-auto gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={4} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button onClick={verifyOTP} disabled={emailPending || !isOtpCompleted} className="w-full mx-auto cursor-pointer">
          Verify Account
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyRequest;
