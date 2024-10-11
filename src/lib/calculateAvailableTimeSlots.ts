import { addMinutes, format, isAfter, isBefore, parse } from "date-fns";

export function calculateAvailabaleTimeSlots(
  date: string,
  dbAvailability: {
    fromTime: string | undefined;
    tillTime: string | undefined;
  },
  duration: number
) {
  const now = new Date();

  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  const availableTill = parse(
    `${date} ${dbAvailability.tillTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  //WIP return busy hours from google calendar

  const allSlots = [];
  let currentSlot = availableFrom;
  while (isBefore(currentSlot, availableTill)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }

  //wip combine with google calendar to generate free slots
  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);

    return isAfter(slot, now);
    //   &&
    //   !busySlots.some(
    //     (busy: { start: any; end: any }) =>
    //       (!isBefore(slot, busy.start) && !isAfter(slotEnd, busy.end)) ||
    //       (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) ||
    //       (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
    //   )
  });

  return freeSlots.map((slot) => format(slot, "HH:mm"));
}
