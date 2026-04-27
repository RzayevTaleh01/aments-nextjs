"use client";

import { Carousel } from "@/components/ui";
import Image from "next/image";
import { cn } from "@/utils/cn";
import styles from "./CompanyLogoSection.module.scss";

export default function CompanyLogoSection({ logos }) {
  return (
    <div className={cn(styles.scope, "company-logo-section section-top-gap-100")}>
      <div className="company-logo-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Carousel
                items={logos}
                loop
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                  0: { slidesPerView: 2, spaceBetween: 14 },
                  576: { slidesPerView: 3, spaceBetween: 18 },
                  992: { slidesPerView: 4, spaceBetween: 22 },
                }}
                swiperClassName="company-logo-slider"
                renderItem={(logo) => (
                  <div className="company-logo-single">
                    <Image src={logo.imageSrc} alt={logo.alt} width={200} height={80} className="img-fluid company-logo-image" />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
