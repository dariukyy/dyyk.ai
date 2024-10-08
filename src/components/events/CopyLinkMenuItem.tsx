"use client";

import { Link2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";

interface CopyLinkMenuItemProps {
  meetingUrl: string;
}

export function CopyLinkMenuItem({ meetingUrl }: CopyLinkMenuItemProps) {
  return (
    <Button
      variant="ghost"
      className="w-full"
      onClick={() => {
        navigator.clipboard.writeText(meetingUrl);
        toast.success("Copied to clipboard");
      }}
    >
      <Link2 className="mr-2 h-4 w-4" />
      <span>Copy</span>
    </Button>
  );
}
