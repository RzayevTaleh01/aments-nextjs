"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./BannerSection.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function BannerSection({ banners }) {
  const { staticContent } = useInitial();
  return (
    <div className={cn(styles.root, "banner-section section-top-gap-100")}>
      <div className="banner-wrapper">
        <div className="container">
          <div className="row">
            {banners.map((banner) => (
              <div key={banner.id} className="col-lg-4 col-md-6 col-12">
                <div className={styles.card}>
                  <Link href={banner.href} className={styles.imageLink}>
                    <Image
                      className={styles.image}
                      src={banner.imageSrc}
                      alt={HelperTranslate({
                        defaultText: banner.title,
                        translateText: staticContent?.[`home__banner__${String(banner.id)}__title`],
                      })}
                      width={410}
                      height={320}
                    />
                  </Link>
                  <div className={styles.content}>
                    <span className={styles.eyebrow}>
                      {HelperTranslate({
                        defaultText: banner.eyebrow,
                        translateText: staticContent?.[`home__banner__${String(banner.id)}__eyebrow`],
                      })}
                    </span>
                    <h3 className={styles.title}>
                      {HelperTranslate({
                        defaultText: banner.title,
                        translateText: staticContent?.[`home__banner__${String(banner.id)}__title`],
                      })}
                    </h3>
                    <Link href={banner.href} className={styles.link}>
                      {HelperTranslate({
                        defaultText: banner.ctaLabel,
                        translateText: staticContent?.[`home__banner__${String(banner.id)}__ctaLabel`],
                      })}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
