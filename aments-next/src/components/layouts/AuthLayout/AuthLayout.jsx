import { MainLayout } from "@/components/layouts";
import styles from "./AuthLayout.module.scss";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.scope}>
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
