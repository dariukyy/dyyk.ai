"use client";
import { useThemeMode } from "@/hooks/settings/use-settings";
import React, { useEffect, useState } from "react";
import Section from "../section-label";
import { cn } from "@/lib/utils";
import { SystemMode } from "../themes-placeholder/systemmode";
import { LightMode } from "../themes-placeholder/lightmode";
import { DarkMode } from "../themes-placeholder/darkmode";

type Props = {};

const DarkModetoggle = (props: Props) => {
  const { setTheme, theme } = useThemeMode();
  const [storedTheme, setStoredTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setStoredTheme(savedTheme);
  }, [theme]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1 lg:border-r lg:pr-3">
        <Section
          label="Interface Theme"
          message="Select or customize your UI theme "
        />
      </div>
      <div className="md:col-span-2 lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            storedTheme == "dark" && "border-orange"
          )}
          onClick={() => setTheme("dark")}
        >
          <SystemMode />
        </div>
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            storedTheme == "light" && "border-orange"
          )}
          onClick={() => setTheme("light")}
        >
          <LightMode />
        </div>
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            storedTheme == "system" && "border-orange"
          )}
          onClick={() => setTheme("system")}
        >
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default DarkModetoggle;
