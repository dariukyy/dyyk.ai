import { onGetAvailabilityTime } from "@/actions/appointment/bookings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { calculateAvailabaleTimeSlots } from "@/lib/calculateAvailableTimeSlots";
import { format } from "date-fns";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

type TimeTableProps = {
  selectedDate: Date;
  fullname: string;
  duration: number;
};

async function TimeTable({ selectedDate, fullname, duration }: TimeTableProps) {
  const currentDay = format(selectedDate, "EEEE");
  const data = await onGetAvailabilityTime(fullname, currentDay);

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const dbAvailability = {
    fromTime: data?.fromTime,
    tillTime: data?.tillTime,
  };
  const availableSlots = calculateAvailabaleTimeSlots(
    formattedDate,
    dbAvailability,
    duration
  );

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}.{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>

      <div className="mt-3 max-h-[300px] overflow-y-auto">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Link
              key={index}
              href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
            >
              <Button variant="outline" className="w-full mb-2">
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <Alert className="bg-secondary space-y-1">
            <div className="flex justify-start md:flex-col md:items-start items-center gap-2">
              <TriangleAlert className="size-5 stroke-primary" />
              <AlertTitle className="text-base font-medium">
                Date fully booked!
              </AlertTitle>
            </div>
            <AlertDescription className="text-muted-foreground text-sm">
              No time slots are open for this date. Please pick another day.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default TimeTable;
