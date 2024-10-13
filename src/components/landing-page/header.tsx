"use client";

import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import Drawer from "./drawer";
import { Icons } from "./icons";
import Menu from "./menu";

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="relative sticky top-0 z-50 bg-background/60 py-2 backdrop-blur">
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="h-[40px] w-auto" />
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center ">
            <nav className="mr-10">
              <Menu />
            </nav>

            <div className="flex gap-2">
              {userId === null || undefined ? (
                <Link
                  href="/auth/sign-in"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Login
                </Link>
              ) : (
                <SignOutButton>
                  <Button variant="outline">Signout</Button>
                </SignOutButton>
              )}

              <Link
                href={`${
                  userId === null || undefined ? "/auth/sign-up" : "/dashboard"
                } `}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex w-full gap-2 text-background sm:w-auto"
                )}
              >
                <Icons.logo className="size-6" />
                {userId === null || undefined
                  ? `Get Started for Free`
                  : "Dashboard"}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-2 block cursor-pointer lg:hidden">
          <Drawer />
        </div>
      </div>
      <hr
        className={cn(
          "absolute bottom-0 w-full transition-opacity duration-300 ease-in-out",
          addBorder ? "opacity-100" : "opacity-0"
        )}
      />
    </header>
  );
}
