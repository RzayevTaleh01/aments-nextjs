import {
  BannerSidebar,
  HeroHome2,
  ProductTabsSection,
  CompanyLogoSection,
  BlogFeedSection,
} from "@/components/sections";
import { products } from "@/constants/products";
import { companyLogos, home2HeroSlides, home2SidebarBanners, homeBlogFeed } from "@/constants/home";
import styles from "./HomePage2.module.scss";

export default function HomePage2() {
  return (
    <div className={styles.scope}>
      <div className="banner-and-hero-area-section">
        <div className="container">
          <div className="row flex-column-reverse flex-lg-row">
            <div className="col-lg-4">
              <BannerSidebar banners={home2SidebarBanners} />
            </div>
            <div className="col-lg-8">
              <HeroHome2 slides={home2HeroSlides} />
            </div>
          </div>
        </div>
      </div>

      <ProductTabsSection
        title="New Arrivals"
        tabs={[
          { id: "car_and_drive", label: "Car & Drive", products },
          { id: "motorcycle", label: "Motorcycle", products },
          { id: "truck_drive", label: "Truck & Drive", products },
        ]}
      />
      <CompanyLogoSection logos={companyLogos} />
      <BlogFeedSection posts={homeBlogFeed} />
    </div>
  );
}
