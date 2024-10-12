"use client";
import ForgetHighlightBar from "@/components/forget-password/ForgetHighlightBar";
import OTPForm from "@/components/forms/sign-up/otp-form";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [successfulCreation, setSuccessfulCreation] = useState<boolean>(false);
  const [secondFactor, setSecondFactor] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/dashboard");
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setIsLoading(false);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
        setIsLoading(false);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);

          setError("");
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setIsLoading(false);

          setError("");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
        setIsLoading(false);
      });
  }
  //   <h2 className="text-gravel md:text-4xl text-center font-bold">
  //   Enter OTP
  // </h2>
  // <p className="text-muted-foreground text-sm md:text-mds">
  //   Enter the one time password that was send to your email.
  // </p>

  return (
    <div className="flex-1 px-6 py-36 md:px-16 w-full h-full">
      <div className="flex flex-col h-full gap-3">
        <form
          className="h-full z-10 "
          onSubmit={!successfulCreation ? create : reset}
        >
          <div className="flex flex-col justify-between gap-3 h-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-gravel text-3xl ,md:text-4xl text-center font-bold mb-4">
                {successfulCreation
                  ? "Reset Your Password"
                  : "Forgot Password?"}
              </h2>
              {!successfulCreation && (
                <>
                  <p className="text-muted-foreground text-sm md:text-md">
                    Enter your email address below, and we&apos;ll send you a
                    code to reset your password.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      className="rounded-lg shadow-md"
                      id="email"
                      type="email"
                      disabled={loading}
                      placeholder="e.g john@doe.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    {error && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {error.replace(".", "")}
                      </p>
                    )}
                    <SubmitButton
                      loadingText="Sending Code..."
                      variant="default"
                      loading={loading}
                      className={`${
                        loading
                          ? "bg-platinum w-full mt-3 shadow-md"
                          : "w-full mt-3 shadow-md"
                      }`}
                      text="Continue"
                    />
                    <div className="text-sm self-end leading-5">
                      <Link
                        href="/auth/sign-in"
                        className="font-bold text-md tracking-wide text-primary mt-4"
                      >
                        Return to Login
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {successfulCreation && (
                <>
                  <p className="text-muted-foreground text-sm md:text-md">
                    Enter the code from your email and your new password to
                    update your account.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="password">Enter your new password</Label>
                    <Input
                      disabled={loading}
                      className="rounded-lg"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Label htmlFor="code" className="mt-2">
                      Enter the one time password that was send to your email
                    </Label>
                    {/* <Input
                      className="rounded-lg"
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => {
                        console.log(e.target);
                        setCode(e.target.value);
                      }}
                    /> */}
                    {/* <OTPForm
                      onAuth={true}
                      onOTP={code}
                      setOTP={(e: any) => setCode(e.target.value)}
                    /> */}
                    <InputOTP
                      maxLength={6}
                      value={code}
                      onChange={(value) => setCode(value)}
                    >
                      <div className="flex items-center w-full justify-evenly">
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />

                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </div>
                    </InputOTP>
                    {error && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {error.replace(".", "")}
                      </p>
                    )}
                    <SubmitButton
                      loadingText="Resetting Password..."
                      text="Reset Password"
                      loading={loading}
                      className={`mt-3 ${
                        loading
                          ? "bg-platinum w-full shadow-md"
                          : "w-full shadow-md mt-3"
                      }`}
                    />
                    <div className="text-sm self-end leading-5">
                      <Link
                        href="/auth/sign-in"
                        className="font-bold text-md tracking-wide text-primary mt-4"
                      >
                        Return to Login
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {secondFactor && (
                <p className="text-medium font-semibold text-red-400">
                  2FA is required, but this UI does not handle that
                </p>
              )}
            </div>
            <div>
              <ForgetHighlightBar successfulCreation={successfulCreation} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
