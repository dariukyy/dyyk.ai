"use client";

import { Icons } from "./icons";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Section from "./section";
import { useAuth } from "@clerk/nextjs";
import PulsatingButton from "../ui/pulsating-button";

export default function CtaSection() {
  const { userId } = useAuth();

  return (
    <Section
      id="cta"
      title="Ready to get started?"
      subtitle="Start your free trial today."
      className="rounded-xl bg-primary/10 py-16"
    >
      <div className="flex w-full flex-col items-center justify-center space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <PulsatingButton className="p-0">
          <Link
            href={`${
              userId === null || undefined ? "/auth/sign-up" : "/dashboard"
            }`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex w-full gap-2 text-background sm:w-auto"
            )}
          >
            <Icons.logo className="size-6" />
            {userId === null || undefined
              ? "Get started for free"
              : "Go To Dashboard"}
          </Link>
        </PulsatingButton>
      </div>
    </Section>
  );
}
