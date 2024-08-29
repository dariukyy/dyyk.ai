import OTPInput from "@/components/otp";
import { Dispatch, SetStateAction } from "react";

type OTPFormProps = {
  onOTP: string;
  setOTP: Dispatch<SetStateAction<string>>;
};

function OTPForm({ onOTP, setOTP }: OTPFormProps) {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Enter OTP</h2>
      <p className="text-iridium md:text-sm">
        Enter the one time password that was send to your email.
      </p>
      <div className="w-full justify-center flex py-5">
        <OTPInput otp={onOTP} setOtp={setOTP} />
      </div>
    </>
  );
}

export default OTPForm;
