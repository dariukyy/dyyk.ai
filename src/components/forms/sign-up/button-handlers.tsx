"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

const ButtonHandler = (props: Props) => {
  const { setCurrentStep, currentStep } = useAuthContext();
  const { formState, getFieldState, getValues } = useFormContext();
  const { onGeneratedOTP } = useSignUpForm();

  const { isDirty: isName } = getFieldState("fullname", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);

  if (currentStep === 3) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button type="submit" className="w-full shadow-md">
          Create account
        </Button>
        <p className="text-muted-foreground text-sm md:text-md mt-2">
          Already have an account?
          <Link
            href="/auth/sign-in"
            className="tracking-wide font-bold text-primary text-md pl-2"
          >
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          type="submit"
          className="w-full shadow-md mt-2"
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () =>
                onGeneratedOTP(
                  getValues("email"),
                  getValues("password"),
                  setCurrentStep
                ),
            })}
        >
          Continue
        </Button>
        <p className="text-muted-foreground text-sm md:text-md">
          Already have an account?
          <Link
            href="/auth/sign-in"
            className="tracking-wide font-bold text-primary text-md pl-2"
          >
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="submit"
        className="w-full shadow-md"
        onClick={() => setCurrentStep((prev: number) => prev + 1)}
      >
        Continue
      </Button>
      <p className="text-muted-foreground text-sm md:text-md mt-2">
        Already have an account?
        <Link
          href="/auth/sign-in"
          className="tracking-wide font-bold text-primary text-md pl-2"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ButtonHandler;
