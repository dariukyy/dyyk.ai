"use client";

import {
  onCreateEventType,
  onEditEventType,
} from "@/actions/appointment/events";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { eventTypeSchema } from "@/schemas/event.schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { DialogClose } from "../ui/dialog";
import { EVENTS_THEME_OPTIONS } from "@/constants/events";

interface EditEventComponent {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
  themeColor: string;
}
type ThemeColor = "#13C38B" | "#F34F4F" | "#4F75F3" | "#FF7D4F";

type Platform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export function EditEventComponent({
  description,
  duration,
  title,
  url,
  callProvider,
  id,
  themeColor,
}: EditEventComponent) {
  const [lastResult, action] = useFormState(onEditEventType, undefined);
  const [ThemeColor, setThemeColor] = useState<ThemeColor>(
    themeColor as ThemeColor
  );
  const closeRef = useRef<HTMLButtonElement>(null);

  const [form, fields] = useForm({
    // Sync the result of last submission

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventTypeSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [activePlatform, setActivePlatform] = useState<Platform>(
    callProvider as Platform
  );

  useEffect(() => {
    if (closeRef.current && lastResult !== undefined) {
      closeRef.current.click();
      toast.success(`Event "${title}" edited successfully!`);
    }
  }, [lastResult, closeRef, title]);

  const togglePlatform = (platform: Platform) => {
    setActivePlatform(platform);
  };
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <form
        className="w-full mt-4"
        noValidate
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
      >
        <input type="hidden" name="id" value={id} />
        <div className="grid gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name={fields.title.name}
              key={fields.title.key}
              defaultValue={title}
              placeholder="30 min meeting"
            />
            <p className="text-red-500 text-sm">{fields.title.errors}</p>
          </div>

          <div className="grid gap-y-2 ">
            <Label>Url</Label>
            <div className="flex rounded-md">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                Dariukyy.com/
              </span>
              <Input
                type="text"
                key={fields.url.key}
                defaultValue={url}
                name={fields.url.name}
                placeholder="example-user-1"
                className="rounded-l-none"
              />
            </div>

            <p className="text-red-500 text-sm">{fields.url.errors}</p>
          </div>

          <div className="grid gap-y-2">
            <Label>Description</Label>
            <Textarea
              name={fields.description.name}
              key={fields.description.key}
              defaultValue={description}
              placeholder="30 min meeting"
            />
            <p className="text-red-500 text-sm">{fields.description.errors}</p>
          </div>

          <div className="grid gap-y-2">
            <Label>Duration</Label>
            <Select
              name={fields.duration.name}
              key={fields.duration.key}
              defaultValue={String(duration)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Duration</SelectLabel>
                  <SelectItem value="15">15 Mins</SelectItem>
                  <SelectItem value="30">30 Min</SelectItem>
                  <SelectItem value="45">45 Mins</SelectItem>
                  <SelectItem value="60">1 Hour</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <p className="text-red-500 text-sm">{fields.duration.errors}</p>
          </div>

          <div className="grid gap-y-2">
            <input
              type="hidden"
              name={fields.videoCallSoftware.name}
              value={activePlatform}
            />
            <Label>Video Call Provider</Label>
            <ButtonGroup className="w-full">
              <Button
                onClick={() => togglePlatform("Zoom Meeting")}
                type="button"
                className="w-full"
                variant={
                  activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                }
              >
                Zoom
              </Button>
              <Button
                onClick={() => togglePlatform("Google Meet")}
                type="button"
                className="w-full"
                variant={
                  activePlatform === "Google Meet" ? "secondary" : "outline"
                }
              >
                Google Meet
              </Button>
              <Button
                variant={
                  activePlatform === "Microsoft Teams" ? "secondary" : "outline"
                }
                type="button"
                className="w-full"
                onClick={() => togglePlatform("Microsoft Teams")}
              >
                Microsoft Teams
              </Button>
            </ButtonGroup>
          </div>
          <Label htmlFor="theme">Theme Color</Label>
          <input
            type="hidden"
            name={fields.themeColor.name}
            value={ThemeColor}
          />
          <div className="w-full flex justify-around items-center gap-4 mb-4">
            {EVENTS_THEME_OPTIONS.map((color, index) => (
              <Button
                type="button"
                id="theme"
                onClick={() => setThemeColor(color as ThemeColor)}
                style={{
                  backgroundColor: color,
                  height: "2rem",
                  width: "2rem",
                }}
                className={`${
                  color === ThemeColor
                    ? ":outline-none ring-2 ring-ring ring-offset-2 "
                    : ""
                } rounded-lg`}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-between mt-4">
          <DialogClose asChild>
            <Button ref={closeRef} variant="secondary">
              Close
            </Button>
          </DialogClose>
          <SubmitButton text="Edit Event Type" />
        </div>
      </form>
    </div>
  );
}

export default EditEventComponent;
