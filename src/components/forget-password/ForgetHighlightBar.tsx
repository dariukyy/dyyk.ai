// import { useAuthContext } from "@/context/use-auth-context";
import { cn } from "@/lib/utils";

type Props = { successfulCreation: boolean };

const ForgetHighlightBar = ({ successfulCreation }: Props) => {
  // const { forgotPasswordStep } = useAuthContext();

  return (
    <div className="grid grid-cols-2 gap-3">
      <div
        className={cn(
          "rounded-full h-2 col-span-1",
          !successfulCreation ? "bg-orange" : "bg-platinum"
        )}
      ></div>
      <div
        className={cn(
          "rounded-full h-2 col-span-1",
          successfulCreation ? "bg-orange" : "bg-platinum"
        )}
      ></div>
    </div>
  );
};

export default ForgetHighlightBar;
