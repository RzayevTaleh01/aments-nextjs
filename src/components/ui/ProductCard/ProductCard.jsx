import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./ProductCard.module.scss";

export default function ProductCard({ product, className }) {
  return (
    <div
      className={cn(
        styles.scope,
        "group overflow-hidden rounded-2xl border border-zinc-100 bg-white dark:border-zinc-900 dark:bg-zinc-950",
        className
      )}
    >
      <Link href={product.href} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image src={product.imageSrc} alt={product.name} fill className="object-cover transition duration-300 group-hover:scale-105" />
        </div>
      </Link>
      <div className="p-4">
        <h6 className="text-sm font-semibold leading-5">
          <Link href={product.href} className="hover:underline">
            {product.name}
          </Link>
        </h6>
        <div className="mt-2 text-sm">
          {product.compareAt ? <del className="me-2 text-zinc-500 dark:text-zinc-400">{product.compareAt}</del> : null}
          <span className="font-semibold">{product.price}</span>
        </div>
      </div>
    </div>
  );
}

