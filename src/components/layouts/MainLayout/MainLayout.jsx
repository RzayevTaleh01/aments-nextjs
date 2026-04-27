import { Header, Footer } from "@/components/sections";
import { GlobalModals } from "@/components/helper";
import { ScrollTop } from "@/components/ui";
import styles from "./MainLayout.module.scss";

export default function MainLayout({ children }) {
  return (
    <div className={styles.scope}>
      <Header />
      <main>{children}</main>
      <Footer />
      <GlobalModals />
      <ScrollTop />
    </div>
  );
}
