import OTPInput from "@/components/otp";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type OTPFormProps = {
  onOTP: string;
  setOTP: any;
  onAuth?: boolean;
};

function OTPForm({ onOTP, setOTP, onAuth }: OTPFormProps) {
  if (onAuth)
    return (
      <div className="flex justify-center items-center my-2">
        <OTPInput otp={onOTP!} onAuth setOtp={setOTP!} />
      </div>
    );
  return (
    <>
      <h2 className="text-gravel text-3xl ,md:text-4xl text-center font-bold mb-4">
        Enter OTP
      </h2>
      <p className="text-muted-foreground text-center text-sm md:text-md">
        Enter the one time password that was send to your email
      </p>
      <div className="w-full justify-center flex py-5 z-10">
        <OTPInput otp={onOTP!} setOtp={setOTP!} />
      </div>
    </>
  );
}

export default OTPForm;
