import { Reveal } from "@/components/helper";
import Image from "next/image";
import Link from "next/link";
import styles from "./BannerCard.module.scss";

export default function BannerCard({ banner, delay = 0, className }) {
  return (
    <Reveal delay={delay} className={className}>
      <div className={`${styles.scope} group relative overflow-hidden rounded-3xl`}>
        <Link href={banner.href} className="absolute inset-0 z-10">
          <span className="sr-only">{banner.title}</span>
        </Link>
        <div className="relative aspect-[4/3]">
          <Image src={banner.imageSrc} alt={banner.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="absolute inset-0 flex items-end p-6">
          <div className="rounded-2xl bg-white/90 p-5 backdrop-blur dark:bg-zinc-950/80">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              {banner.eyebrow}
            </span>
            <h3 className="mt-1 text-2xl font-bold">{banner.title}</h3>
            <span className="mt-3 inline-flex text-sm font-semibold underline-offset-4 group-hover:underline">
              {banner.ctaLabel}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
