"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { cn } from "@/utils/cn";
import styles from "./Carousel.module.scss";

export default function Carousel({
  items,
  renderItem,
  className,
  swiperClassName,
  spaceBetween = 16,
  slidesPerView = 1,
  loop = false,
  autoplay,
  navigation = false,
  pagination = false,
  breakpoints,
}) {
  const modules = [];

  if (autoplay) modules.push(Autoplay);
  if (navigation) modules.push(Navigation);
  if (pagination) modules.push(Pagination);

  return (
    <div className={cn(styles.scope, "relative", className)}>
      <Swiper
        className={cn("w-full", swiperClassName)}
        modules={modules}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        autoplay={autoplay || undefined}
        navigation={navigation || undefined}
        pagination={pagination || undefined}
        breakpoints={breakpoints || undefined}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={item?.id || idx}>{renderItem(item, idx)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

