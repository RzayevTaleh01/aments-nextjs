"use client";

import { cn } from "@/utils/cn";

export default function CheckboxGroup(props) {
  const { children, label, className } = props;

  return (
    <div className={cn(className)}>
      {label ? <div className="mb-2 fw-semibold">{label}</div> : null}
      <div className="d-flex flex-column gap-2">{children}</div>
    </div>
  );
}
