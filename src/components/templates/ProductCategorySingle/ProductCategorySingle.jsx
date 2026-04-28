"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./ProductCategorySingle.module.scss";

export default function ProductCategorySingle({ href, imageSrc, title, items, className }) {
  return (
    <Link href={href} className={cn(styles, "product-catagory-single", className)}>
      <div className={cn(styles, "product-catagory-img")}>
        <Image src={imageSrc} alt={title} width={300} height={300} />
      </div>
      <div className={cn(styles, "product-catagory-content")}>
        <h5 className={cn(styles, "product-catagory-title")}>{title}</h5>
        <span className={cn(styles, "product-catagory-items")}>{items}</span>
      </div>
    </Link>
  );
}
