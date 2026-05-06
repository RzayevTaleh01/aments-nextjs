"use client";

import { cn } from "@/utils/cn";

export default function FormGroup(props) {
  const { children, className, full, align } = props;

  return (
    <div
      className={cn(
        className,
        align === "end" && "d-flex align-items-end",
        full && "h-100"
      )}
    >
      {children}
    </div>
  );
}
