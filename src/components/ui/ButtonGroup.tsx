"use client";

import { cn } from "@/lib/utils";
import { Children, cloneElement, ReactElement } from "react";
import { ButtonProps } from "./button";

type ButtonGroupProps = {
  className?: string;
  children: ReactElement<ButtonProps>[];
};

function ButtonGroup({ className, children }: ButtonGroupProps) {
  const totalButtons = Children.count(children);
  return (
    <div className={cn("flex w-full", children)}>
      {children.map((child, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === totalButtons - 1;

        return cloneElement(child, {
          key: child.key || index,
          className: cn(
            {
              "rounded-l-none": !isFirstItem,
              "rounded-r-none": !isLastItem,
              "border-l-0": !isFirstItem,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
}

export default ButtonGroup;
