"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, FreeMode, Mousewheel, Navigation, Thumbs } from "swiper/modules";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import styles from "./ProductDetailsGallery.module.scss";

export default function ProductDetailsGallery({
  galleryLargeImages,
  galleryThumbImages,
  safeThumbsSwiper,
  setThumbsSwiper,
  activeImageIndex,
  onActiveImageIndexChange,
  thumbPrevRef,
  thumbNextRef,
  variant = "gallery-right",
}) {
  const isGalleryLeft = variant === "gallery-left";

  return (
    <div className={styles.root}>
      {isGalleryLeft ? (
        <div className={styles.galleryVertical}>
          <div className={cn(styles.thumbWrap, styles.thumbVertical)}>
            <button type="button" className={cn(styles.nav, styles.navVertical, styles.navVerticalUp)} ref={thumbPrevRef}>
              <Icon name="FaChevronUp" size={18} />
            </button>
            <button type="button" className={cn(styles.nav, styles.navVertical, styles.navVerticalDown)} ref={thumbNextRef}>
              <Icon name="FaChevronDown" size={18} />
            </button>

            <Swiper
              modules={[FreeMode, Navigation, Mousewheel]}
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              direction="vertical"
              freeMode
              mousewheel={{ forceToAxis: true, sensitivity: 0.6 }}
              watchSlidesProgress
              spaceBetween={16}
              className={styles.thumbVerticalSwiper}
              breakpoints={{
                0: { direction: "horizontal", slidesPerView: 2 },
                576: { direction: "vertical", slidesPerView: 4 },
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
                  <div className={styles.thumbItem} aria-current={idx === activeImageIndex ? "true" : undefined}>
                    <Image src={src} alt="" width={140} height={140} className={styles.thumbImage} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={cn(styles.largeWrap, styles.largeVertical)}>
            <Swiper
              modules={[EffectFade, Thumbs]}
              effect="fade"
              slidesPerView={1}
              onSlideChange={(swiper) => onActiveImageIndexChange(swiper.realIndex)}
              thumbs={{ swiper: safeThumbsSwiper }}
            >
              {galleryLargeImages.map((src) => (
                <SwiperSlide key={src}>
                  <div className={styles.largeSlider}>
                    <Image src={src} alt="" width={570} height={570} className={styles.largeImage} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.largeWrap}>
            <Swiper
              modules={[EffectFade, Thumbs]}
              effect="fade"
              slidesPerView={1}
              onSlideChange={(swiper) => onActiveImageIndexChange(swiper.realIndex)}
              thumbs={{ swiper: safeThumbsSwiper }}
            >
              {galleryLargeImages.map((src) => (
                <SwiperSlide key={src}>
                  <div className={styles.largeSlider}>
                    <Image src={src} alt="" width={570} height={570} className={styles.largeImage} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={cn(styles.thumbWrap, styles.thumbHorizontal)}>
            <button type="button" className={cn(styles.nav, styles.navHorizontal, styles.navHorizontalLeft)} ref={thumbPrevRef}>
              <Icon name="FaChevronLeft" size={18} />
            </button>
            <button type="button" className={cn(styles.nav, styles.navHorizontal, styles.navHorizontalRight)} ref={thumbNextRef}>
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
                  <div className={styles.thumbItem} aria-current={idx === activeImageIndex ? "true" : undefined}>
                    <Image src={src} alt="" width={140} height={140} className={styles.thumbImage} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
}
