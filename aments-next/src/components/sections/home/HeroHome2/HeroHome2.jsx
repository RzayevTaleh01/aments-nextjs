"use client";

import { Carousel } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import styles from "./HeroHome2.module.scss";

export default function HeroHome2({ slides }) {
  return (
    <Carousel
      items={slides}
      loop
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      swiperClassName={cn(styles.scope, "hero-area-wrapper hero-slider-dots fix-slider-dots")}
      renderItem={(slide) => (
        <div className="hero-area-single">
          <div className="hero-area-bg-2">
            <Image src={slide.imageSrc} alt={slide.title} width={1920} height={520} priority className="hero-img-2" />
          </div>
          <div className="hero-content hero-content-2">
            <div className="row">
              <div className="col-10 col-md-8 col-xl-6 offset-1">
                <h5>{slide.eyebrow}</h5>
                <h2>{slide.title}</h2>
                <p className="hero-text">{slide.description}</p>
                <Link href={slide.ctaHref} className="hero-button">
                  {slide.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
