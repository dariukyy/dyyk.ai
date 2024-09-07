import { onLoginUser } from "@/actions/auth";
import SideBar from "@/components/sidebar";
import { ChatProvider } from "@/context/user-chat-context";
import { PrimeReactProvider } from "primereact/api";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

async function OwnerLayout({ children }: Props) {
  const authenticated = await onLoginUser();
  if (!authenticated) return null;
  return (
    <PrimeReactProvider>
      <ChatProvider>
        <div className="flex h-screen w-full">
          <SideBar domains={authenticated.domain} />
          <div className="w-full overflow-x-hidden h-screen flex flex-col pb-5 pl-20 px-5 md:pl-4">
            {children}
          </div>
        </div>
      </ChatProvider>
    </PrimeReactProvider>
  );
}

export default OwnerLayout;
