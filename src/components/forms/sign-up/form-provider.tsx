"use client";

import { Loader } from "@/components/loader";
import { AuthContextProvider } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { ReactNode } from "react";
import { FormProvider } from "react-hook-form";

type SignUpFormProviderProps = {
  children: ReactNode;
};
function SignUpFormProvider({ children }: SignUpFormProviderProps) {
  const { methods, onHandleSubmit, loading } = useSignUpForm();

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full z-10">
          <div className="flex flex-col justify-between gap-6 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
        <div></div>
      </FormProvider>
    </AuthContextProvider>
  );
}

export default SignUpFormProvider;
