"use client";

import { onCreateEventType } from "@/actions/appointment/events";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { eventTypeSchema } from "@/schemas/event.schema";
import { parseWithZod } from "@conform-to/zod";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

function NewEventPage() {
  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>("Google Meet");

  const [lastResult, action] = useFormState(onCreateEventType, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventTypeSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function togglePlatform(platform: VideoCallProvider) {
    setActivePlatform(platform);
  }

  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>
            Create new appointment type that allows people to book you!
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-6">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                id="title"
                placeholder="30 Minute Meeting"
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="urlSlug">URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Dariukyy.com/
                </span>
                <Input
                  name={fields.url.name}
                  key={fields.url.key}
                  defaultValue={fields.url.initialValue}
                  id="urlSlug"
                  className="rounded-l-none"
                  placeholder="Example-url-1"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.url.errors}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={fields.description.initialValue}
                id="description"
                placeholder="This is a 30 minute meeting with me for discussing your project."
              />
              <p className="text-red-500 text-sm">
                {fields.description.errors}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={fields.duration.initialValue}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="45">45 Minutes</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.duration.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />

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
                    activePlatform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                  type="button"
                  className="w-full"
                  onClick={() => togglePlatform("Microsoft Teams")}
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              <p className="text-red-500 text-sm">
                {fields.videoCallSoftware.errors}
              </p>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between mt-3">
            <Button variant="secondary" asChild>
              <Link href="/availability/events">Cancel</Link>
            </Button>
            <SubmitButton text="Create Event Type" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default NewEventPage;
