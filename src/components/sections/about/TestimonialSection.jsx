"use client";

import Carousel from "@/components/ui/Carousel/Carousel";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import Image from "next/image";
import { cn } from "@/utils/cn";
import styles from "./TestimonialSection.module.scss";

export default function TestimonialSection({ items }) {
  return (
    <div className={cn(styles.scope, "testimonial-section section-top-gap-100")}>
      <div className="container">
        <div className="row">
          <h4 className="testimonial-title">What Our Custumers Say ?</h4>
        </div>
        <div className="row">
          <Carousel
            items={items}
            loop
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            swiperClassName="testimonial-slider fix-slider-dots testimonial-slider-dots"
            renderItem={(t) => (
              <div className="testimonial-slider-single">
                <p>
                  These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!
                </p>
                <div className="testimonial-img">
                  <Image src={t.img} alt={t.name} width={80} height={80} />
                </div>
                <span className="name">{t.name}</span>
                <span className="job-title">{t.role}</span>
                <div className="testimonial-review">
                  <span className="review-fill">
                    <Icon name="FaStar" size={14} />
                  </span>
                  <span className="review-fill">
                    <Icon name="FaStar" size={14} />
                  </span>
                  <span className="review-fill">
                    <Icon name="FaStar" size={14} />
                  </span>
                  <span className="review-fill">
                    <Icon name="FaStar" size={14} />
                  </span>
                  <span className="review-empty">
                    <Icon name="FaRegStar" size={14} />
                  </span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
