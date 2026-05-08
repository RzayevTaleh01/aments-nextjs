import Header from "@/components/templates/Header/Header";
import Footer from "@/components/templates/Footer/Footer";
import GlobalModals from "@/components/helper/GlobalModals/GlobalModals";
import ScrollTop from "@/components/ui/ScrollTop/ScrollTop";
import { Suspense } from "react";
import styles from "./MainLayout.module.scss";

export default function MainLayout({ children }) {
  return (
    <div className={styles.scope}>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
      <GlobalModals />
      <ScrollTop />
    </div>
  );
}
