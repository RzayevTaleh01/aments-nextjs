"use client";

import { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "@/components/ui";
import { products } from "@/constants/products";
import { ProductDetailsSummary, ProductDetailsTabs, RelatedProductsCarousel, ProductDetailsGallery, ProductOffersTable } from "@/components/templates";
import styles from "./ProductDetailsPage.module.scss";

export default function ProductDetailsPage({ title, breadcrumbLabel, productId, productSlug, variant = "default" }) {
  const product =
    (productSlug ? products.find((p) => p.slug === productSlug) : null) ??
    (productId ? products.find((p) => p.id === productId) : null) ??
    null;
  if (!product) return null;
  const [activeTab, setActiveTab] = useState("description");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const thumbPrevRef = useRef(null);
  const thumbNextRef = useRef(null);
  const relatedPrevRef = useRef(null);
  const relatedNextRef = useRef(null);

  const safeThumbsSwiper = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#offers") return;

    const el = document.getElementById("offers");
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const productImages = [
    product.imageSrc,
    "/assets/images/products_images/aments_products_image_2.jpg",
    "/assets/images/products_images/aments_products_image_3.jpg",
    "/assets/images/products_images/aments_products_image_4.jpg",
    "/assets/images/products_images/aments_products_image_5.jpg",
    "/assets/images/products_images/aments_products_image_6.jpg",
  ];

  const galleryVariant = variant === "default" ? "gallery-left" : variant;

  return (
    <div className={styles.scope}>
      <Breadcrumb
        title={product.name || title}
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/grid/sidebar-left" },
          { label: product.name || breadcrumbLabel },
        ]}
      />

      <div className="section-top-gap-100">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ProductDetailsGallery
                galleryLargeImages={productImages}
                galleryThumbImages={productImages}
                safeThumbsSwiper={safeThumbsSwiper}
                setThumbsSwiper={setThumbsSwiper}
                activeImageIndex={activeImageIndex}
                onActiveImageIndexChange={setActiveImageIndex}
                thumbPrevRef={thumbPrevRef}
                thumbNextRef={thumbNextRef}
                variant={galleryVariant}
              />
            </div>

            <div className="col-md-6">
              <ProductDetailsSummary product={product} />
            </div>
          </div>
        </div>
      </div>

      <ProductOffersTable product={product} groups={product?.offerGroups} />
      <ProductDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} product={product} />
      <RelatedProductsCarousel products={products} prevRef={relatedPrevRef} nextRef={relatedNextRef} />
    </div>
  );
}

