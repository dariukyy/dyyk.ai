import { DotPatternDemo } from "@/components/backgrounds/DottPaternBg";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await currentUser();

  if (user) redirect("/");

  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-full lg:w-[600px] flex items-start justify-center relative">
        <DotPatternDemo />
        <Image
          className="bg-transparent  absolute top-6 left-6 z-10"
          src="/images/logo.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: "20%",
            height: "auto",
          }}
          width={0}
          height={0}
        />

        <div className="z-10 h-full w-[600px] p-6">{children}</div>
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-[4000px] overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi, I&apos;m your AI powered sales assistant, Dyyk!
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          Dyyk is capable of capturing lead information without a form... <br />
          something never done before 🙂
        </p>
        <Image
          src="/images/app-ui.png"
          alt="Hero image"
          loading="lazy"
          sizes="30"
          className="absolute shrink-0 !w-[1600px] top-48"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
}

export default Layout;
