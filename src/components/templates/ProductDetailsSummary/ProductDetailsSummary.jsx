"use client";

import Link from "next/link";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import styles from "./ProductDetailsSummary.module.scss";

export default function ProductDetailsSummary({ product }) {
  if (!product) return null;

  return (
    <div className={styles.contentArea} data-aos="fade-up" data-aos-delay="200">
      <div className={styles.text}>
        <h4 className={styles.title}>{product.name}</h4>
        <div className="d-flex align-items-center">
          <div className={styles.productReview}>
            <span className={styles.reviewFill}>
              <Icon name="FaStar" size={14} />
            </span>
            <span className={styles.reviewFill}>
              <Icon name="FaStar" size={14} />
            </span>
            <span className={styles.reviewFill}>
              <Icon name="FaStar" size={14} />
            </span>
            <span className={styles.reviewFill}>
              <Icon name="FaStar" size={14} />
            </span>
            <span className={styles.reviewEmpty}>
              <Icon name="FaRegStar" size={14} />
            </span>
          </div>
          <Link href="/product/default" className={styles.customerReview}>
            (customer review )
          </Link>
        </div>
        <div className={styles.price}>
          {product.compareAt && <del>{product.compareAt}</del>}
          {product.price}
        </div>
        <p>
          {product.description ||
            "eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in"}
        </p>
      </div>

      <div className={styles.variable}>
        <h4 className={styles.variableTitle}>Available Options</h4>

        <div className={styles.variableSingleItem}>
          <span>Color</span>
          <div className={styles.variableColor}>
            <label htmlFor="product-color-red">
              <input name="product-color" id="product-color-red" className={styles.colorSelect} type="radio" defaultChecked />
              <span className={styles.productColorRed} />
            </label>
            <label htmlFor="product-color-tomato">
              <input name="product-color" id="product-color-tomato" className={styles.colorSelect} type="radio" />
              <span className={styles.productColorTomato} />
            </label>
            <label htmlFor="product-color-green">
              <input name="product-color" id="product-color-green" className={styles.colorSelect} type="radio" />
              <span className={styles.productColorGreen} />
            </label>
            <label htmlFor="product-color-light-green">
              <input name="product-color" id="product-color-light-green" className={styles.colorSelect} type="radio" />
              <span className={styles.productColorLightGreen} />
            </label>
            <label htmlFor="product-color-blue">
              <input name="product-color" id="product-color-blue" className={styles.colorSelect} type="radio" />
              <span className={styles.productColorBlue} />
            </label>
            <label htmlFor="product-color-light-blue">
              <input name="product-color" id="product-color-light-blue" className={styles.colorSelect} type="radio" />
              <span className={styles.productColorLightBlue} />
            </label>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className={cn(styles.variableSingleItem, styles.variableSingleItemInline)}>
            <span>Quantity</span>
            <div className={styles.variableQuantity}>
              <input className={styles.quantityInput} min="1" max="100" defaultValue="1" type="number" />
            </div>
          </div>

          <div className={styles.addToCartBtn}>
            <a href="#modalAddcart" data-bs-toggle="modal" data-bs-target="#modalAddcart">
              Add To Cart
            </a>
          </div>
        </div>
      </div>

      <div className={cn(styles.meta, "mb-20")}>
        <ul>
          <li>
            <Link href="/wishlist">
              <span className={styles.inlineIcon}>
                <Icon name="FaHeart" />
              </span>
              Add to wishlist
            </Link>
          </li>
          <li>
            <Link href="/compare">
              <span className={styles.inlineIcon}>
                <Icon name="FaRetweet" />
              </span>
              Compare
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.social}>
        <ul>
          <li>
            <a href="#" className={styles.facebook} onClick={(e) => e.preventDefault()}>
              <span className={styles.inlineIcon}>
                <Icon name="FaFacebookF" size={16} />
              </span>
              Like
            </a>
          </li>
          <li>
            <a href="#" className={styles.twitter} onClick={(e) => e.preventDefault()}>
              <span className={styles.inlineIcon}>
                <Icon name="FaTwitter" size={16} />
              </span>
              Tweet
            </a>
          </li>
          <li>
            <a href="#" className={styles.pinterest} onClick={(e) => e.preventDefault()}>
              <span className={styles.inlineIcon}>
                <Icon name="FaPinterestP" size={16} />
              </span>
              Save
            </a>
          </li>
          <li>
            <a href="#" className={styles.googlePlus} onClick={(e) => e.preventDefault()}>
              <span className={styles.inlineIcon}>
                <Icon name="FaGooglePlusG" size={16} />
              </span>
              Save
            </a>
          </li>
          <li>
            <a href="#" className={styles.linkedin} onClick={(e) => e.preventDefault()}>
              <span className={styles.inlineIcon}>
                <Icon name="FaLinkedinIn" size={16} />
              </span>
              Linked
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

