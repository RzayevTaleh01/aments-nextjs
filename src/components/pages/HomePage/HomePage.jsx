"use client";

import HeroHome from "@/components/sections/home/HeroHome/HeroHome";
import PopularCategoriesSection from "@/components/sections/home/PopularCategoriesSection/PopularCategoriesSection";
import BannerSection from "@/components/sections/home/BannerSection/BannerSection";
import ProductTabsSection from "@/components/sections/home/ProductTabsSection/ProductTabsSection";
import CompanyLogoSection from "@/components/sections/home/CompanyLogoSection/CompanyLogoSection";
import { products } from "@/constants/products";
import { companyLogos, home1HeroSlides, homeBanners, popularCategories as fallbackPopularCategories } from "@/constants/home";


export default function HomePage({ popularCategories }) {
  const categories = popularCategories?.length ? popularCategories : fallbackPopularCategories;

  const resolvedProducts = products;

  return (
    <>
      <HeroHome slides={home1HeroSlides} />
      <PopularCategoriesSection categories={categories} />
      <BannerSection banners={homeBanners} />
      <ProductTabsSection title="Products" products={resolvedProducts} />
      <CompanyLogoSection logos={companyLogos} />
    </>
  );
}
