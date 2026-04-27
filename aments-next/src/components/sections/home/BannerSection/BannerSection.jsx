import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./BannerSection.module.scss";

export default function BannerSection({ banners }) {
  return (
    <div className={cn(styles.scope, "banner-section section-top-gap-100")}>
      <div className="banner-wrapper">
        <div className="container">
          <div className="row">
            {banners.map((banner) => (
              <div key={banner.id} className="col-lg-4 col-md-6 col-12">
                <div className="banner-single">
                  <Link href={banner.href} className="banner-img-link">
                    <Image className="banner-img" src={banner.imageSrc} alt={banner.title} width={410} height={320} />
                  </Link>
                  <div className="banner-content">
                    <span className="banner-text-tiny">{banner.eyebrow}</span>
                    <h3 className="banner-text-large">{banner.title}</h3>
                    <Link href={banner.href} className="banner-link">
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
