import { MainLayout } from "@/components/layouts";
import styles from "./DashboardLayout.module.scss";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.scope}>
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
