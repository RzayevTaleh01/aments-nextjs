"use client";

import { useEffect, useRef, useState } from "react";
import HeroHome from "@/components/sections/home/HeroHome/HeroHome";
import PopularCategoriesSection from "@/components/sections/home/PopularCategoriesSection/PopularCategoriesSection";
import BannerSection from "@/components/sections/home/BannerSection/BannerSection";
import ProductsCarousel from "@/components/templates/ProductsCarousel";
import CompanyLogoSection from "@/components/sections/home/CompanyLogoSection/CompanyLogoSection";
import { companyLogos, home1HeroSlides, homeBanners} from "@/constants/home";
import { ALL_PRODUCTS_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";
import { toast } from "react-toastify";

export default function HomePage({ popularCategories, popularCategoriesError }) {
  const categoriesRaw = popularCategories?.length ? popularCategories : [];
  const categories = Array.isArray(categoriesRaw)
    ? categoriesRaw.map((cat) => ({
        ...cat,
        imageSrc: cat?.image,
      }))
    : [];
  const [products, setProducts] = useState([]);
  const popularToastShownRef = useRef(false);

  useEffect(() => {
    if (!popularCategoriesError) return;
    if (popularToastShownRef.current) return;
    popularToastShownRef.current = true;
    toast.error("Xəta! Zəhmət olmasa interneti/serveri yoxlayın.");
  }, [popularCategoriesError]);

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const res = await ApiService.get(ALL_PRODUCTS_ROUTE);
        const data = res?.data?.data ?? {};
        const list = Array.isArray(data?.products) ? data.products : [];
        const mapped = list.map((p) => {
          const imageSrc = p?.images?.[0]?.image ?? p?.image ?? "";
          const href = p?.id ? `/product/${p.id}` : "/product/default";
          return { ...p, imageSrc, href };
        });
        if (!isActive) return;
        setProducts(mapped);
      } catch {
        if (!isActive) return;
        setProducts([]);
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);
  return (
    <>
      <HeroHome slides={home1HeroSlides} />
      <PopularCategoriesSection categories={categories} />
      <BannerSection banners={homeBanners} />
      <ProductsCarousel title="Products" products={products} />
      <CompanyLogoSection logos={companyLogos} />
    </>
  );
}
