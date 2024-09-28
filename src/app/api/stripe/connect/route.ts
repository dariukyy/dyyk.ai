//WIP create connection to stripe account

import { client } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    console.log(user, "USER IN GET <-----=");

    if (!user) return new NextResponse("User not authenticated");

    const account = await stripe.accounts.create({
      email: user.emailAddresses[0].emailAddress as string,
      controller: {
        losses: {
          payments: "application",
        },
        fees: {
          payer: "application",
        },
        stripe_dashboard: {
          type: "express",
        },
      },
    });

    console.log(account.id, "ACCOUNT ID <-----=");

    if (account) {
      const saveAccountId = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          stripeId: account.id,
        },
        select: {
          stripeId: true,
        },
      });

      if (saveAccountId) {
        const accountLink = await stripe.accountLinks.create({
          account: saveAccountId.stripeId as string,
          refresh_url: "http://localhost:3000/integration",
          return_url: "http://localhost:3000/integration",
          type: "account_onboarding",
        });

        return NextResponse.json({
          url: accountLink.url,
        });
      }
    }
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_CONNECT_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  switch (event.type) {
    case "account.updated": {
      const account = event.data.object;

      const data = await client.user.update({
        where: {
          stripeId: account.id,
        },
        data: {
          stripeConnectedLinked:
            account.capabilities?.transfers === "pending" ||
            account.capabilities?.transfers === "inactive"
              ? false
              : true,
        },
        select: {
          stripeConnectedLinked: true,
        },
      });
      console.log(data, "DATA <-----=");
      break;
    }
    default: {
      console.log("unhandled event");
    }
  }

  return new Response("Webhook received", { status: 200 });
}
