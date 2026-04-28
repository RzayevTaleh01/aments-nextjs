"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Icon } from "@/components/ui";
import { ProductInner } from "@/components/templates";
import { cn } from "@/utils/cn";
import styles from "./RelatedProductsCarousel.module.scss";

export default function RelatedProductsCarousel({ products, prevRef, nextRef }) {
  return (
    <div className={cn(styles.section, "section-top-gap-100")}>
      <div className={styles.sectionContentGap}>
        <div className="container">
          <div className="row">
            <div className={styles.sectionContent}>
              <h3 className={styles.sectionTitle} data-aos="fade-up" data-aos-delay="0">
                Related Products
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productWrapper} data-aos="fade-up" data-aos-delay="200">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={cn(styles.productDefaultSlider, styles.productDefaultSlider4Grids1Row)}>
                <button type="button" className={cn(styles.defaultSliderArrow, styles.defaultSliderArrowLeft)} ref={prevRef}>
                  <Icon name="FaChevronLeft" size={18} />
                </button>
                <button type="button" className={cn(styles.defaultSliderArrow, styles.defaultSliderArrowRight)} ref={nextRef}>
                  <Icon name="FaChevronRight" size={18} />
                </button>

                <Swiper
                  modules={[Navigation]}
                  spaceBetween={30}
                  slidesPerView={4}
                  loop={false}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    575: { slidesPerView: 1 },
                    992: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                  }}
                >
                  {products.slice(0, 6).map((p) => (
                    <SwiperSlide key={p.id}>
                      <ProductInner product={p} />
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

