import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./BannerSection.module.scss";

export default function BannerSection({ banners }) {
  return (
    <div className={cn(styles.root, "banner-section section-top-gap-100")}>
      <div className="banner-wrapper">
        <div className="container">
          <div className="row">
            {banners.map((banner) => (
              <div key={banner.id} className="col-lg-4 col-md-6 col-12">
                <div className={styles.card}>
                  <Link href={banner.href} className={styles.imageLink}>
                    <Image className={styles.image} src={banner.imageSrc} alt={banner.title} width={410} height={320} />
                  </Link>
                  <div className={styles.content}>
                    <span className={styles.eyebrow}>{banner.eyebrow}</span>
                    <h3 className={styles.title}>{banner.title}</h3>
                    <Link href={banner.href} className={styles.link}>
                      {banner.ctaLabel}
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
