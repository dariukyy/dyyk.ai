"use client";

import { cn } from "@/lib/utils";
import DotPattern from "../ui/dot-pattern";
import { ReactNode } from "react";

export function DotPatternDemo({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex-1 h-full w-full items-center justify-center overflow-hidden bg-background">
      {children}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(480px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}
