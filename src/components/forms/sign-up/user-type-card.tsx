"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";

type UserTypeCardProps = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: Dispatch<SetStateAction<"owner" | "student">>;
};
function UserTypeCard({
  value,
  title,
  text,
  register,
  userType,
  setUserType,
}: UserTypeCardProps) {
  return (
    <Label htmlFor={value}>
      <Card
        className={cn(
          "w-full cursor-pointer bg-card shadow-md mb-2",
          userType == value && "border-orange"
        )}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={cn(
                "flex justify-center p-3",
                userType == value && "border-orange"
              )}
            >
              <User
                size={30}
                className={cn(
                  userType == value ? "text-orange" : "text-gray-400"
                )}
              />
            </Card>
            <div>
              <CardDescription className="text-iridium">
                {title}
              </CardDescription>
              <CardDescription className="text-gray-400">
                {text}
              </CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                "w-4 h-4 rounded-full",
                userType == value ? "bg-orange" : "bg-transparent"
              )}
            >
              <Input
                {...register("type", {
                  onChange: (e) => setUserType(e.target.value),
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
}

export default UserTypeCard;
