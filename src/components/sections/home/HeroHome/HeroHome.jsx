"use client";

import Carousel from "@/components/ui/Carousel/Carousel";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import styles from "./HeroHome.module.scss";

export default function HeroHome1({ slides }) {
  return (
    <div className={cn(styles.root, "hero-area")}>
      <Carousel
        items={slides}
        loop
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        swiperClassName="hero-area-wrapper hero-slider-dots fix-slider-dots"
        renderItem={(slide) => (
          <div className={styles.slide}>
            <div>
              <Image src={slide.imageSrc} alt={slide.title} width={1920} height={520} priority className={styles.image} />
            </div>
            <div className={styles.content}>
              <div className="container">
                <div className="row">
                  <div className="col-10 col-md-8 col-xl-6">
                    <h5 className={styles.eyebrow}>{slide.eyebrow}</h5>
                    <h2 className={styles.title}>{slide.title}</h2>
                    <p className={styles.description}>{slide.description}</p>
                    <Link href={slide.ctaHref} className={styles.button}>
                      {slide.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
