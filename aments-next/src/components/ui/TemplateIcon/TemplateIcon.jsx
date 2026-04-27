"use client";

import * as FaIcons from "react-icons/fa";
import { cn } from "@/utils/cn";
import styles from "./TemplateIcon.module.scss";

export default function Icon({ name, className, ...props }) {
  const IconComponent = FaIcons[name];
  if (!IconComponent) return null;

  return <IconComponent {...props} className={cn(styles.scope, className)} />;
}
