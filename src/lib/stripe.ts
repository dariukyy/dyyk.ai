import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2024-06-20",
});
