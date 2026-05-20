"use client";

import HeroHome from "@/components/sections/home/HeroHome/HeroHome";
import PopularCategoriesSection from "@/components/sections/home/PopularCategoriesSection/PopularCategoriesSection";
import BannerSection from "@/components/sections/home/BannerSection/BannerSection";
import ProductsCarousel from "@/components/templates/ProductsCarousel";
import CompanyLogoSection from "@/components/sections/home/CompanyLogoSection/CompanyLogoSection";
import { companyLogos, home1HeroSlides, homeBanners } from "@/constants/home";

export default function HomePage({ popularCategories = [], products = [] }) {
  return (
    <>
      <HeroHome slides={home1HeroSlides} />
      <PopularCategoriesSection categories={popularCategories} />
      <BannerSection banners={homeBanners} />
      <ProductsCarousel title="Products" products={products} />
      <CompanyLogoSection logos={companyLogos} />
    </>
  );
}
