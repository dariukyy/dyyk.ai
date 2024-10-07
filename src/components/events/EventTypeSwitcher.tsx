"use client";

import { updateEventTypeStatusAction } from "@/actions/appointment/events";
import { Switch } from "@/components/ui/switch";
import { useEffect, useTransition } from "react";
import { useFormState } from "react-dom";

import toast from "react-hot-toast";

export function MenuActiveSwitcher({
  initialChecked,
  eventTypeId,
}: {
  eventTypeId: string;
  initialChecked: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useFormState(updateEventTypeStatusAction, undefined);

  useEffect(() => {
    if (state?.status === "success") {
      // toast({
      //   variant: "default",
      //   title: "Success",
      //   description: state.message,
      // });
      toast.success(state.message);
    } else if (state?.status === "error") {
      // toast({
      //   variant: "destructive",
      //   title: "Uh oh! Something went wrong.",
      //   description: state.message,
      // });
      toast.success(state.message);
    }
  }, [state]);

  return (
    <Switch
      defaultChecked={initialChecked}
      disabled={isPending}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            isChecked: isChecked,
            eventTypeId,
          });
        });
      }}
    />
  );
}
