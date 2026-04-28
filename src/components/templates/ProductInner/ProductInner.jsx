import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import styles from "./ProductCardTemplate.module.scss";

export default function ProductCardTemplate({ product, actionsVariant = "links" }) {
  const useModalActions = actionsVariant === "modals";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Link href={product.href} className={styles.imageLink}>
          <Image src={product.imageSrc} alt={product.name} width={300} height={300} className={styles.image} />
        </Link>
        <div className={styles.actionIconLink}>
          <ul className={styles.actionIconList}>
            <li className={styles.actionIconItem}>
              <Link href="/wishlist" className={styles.actionIconButton}>
                <Icon name="FaHeart" />
              </Link>
            </li>
            <li className={styles.actionIconItem}>
              <Link href="/compare" className={styles.actionIconButton}>
                <Icon name="FaRetweet" />
              </Link>
            </li>
            <li className={styles.actionIconItem}>
              {useModalActions ? (
                <a href="#modalQuickview" data-bs-toggle="modal" data-bs-target="#modalQuickview" className={styles.actionIconButton}>
                  <Icon name="FaEye" />
                </a>
              ) : (
                <Link href={product.href} className={styles.actionIconButton}>
                  <Icon name="FaEye" />
                </Link>
              )}
            </li>
            <li className={styles.actionIconItem}>
              {useModalActions ? (
                <a href="#modalAddcart" data-bs-toggle="modal" data-bs-target="#modalAddcart" className={styles.actionIconButton}>
                  <Icon name="FaShoppingCart" />
                </a>
              ) : (
                <Link href="/cart" className={styles.actionIconButton}>
                  <Icon name="FaShoppingCart" />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.content}>
        <h6>
          <Link href={product.href} className={styles.titleLink}>
            {product.name}
          </Link>
        </h6>
        <span className={styles.price}>
          {product.compareAt ? <del className={styles.priceOff}>{product.compareAt}</del> : null} {product.price}
        </span>
      </div>
    </div>
  );
}

