import {
  HeroHome1,
  PopularCategoriesSection,
  BannerSection,
  ProductTabsSection,
  CompanyLogoSection,
} from "@/components/sections";
import { products } from "@/constants/products";
import { companyLogos, home1HeroSlides, homeBanners, popularCategories } from "@/constants/home";

export default function HomePage() {
  return (
    <>
      <HeroHome1 slides={home1HeroSlides} />
      <PopularCategoriesSection categories={popularCategories} />
      <BannerSection banners={homeBanners} />
      <ProductTabsSection
        title="New Arrivals"
        tabs={[
          { id: "car_and_drive", label: "Car & Drive", products },
          { id: "motorcycle", label: "Motorcycle", products },
          { id: "truck_drive", label: "Truck & Drive", products },
        ]}
      />
      <CompanyLogoSection logos={companyLogos} />
    </>
  );
}
