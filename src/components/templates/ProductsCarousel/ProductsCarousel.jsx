"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Icon from "@/components/ui/TemplateIcon";
import ProductCard from "@/components/ui/ProductCard";
import useShowPrice from "@/hooks/use-show-price";
import { cn } from "@/utils/cn";
import styles from "./ProductsCarousel.module.scss";

export default function ProductsCarousel({
  title = "Products",
  products,
  className,
  spaceBetween = 30,
  loop = false,
  breakpoints = {
    0: { slidesPerView: 1.2, spaceBetween: 14 },
    575: { slidesPerView: 1.2, spaceBetween: 14 },
    768: { slidesPerView: 2, spaceBetween: 16 },
    992: { slidesPerView: 3, spaceBetween: 20 },
    1200: { slidesPerView: 4, spaceBetween: 30 },
  },
}) {
  const { showPrice } = useShowPrice();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className={cn(styles.scope, "section-top-gap-100", className)}>
      <div className="section-content-gap">
        <div className="container">
          <div className="row">
            <div className={cn("section-content d-flex justify-content-between align-items-md-center align-items-start flex-md-row flex-column", styles.header)}>
              <h3 className="section-title" >
                {title}
              </h3>
              <div className={styles.nav}>
                <button ref={prevRef} type="button" className={styles.navButton} aria-label="Previous products">
                  <Icon name="FaChevronLeft" size={16} />
                </button>
                <button ref={nextRef} type="button" className={styles.navButton} aria-label="Next products">
                  <Icon name="FaChevronRight" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={cn("product-default-slider", styles.slider)}>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={spaceBetween}
                  loop={loop}
                  navigation={{}}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                  breakpoints={breakpoints}
                  className="product-default-slider product-default-slider-4grids-1row"
                >
                  {safeProducts.map((p, idx) => (
                    <SwiperSlide key={p?.id ?? idx}>
                      <ProductCard product={p} showPrice={showPrice} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

