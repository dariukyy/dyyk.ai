"use client";
import ForgetHighlightBar from "@/components/forget-password/ForgetHighlightBar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
      });
  }

  return (
    <div className="flex-1 py-36 md:px-16 w-full h-full">
      <div className="flex flex-col h-full gap-3">
        <form
          className="h-full z-10"
          onSubmit={!successfulCreation ? create : reset}
        >
          <div className="flex flex-col justify-between gap-3 h-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-gravel md:text-4xl mb-4 text-center font-bold">
                Forgot Password?
              </h2>
              {!successfulCreation && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Please enter your email address below, and we&aposs;ll send
                    you a code to reset your password.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      className="rounded-lg"
                      id="email"
                      type="email"
                      placeholder="e.g john@doe.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <SubmitButton
                      loadingText="Sending Code..."
                      variant="default"
                      loading={loading}
                      className={`${
                        loading ? "bg-primary/50 w-full" : "w-full"
                      }`}
                      text="Continue"
                    />
                    {error && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                </>
              )}

              {successfulCreation && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Enter the reset code you received via email, along with your
                    new password, to update your account.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="password">Enter your new password</Label>
                    <Input
                      className="rounded-lg"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Label htmlFor="code">
                      Enter the password reset code that was sent to your email
                    </Label>
                    <Input
                      className="rounded-lg"
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />

                    <SubmitButton
                      loadingText="Resetting Password..."
                      text="Reset Password"
                      loading={loading}
                      className={`${
                        loading ? "bg-primary/50 w-full" : "w-full"
                      }`}
                    />
                    {error && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                </>
              )}

              {secondFactor && (
                <p className="text-medium font-semibold text-red-400">
                  2FA is required, but this UI does not handle that
                </p>
              )}
            </div>
            <ForgetHighlightBar successfulCreation={successfulCreation} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
