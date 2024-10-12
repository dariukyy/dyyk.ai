import { USER_REGISTRATION_FORM } from "@/constants/forms";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenerator from "../form-generator";

type AccountDetailsFormProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

function AccountDetailsForm({ register, errors }: AccountDetailsFormProps) {
  return (
    <>
      <h2 className="text-gravel text-3xl ,md:text-4xl text-center font-bold mb-4">
        Account details
      </h2>
      <p className="text-muted-foreground text-sm md:text-md">
        Enter your email and password
      </p>
      {USER_REGISTRATION_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
          noAutocomplete={true}
        />
      ))}
    </>
  );
}

export default AccountDetailsForm;
