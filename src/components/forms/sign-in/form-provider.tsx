"use client";

import { Loader } from "@/components/loader";
import { SubmitButton } from "@/components/submit-button";
import { AuthContextProvider } from "@/context/use-auth-context";
import { useSignInForm } from "@/hooks/sign-in/use-sign-in";
import { PropsWithChildren } from "react";
import { FormProvider } from "react-hook-form";
import LoginForm from "./login-form";
import Link from "next/link";

// type SignInFormProviderProps = PropsWithChildren;

function SignInFormProvider() {
  const { methods, onHandleSubmit, loading, errors } = useSignInForm();
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full min-w-full z-10">
          <div className="flex flex-col justify-between gap-3 h-full relative">
            <div className="flex flex-col gap-3">
              <LoginForm />
              <div className="w-full flex flex-col gap-3 items-center">
                <div>
                  {errors && (
                    <ul>
                      {errors.map((el, index) => (
                        <li
                          className="text-sm text-red-600 dark:text-red-500"
                          key={index}
                        >
                          {el.longMessage}
                        </li>
                      ))}
                    </ul>
                  )}{" "}
                </div>
                <SubmitButton
                  loading={loading}
                  text="Login"
                  className="w-full"
                />
                <div className="text-sm self-end leading-5">
                  <Link
                    href="/auth/forgot-password"
                    className="font-bold text-md tracking-wide text-primary mt-4"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <p className="absolute left-1/2 -translate-x-[50%] bottom-[10%] text-muted-foreground text-sm md:text-md">
            Don’t have an account yet?{" "}
            <Link
              href="/auth/sign-up"
              className="tracking-wide font-bold text-primary text-md pl-2"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
}

export default SignInFormProvider;
