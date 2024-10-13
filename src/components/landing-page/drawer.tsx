import { Icons } from "./icons";
import { buttonVariants } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function drawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <div className="">
            <Link
              href="/"
              title="brand-logo"
              className="relative mr-6 flex items-center space-x-2"
            >
              <Icons.logo className="h-[40px] w-auto" />
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
          </div>
          <nav>
            <ul className="mt-7 text-left">
              {siteConfig.header.map((item, index) => (
                <li key={index} className="my-3">
                  {item.trigger ? (
                    <span className="font-semibold">{item.trigger}</span>
                  ) : (
                    <Link href={item.href || ""} className="font-semibold">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </DrawerHeader>
        <DrawerFooter>
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
          <Link
            href="/auth/sign-up"
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex w-full gap-2 text-background sm:w-auto"
            )}
          >
            <Icons.logo className="size-6" />
            Get Started for Free
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
