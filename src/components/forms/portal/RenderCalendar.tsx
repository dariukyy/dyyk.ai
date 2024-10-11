"use client";

import { Spinner } from "@/components/spinner";
import dynamic from "next/dynamic";
import {
  today,
  getLocalTimeZone,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
// import Calendar from "./Calendar";

type CalendarProps = { availability: { day: string; isActive: boolean }[] };

const Calendar = dynamic(() => import("./Calendar"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col gap-4">
      <Skeleton className="w-1/2 h-[2rem] md:h-8" />
      <Skeleton className="w-3/5 h-[2rem] md:h-8" />
      <Skeleton className="w-5/6 h-[7rem] md:w-full md:h-[11rem]" />
    </div>
  ),
});

function RenderCalendar({ availability }: CalendarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [date, setDate] = useState(() => {
    const dateParam = searchParams.get("date");

    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  });

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      setDate(parseDate(dateParam));
    }
  }, [searchParams]);

  function handleDateChange(date: DateValue) {
    setDate(date as CalendarDate);

    const url = new URL(window.location.href);

    url.searchParams.set("date", date.toString());
    router.push(url.toString());
  }

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    // Adjust the index to match the daysofWeek array
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return !availability[adjustedIndex].isActive;
  };

  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      value={date}
      onChange={handleDateChange}
    />
  );
}

export default RenderCalendar;
