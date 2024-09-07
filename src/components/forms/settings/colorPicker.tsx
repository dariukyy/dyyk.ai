"use client";
import Section from "@/components/section-label";
import { useState } from "react";
import { ColorPicker as ColorPickerComponent } from "primereact/colorpicker";

function ColorPicker() {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  console.log(backgroundColor);
  return (
    <div className="flex flex-col gap-5 items-start">
      <Section label="Colors" message="Choose the colors that suit you best" />

      <div className="flex justify-center items-center gap-8 mt-4">
        <ColorPickerComponent
          inputClassName="w-10 h-10 rounded-md border-none shadow-md focus:outline-none"
          format="hex"
          color={backgroundColor}
          onChange={(e) => setBackgroundColor(e.value as string)}
        />
        <Section message="Chat Bot background color" />
      </div>
      <div className="flex justify-center items-center gap-8">
        <ColorPickerComponent
          inputClassName="w-10 h-10 rounded-md border-none shadow-md focus:outline-none"
          format="hex"
          color={textColor}
          onChange={(e) => setTextColor(e.value as string)}
        />
        <Section message="Chat Bot text color" />
      </div>
    </div>
  );
}

export default ColorPicker;
