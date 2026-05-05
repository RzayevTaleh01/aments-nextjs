"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Icon from "@/components/ui/TemplateIcon";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import useShowPrice from "@/hooks/use-show-price";
import { cn } from "@/utils/cn";
import styles from "./ProductTabsSection.module.scss";

export default function ProductTabsSection({ title, products }) {
  const { showPrice } = useShowPrice();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={cn(styles.root, "product-tab-section section-top-gap-100")}>
      <div className="section-content-gap">
        <div className="container">
          <div className="row">
            <div className="section-content d-flex justify-content-between align-items-md-center align-items-start flex-md-row flex-column">
              <h3 className="section-title">{title}</h3>
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

      <div className="product-tab-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={styles.slider}>
                <Swiper
                  modules={[Navigation]}
                  loop={false}
                  navigation={{}}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1.2, spaceBetween: 14 },
                    480: { slidesPerView: 2, spaceBetween: 16 },
                    768: { slidesPerView: 3, spaceBetween: 18 },
                    992: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                  className="product-default-slider product-default-slider-4grids-1row"
                >
                  {(products || []).map((product) => (
                    <SwiperSlide key={product?.id}>
                      <ProductCard product={product} showPrice={showPrice} />
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
