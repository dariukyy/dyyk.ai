import { onGetAppointmentByInfo } from "@/actions/appointment/bookings";
import { GridPatternDemo } from "@/components/backgrounds/GridPattern";

import SeparatorBasedOnScreenSize from "@/components/separator/SeparatorBasedOnScreenSize";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";
import { CalendarX2, Clock, CornerDownLeft, VideoIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, lazy } from "react";

const TimeTable = lazy(() => import("@/components/forms/portal/TimeTable"));
const RenderCalendar = lazy(
  () => import("@/components/forms/portal/RenderCalendar")
);
const MeetingBookingForm = dynamic(
  () => import("@/components/forms/portal/MeetingBookingForm"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col gap-4">
        <Skeleton className="w-1/2 h-[2rem] md:h-8" />
        <Skeleton className="w-3/5 h-[2rem] md:h-8" />
        <Skeleton className="w-5/6 h-[7rem] md:w-full md:h-[11rem]" />
      </div>
    ),
  }
);

async function BookingFormPage({
  params,
  searchParams,
}: {
  params: { fullName: string; url: string };
  searchParams: { date?: string; time?: string };
}) {
  const user = await currentUser();
  const data = await onGetAppointmentByInfo(params.url, params.fullName);

  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(selectedDate);

  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className="min-h-screen w-screen flex items-start md:items-center justify-center p-0 md:p-6">
      {showForm ? (
        <Card className="w-full max-w-[800px]">
          <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr] gap-4">
            <div className="flex flex-col justify-between">
              <div>
                <Avatar>
                  <AvatarImage
                    src={user?.imageUrl}
                    alt={`${params.fullName} image`}
                  />
                  <AvatarFallback>
                    <Skeleton className="aspect-square h-full w-full" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium text-muted-foreground mt-1">
                  {data?.User?.fullname}
                </p>
                <h1 className="text-xl font-semibold mt-2">{data?.title}</h1>
                <p className="text-sm font-medium text-muted-foreground">
                  {data?.description}
                </p>
                <div className="mt-5 flex flex-col gap-y-3">
                  <p className="flex items-center">
                    <CalendarX2 className="size-4 mr-2 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {formattedDate}, at {searchParams.time}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <Clock className="size-4 mr-2 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {data?.duration === 60
                        ? "1 Hour"
                        : data?.duration.toString() + " " + "Minutes"}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <VideoIcon className="size-4 mr-2 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {data?.videoCallSoftware}
                    </span>
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild className="w-full my-6 sm:my-0">
                <Link href={`?date=${searchParams.date}`}>
                  <div className="flex justify-center items-center gap-2">
                    <CornerDownLeft className="size-4" />
                    <span>Go Back</span>
                  </div>
                </Link>
              </Button>
            </div>

            <SeparatorBasedOnScreenSize />

            <MeetingBookingForm dateParams={searchParams.date as string} />
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-[1000px] w-full mx-auto">
          <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
            <div>
              <Avatar>
                <AvatarImage
                  src={user?.imageUrl}
                  alt={`${params.fullName} image`}
                />
                <AvatarFallback>
                  <Skeleton className="aspect-square h-full w-full" />
                </AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data?.User?.fullname}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data?.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data?.description}
              </p>
              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data?.duration === 60
                      ? "1 Hour"
                      : data?.duration.toString() + " " + "Minutes"}
                  </span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data?.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            <SeparatorBasedOnScreenSize />

            <RenderCalendar availability={data?.User?.availability!} />

            <SeparatorBasedOnScreenSize />
            <Suspense
              fallback={
                <div
                  className="w-full h-full flex flex-col justify-start items-start gap-3 p-3
          "
                >
                  <Skeleton className="w-2/6 h-8" />
                  <Skeleton className="w-full h-8" />
                  <Skeleton className="w-full h-8" />
                  <Skeleton className="w-full h-8" />
                  <Skeleton className="w-full h-8" />
                </div>
              }
              key={searchParams.date}
            >
              <TimeTable
                fullname={data?.User?.fullname as string}
                selectedDate={selectedDate}
                duration={data?.duration as number}
              />
            </Suspense>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default BookingFormPage;
