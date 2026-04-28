"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Icon } from "@/components/ui";
import { ProductCard } from "@/components/templates";
import "./RelatedProductsCarousel.module.scss";

export default function RelatedProductsCarousel({ products, prevRef, nextRef }) {
  return (
    <div className="section-top-gap-100">
      <div className="section-content-gap">
        <div className="container">
          <div className="row">
            <h3 className="section-title" data-aos="fade-up" data-aos-delay="0">
              Related Products
            </h3>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="product-default-slider">
                <button type="button" className="default-slider-arrow default-slider-arrow--left" ref={prevRef}>
                  <Icon name="FaChevronLeft" size={18} />
                </button>
                <button type="button" className="default-slider-arrow default-slider-arrow--right" ref={nextRef}>
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
                      <ProductCard product={p} />
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
