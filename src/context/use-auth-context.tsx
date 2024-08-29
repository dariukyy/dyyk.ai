"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type InitialValuesProps = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const InitialValues: InitialValuesProps = {
  currentStep: 1,
  setCurrentStep: () => undefined,
};

const authContext = createContext(InitialValues);

const { Provider } = authContext;

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(
    InitialValues.currentStep
  );
  const values = {
    currentStep,
    setCurrentStep,
  };

  return <Provider value={values}>{children}</Provider>;
}

export function useAuthContext() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}
