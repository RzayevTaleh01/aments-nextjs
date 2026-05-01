import {
  HeroHome1,
  PopularCategoriesSection,
  BannerSection,
  ProductTabsSection,
  CompanyLogoSection,
} from "@/components/sections";
import { products } from "@/constants/products";
import { companyLogos, home1HeroSlides, homeBanners, popularCategories as fallbackPopularCategories, homeProductTabs } from "@/constants/home";

export default function HomePage({ popularCategories }) {
  const categories = popularCategories?.length ? popularCategories : fallbackPopularCategories;
  const tabs = homeProductTabs.map((c) => ({
    id: String(c.id),
    label: c.name,
    products: products.filter((p) => String(p.categoryId) === String(c.id)),
  }));

  return (
    <>
      <HeroHome1 slides={home1HeroSlides} />
      <PopularCategoriesSection categories={categories} />
      <BannerSection banners={homeBanners} />
      <ProductTabsSection title="Products" tabs={tabs} />
      <CompanyLogoSection logos={companyLogos} />
    </>
  );
}
