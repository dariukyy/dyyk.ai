"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export async function onGetAppointmentByInfo(url: string, fullName: string) {
  const user = await currentUser();
  if (!user) return;

  const data = await client.eventType.findFirst({
    where: {
      url: url,
      User: {
        fullname: fullName,
      },
      active: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          fullname: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) return notFound();

  return data;
}

export async function onGetAvailabilityTime(
  fullname: string,
  selectedDate: string
) {
  const user = await currentUser();

  if (!user) return notFound();

  try {
    const data = await client.availability.findFirst({
      where: {
        day: selectedDate as Prisma.EnumDayFilter,
        User: {
          fullname: fullname,
          clerkId: user.id,
        },
      },
      select: {
        fromTime: true,
        tillTime: true,
        id: true,
      },
    });

    //WIP implement, check in google calendar from which time to which time the user is available on the selected date

    return data;
  } catch (error) {
    console.error(error);
  }
}
