"use client";

import Drawer from "./drawer";
import { Icons } from "./icons";
import Menu from "./menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);

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
              <Link
                href="/auth/sign-in"
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
              <Link
                href="auth//sign-up"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex w-full gap-2 text-background sm:w-auto"
                )}
              >
                <Icons.logo className="size-6" />
                Get Started for Free
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
