import { onLoginUser } from "@/actions/auth";
import { ChatProvider } from "@/context/use-chat-context";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

async function OwnerLayout({ children }: Props) {
  const authenticated = await onLoginUser();
  if (!authenticated) return null;
  return (
    <ChatProvider>
      <div className="flex h-screen w-full"></div>
    </ChatProvider>
  );
}

export default OwnerLayout;
