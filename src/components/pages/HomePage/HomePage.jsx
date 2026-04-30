import {
  HeroHome1,
  PopularCategoriesSection,
  BannerSection,
  ProductTabsSection,
  CompanyLogoSection,
} from "@/components/sections";
import { products } from "@/constants/products";
import { companyLogos, home1HeroSlides, homeBanners, popularCategories as fallbackPopularCategories } from "@/constants/home";

export default function HomePage({ popularCategories }) {
  const categories = popularCategories?.length ? popularCategories : fallbackPopularCategories;

  return (
    <>
      <HeroHome1 slides={home1HeroSlides} />
      <PopularCategoriesSection categories={categories} />
      <BannerSection banners={homeBanners} />
      <ProductTabsSection
        title="Products"
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
