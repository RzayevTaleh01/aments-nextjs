import { MainLayout } from "@/components/layouts";
import styles from "./AuthLayout.module.scss";

export default function AuthLayout({ children }) {
  return (
    <MainLayout>
      <div className={styles.scope}>{children}</div>
    </MainLayout>
  );
}
