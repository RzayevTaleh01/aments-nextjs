"use client";

import "./ProductDetailsSummary.module.scss";

export default function ProductDetailsSummary({ product }) {
  if (!product) return null;

  return (
    <div className="product-details-content-area-sticky">
      <div className="product-details-text">
        <h4 className="title">{product.name}</h4>
        <div className="price">
          {product.compareAt && <del>{product.compareAt}</del>}
          {product.price}
        </div>
        <p>
          {product.description || ""}
        </p>
      </div>

      {/*<div className="product-details-variable">*/}
      {/*  <h4 className="title">Available Options</h4>*/}
      {/*   <ProductColorOptions />*/}
      {/*</div>*/}
      {/*<div className="product-details-meta mb-20">*/}
      {/*  <ul>*/}
      {/*    <li>*/}
      {/*      <Link href="/compare">*/}
      {/*        <Icon name="FaRetweet" />*/}
      {/*        Compare*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </div>
  );
}
