"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Icon } from "@/components/ui";
import "./ProductDetailsGallery.module.scss";

export default function ProductDetailsGallery({
  galleryLargeImages,
  galleryThumbImages,
  safeThumbsSwiper,
  setThumbsSwiper,
  activeImageIndex,
  onActiveImageIndexChange,
  thumbPrevRef,
  thumbNextRef,
}) {
  return (
    <div className="product-details-gallery-area" data-aos="fade-up" data-aos-delay="0">
      <div className="product-large-image-horaizontal">
        <Swiper
          modules={[EffectFade, Thumbs]}
          effect="fade"
          slidesPerView={1}
          onSlideChange={(swiper) => onActiveImageIndexChange(swiper.realIndex)}
          thumbs={{ swiper: safeThumbsSwiper }}
        >
          {galleryLargeImages.map((src) => (
            <SwiperSlide key={src}>
              <div className="product-large-image-single-slider">
                <Image src={src} alt="" width={570} height={570} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="product-image-thumb product-image-thumb-horizontal">
        <button
          type="button"
          className="gallery-nav gallery-nav-horizontal gallery-nav-horizontal-left"
          ref={thumbPrevRef}
        >
          <Icon name="FaChevronLeft" size={18} />
        </button>
        <button
          type="button"
          className="gallery-nav gallery-nav-horizontal gallery-nav-horizontal-right"
          ref={thumbNextRef}
        >
          <Icon name="FaChevronRight" size={18} />
        </button>

        <Swiper
          modules={[FreeMode, Navigation]}
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
          }}
          navigation={{
            prevEl: thumbPrevRef.current,
            nextEl: thumbNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = thumbPrevRef.current;
            swiper.params.navigation.nextEl = thumbNextRef.current;
          }}
        >
          {galleryThumbImages.map((src, idx) => (
            <SwiperSlide key={`${src}-${idx}`}>
              <div aria-current={idx === activeImageIndex}>
                <Image src={src} alt="" width={140} height={140} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
