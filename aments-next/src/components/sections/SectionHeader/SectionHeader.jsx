import { cn } from "@/utils/cn";
import styles from "./SectionHeader.module.scss";

export default function SectionHeader({ title, right, className }) {
  return (
    <div className={cn(styles.scope, "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", className)}>
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

