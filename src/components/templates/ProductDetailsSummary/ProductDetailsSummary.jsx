"use client";

import Link from "next/link";
import { Icon } from "@/components/ui";
import "./ProductDetailsSummary.module.scss";

export default function ProductDetailsSummary({ product }) {
  if (!product) return null;

  return (
    <div className="product-details-content-area-sticky">
      <div className="product-details-text">
        <h4 className="title">{product.name}</h4>
        <div className="d-flex align-items-center">
          <div className="product-review">
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
          <Link href="/product/default" className="customer-review">
            (customer review )
          </Link>
        </div>
        <div className="price">
          {product.compareAt && <del>{product.compareAt}</del>}
          {product.price}
        </div>
        <p>
          {product.description ||
            "eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in"}
        </p>
      </div>

      <div className="product-details-variable">
        <h4 className="title">Available Options</h4>

        <div className="variable-single-item">
          <span>Color</span>
          <div className="product-variable-color">
            <label htmlFor="product-color-red">
              <input name="product-color" id="product-color-red" type="radio" defaultChecked />
              <span className="product-color-red" />
            </label>
            <label htmlFor="product-color-tomato">
              <input name="product-color" id="product-color-tomato" type="radio" />
              <span className="product-color-tomato" />
            </label>
            <label htmlFor="product-color-green">
              <input name="product-color" id="product-color-green" type="radio" />
              <span className="product-color-green" />
            </label>
            <label htmlFor="product-color-light-green">
              <input name="product-color" id="product-color-light-green" type="radio" />
              <span className="product-color-light-green" />
            </label>
            <label htmlFor="product-color-blue">
              <input name="product-color" id="product-color-blue" type="radio" />
              <span className="product-color-blue" />
            </label>
            <label htmlFor="product-color-light-blue">
              <input name="product-color" id="product-color-light-blue" type="radio" />
              <span className="product-color-light-blue" />
            </label>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="variable-single-item">
            <span>Quantity</span>
            <div className="product-variable-quantity">
              <input min="1" max="100" defaultValue="1" type="number" />
            </div>
          </div>

          <div className="product-add-to-cart-btn">
            <a href="#modalAddcart" data-bs-toggle="modal" data-bs-target="#modalAddcart">
              Add To Cart
            </a>
          </div>
        </div>
      </div>

      <div className="product-details-meta mb-20">
        <ul>
          <li>
            <Link href="/wishlist">
              <Icon name="FaHeart" />
              Add to wishlist
            </Link>
          </li>
          <li>
            <Link href="/compare">
              <Icon name="FaRetweet" />
              Compare
            </Link>
          </li>
        </ul>
      </div>

      <div className="product-details-social">
        <ul>
          <li>
            <a href="#" className="facebook" onClick={(e) => e.preventDefault()}>
              <Icon name="FaFacebookF" size={16} />
              Like
            </a>
          </li>
          <li>
            <a href="#" className="twitter" onClick={(e) => e.preventDefault()}>
              <Icon name="FaTwitter" size={16} />
              Tweet
            </a>
          </li>
          <li>
            <a href="#" className="pinterest" onClick={(e) => e.preventDefault()}>
              <Icon name="FaPinterestP" size={16} />
              Save
            </a>
          </li>
          <li>
            <a href="#" className="google-plus" onClick={(e) => e.preventDefault()}>
              <Icon name="FaGooglePlusG" size={16} />
              Save
            </a>
          </li>
          <li>
            <a href="#" className="linkedin" onClick={(e) => e.preventDefault()}>
              <Icon name="FaLinkedinIn" size={16} />
              Linked
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
