"use server";

import { client } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const onGetDomainProductsAndConnectedAccountId = async (id: string) => {
  try {
    const connectedAccount = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        User: {
          select: {
            stripeId: true,
          },
        },
      },
    });

    const products = await client.product.findMany({
      where: {
        domainId: id,
      },
      select: {
        price: true,
        name: true,
        image: true,
      },
    });

    if (products) {
      const totalAmount = products.reduce((current, next) => {
        return current + next.price;
      }, 0);
      return {
        products: products,
        amount: totalAmount,
        stripeId: connectedAccount?.User?.stripeId,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetStripeDashboardLink = async () => {
  const user = await currentUser();
  console.log(user);

  if (!user) {
    throw new Error("User not found");
  }
  const connectedAccount = await client.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      stripeId: true,
    },
  });

  const loginLink = await stripe.accounts.createLoginLink(
    connectedAccount?.stripeId as string
  );

  console.log(loginLink.url);
  return redirect(loginLink.url);
};
