import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CornerDownLeft } from "lucide-react";
import Link from "next/link";

function MeetingBookingForm({ dateParams }: { dateParams: string }) {
  return (
    <form className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" placeholder="Your Name..." />
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Your Email</Label>
          <Input id="email" placeholder="johndoe@example.com" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Got any details or questions? Share them here! (optional)"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 mt-6">
        <SubmitButton text="Book Meeting" className="w-full" />
      </div>
    </form>
  );
}

export default MeetingBookingForm;
