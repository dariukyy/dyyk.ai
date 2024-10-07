"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function onGetUserAvailability(clerkId: string) {
  const user = await currentUser();
  if (!user) return;

  try {
    const availabilities = await client.user.findUnique({
      where: {
        clerkId,
      },
      select: {
        availability: {
          select: {
            id: true,
            day: true,
            createdAt: true,
            updatedAt: true,
            fromTime: true,
            tillTime: true,
            isActive: true,
          },
        },
      },
    });

    if (availabilities) {
      return availabilities.availability;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function onUpdateUserAvalability(formData: FormData) {
  const user = await currentUser();
  if (!user) return;
  const rawData = Object.fromEntries(formData.entries());

  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");

      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await client.$transaction(
      availabilityData.map((item) =>
        client.availability.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
            updatedAt: new Date(),
          },
        })
      )
    );

    // WIP: change it later
    revalidatePath("/availability");
  } catch (error) {
    console.error(error);
  }
}
