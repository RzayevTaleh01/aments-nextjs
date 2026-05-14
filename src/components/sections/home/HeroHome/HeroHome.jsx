"use client";

import Carousel from "@/components/ui/Carousel/Carousel";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import styles from "./HeroHome.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function HeroHome1({ slides }) {
  const { staticContent } = useInitial();
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
              <Image
                src={slide.imageSrc}
                alt={HelperTranslate({
                  defaultText: slide.title,
                  translateText: staticContent?.[`home__hero__${String(slide.id)}__title`],
                })}
                width={1920}
                height={520}
                priority
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <div className="container">
                <div className="row">
                  <div className="col-10 col-md-8 col-xl-6">
                    <h5 className={styles.eyebrow}>
                      {HelperTranslate({
                        defaultText: slide.eyebrow,
                        translateText: staticContent?.[`home__hero__${String(slide.id)}__eyebrow`],
                      })}
                    </h5>
                    <h2 className={styles.title}>
                      {HelperTranslate({
                        defaultText: slide.title,
                        translateText: staticContent?.[`home__hero__${String(slide.id)}__title`],
                      })}
                    </h2>
                    <p className={styles.description}>
                      {HelperTranslate({
                        defaultText: slide.description,
                        translateText: staticContent?.[`home__hero__${String(slide.id)}__description`],
                      })}
                    </p>
                    <Link href={slide.ctaHref} className={styles.button}>
                      {HelperTranslate({
                        defaultText: slide.ctaLabel,
                        translateText: staticContent?.[`home__hero__${String(slide.id)}__ctaLabel`],
                      })}
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
