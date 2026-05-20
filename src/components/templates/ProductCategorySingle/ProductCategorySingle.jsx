"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./ProductCategorySingle.module.scss";

export default function ProductCategorySingle({ href, imageSrc, title, items, className }) {
  const base = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL || "";
  const rawImageSrc = imageSrc;
  const normalizedImageSrc = rawImageSrc.startsWith("uploads/") ? `/${rawImageSrc}` : rawImageSrc;
  const resolvedSrc = normalizedImageSrc.startsWith("/uploads") ? `${base}${normalizedImageSrc}` : normalizedImageSrc;

  return (
    <Link href={href} className={cn(styles, "product-catagory-single", className)}>
      <div className={cn(styles, "product-catagory-img")}>
        <Image src={resolvedSrc} alt={title} width={300} height={300} />
      </div>
      <div className={cn(styles, "product-catagory-content")}>
        <h5 className={cn(styles, "product-catagory-title")}>{title}</h5>
        <span className={cn(styles, "product-catagory-items")}>{items}</span>
      </div>
    </Link>
  );
}
