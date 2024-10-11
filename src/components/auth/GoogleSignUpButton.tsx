"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import GoogleLogo from "../../../public/google.svg";
import { Button } from "../ui/button";

export default function GoogleButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" className="w-full" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GoogleLogo} className="size-5 mr-2" alt="Google Logo" />
          Sign Up With Google
        </Button>
      )}
    </>
  );
}
