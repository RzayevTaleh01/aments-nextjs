import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./BannerSidebar.module.scss";

export default function BannerSidebar({ banners }) {
  return (
    <div className={cn(styles.scope, "banner-sidebar mt-30")}>
      {banners.map((banner) => (
        <div key={banner.id} className="banner-single mb-30">
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
      ))}
    </div>
  );
}
