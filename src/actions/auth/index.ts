"use server";

import { client } from "@/lib/prisma";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { onGetAllAccountDomains } from "../settings";
import { redirect } from "next/navigation";

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },

        availability: {
          createMany: {
            data: [
              { day: "Monday", fromTime: "08:00", tillTime: "17:00" },
              { day: "Tuesday", fromTime: "08:00", tillTime: "17:00" },
              { day: "Wednesday", fromTime: "08:00", tillTime: "17:00" },
              { day: "Thursday", fromTime: "08:00", tillTime: "17:00" },
              { day: "Friday", fromTime: "08:00", tillTime: "17:00" },
              { day: "Saturday", fromTime: "08:00", tillTime: "17:00" },
              { day: "Sunday", fromTime: "08:00", tillTime: "17:00" },
            ],
          },
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (registered) {
      return { status: 200, user: registered };
    }

    redirect("/dashboard");
  } catch (error) {
    return { status: 400 };
  }
};

export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) redirectToSignIn();
  else {
    try {
      const authenticated = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          fullname: true,
          id: true,
          type: true,
        },
      });
      if (authenticated) {
        const domains = await onGetAllAccountDomains();
        return { status: 200, user: authenticated, domain: domains?.domains };
      }

      if (authenticated) {
        redirect("/dashboard");
      }
    } catch (error) {
      return { status: 400 };
    }
  }
};
