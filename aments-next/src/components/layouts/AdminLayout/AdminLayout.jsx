import { cn } from "@/utils/cn";
import styles from "./AdminLayout.module.scss";

export default function AdminLayout({ children }) {
  return <div className={cn(styles.scope, "min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50")}>{children}</div>;
}

