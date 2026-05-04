import Header from "@/components/templates/Header/Header";
import Footer from "@/components/templates/Footer/Footer";
import GlobalModals from "@/components/helper/GlobalModals/GlobalModals";
import ScrollTop from "@/components/ui/ScrollTop/ScrollTop";
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
