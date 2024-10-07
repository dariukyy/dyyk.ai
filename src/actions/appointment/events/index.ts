"use server";

import { client } from "@/lib/prisma";
import { eventTypeSchema } from "@/schemas/event.schema";
import { currentUser } from "@clerk/nextjs";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function onGetAllUserEvents(clerkId: string) {
  if (!clerkId) return;

  try {
    const events = await client.user.findUnique({
      where: {
        clerkId,
      },
      select: {
        fullname: true,
        EventType: {
          select: {
            id: true,
            title: true,
            duration: true,
            url: true,
            description: true,
            active: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (events) {
      console.log(events, "EVENT!");
      return events;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function onCreateEventType(prevState: any, formData: FormData) {
  const user = await currentUser();
  if (!user) return;

  const userId = await client.user.findUnique({
    where: {
      clerkId: user?.id,
    },
    select: {
      id: true,
    },
  });

  const submission = parseWithZod(formData, { schema: eventTypeSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await client.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware,
      userId: userId?.id,
    },
  });

  return redirect("/availability/events");
}

export async function updateEventTypeStatusAction(
  prevState: any,
  { isChecked, eventTypeId }: { isChecked: boolean; eventTypeId: string }
) {
  try {
    await client.eventType.update({
      where: {
        id: eventTypeId,
      },
      data: {
        active: isChecked,
      },
    });

    return {
      status: "success",
      message: isChecked
        ? "Event type is now active."
        : "Event type is now inactive.",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to update event type status.",
    };
  }
}
