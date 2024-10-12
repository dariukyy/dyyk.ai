"use client";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";

type TypeSelectionFormProps = {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: Dispatch<SetStateAction<"owner" | "student">>;
};

function TypeSelectionForm({
  register,
  userType,
  setUserType,
}: TypeSelectionFormProps) {
  return (
    <>
      <h2 className="text-gravel text-3xl md:text-4xl text-center font-bold mb-4">
        Create an account
      </h2>

      <p className="text-muted-foreground text-sm md:text-md">
        Choose an option below to continue.
      </p>
   
        <UserTypeCard
          register={register}
          setUserType={setUserType}
          userType={userType}
          value="owner"
          title="I own a business"
          text="Setting up my account for my company."
        />
        <UserTypeCard
          register={register}
          setUserType={setUserType}
          userType={userType}
          value="student"
          title="Im a student"
          text="Looking to learn about the tool."
        />
      
    </>
  );
}

export default TypeSelectionForm;
