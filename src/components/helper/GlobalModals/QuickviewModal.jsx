"use client";

import Link from "next/link";
import { Icon } from "@/components/ui";

const images = [
  "/assets/images/products_images/aments_products_image_1.jpg",
  "/assets/images/products_images/aments_products_image_2.jpg",
  "/assets/images/products_images/aments_products_image_3.jpg",
  "/assets/images/products_images/aments_products_image_4.jpg",
  "/assets/images/products_images/aments_products_image_5.jpg",
  "/assets/images/products_images/aments_products_image_6.jpg",
];

export default function QuickviewModal() {
  return (
    <div className="modal fade" id="modalQuickview" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog  modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col text-end">
                  <button type="button" className="close modal-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                      {" "}
                      <Icon name="FaTimes" size={18} />
                    </span>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="product-details-gallery-area">
                    <div className="product-large-image modal-product-image-large">
                      {images.map((src) => (
                        <div key={src} className="product-image-large-single">
                          <img className="img-fluid" src={src} alt="" />
                        </div>
                      ))}
                    </div>
                    <div className="product-image-thumb modal-product-image-thumb">
                      {images.map((src, idx) => (
                        <div key={src} className={`${idx === 0 ? "zoom-active " : ""}product-image-thumb-single`}>
                          <img className="img-fluid" src={src} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product-details-content-area">
                    <div className="product-details-text">
                      <h4 className="title">Nonstick Dishwasher PFOA</h4>
                      <div className="price">
                        <del>$70.00</del>$80.00
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iste laborum ad impedit pariatur esse optio tempora sint ullam
                        autem deleniti nam in quos qui nemo ipsum numquam, reiciendis maiores quidem aperiam, rerum vel recusandae
                      </p>
                    </div>
                    <div className="product-details-variable">
                      <div className="variable-single-item">
                        <span>Color</span>
                        <div className="product-variable-color">
                          <label htmlFor="modal-product-color-red">
                            <input name="modal-product-color" id="modal-product-color-red" className="color-select" type="radio" defaultChecked />
                            <span className="product-color-red" />
                          </label>
                          <label htmlFor="modal-product-color-tomato">
                            <input name="modal-product-color" id="modal-product-color-tomato" className="color-select" type="radio" />
                            <span className="product-color-tomato" />
                          </label>
                          <label htmlFor="modal-product-color-green">
                            <input name="modal-product-color" id="modal-product-color-green" className="color-select" type="radio" />
                            <span className="product-color-green" />
                          </label>
                          <label htmlFor="modal-product-color-light-green">
                            <input name="modal-product-color" id="modal-product-color-light-green" className="color-select" type="radio" />
                            <span className="product-color-light-green" />
                          </label>
                          <label htmlFor="modal-product-color-blue">
                            <input name="modal-product-color" id="modal-product-color-blue" className="color-select" type="radio" />
                            <span className="product-color-blue" />
                          </label>
                          <label htmlFor="modal-product-color-light-blue">
                            <input name="modal-product-color" id="modal-product-color-light-blue" className="color-select" type="radio" />
                            <span className="product-color-light-blue" />
                          </label>
                        </div>
                      </div>
                      <div className="variable-single-item ">
                        <span>Quantity</span>
                        <div className="product-variable-quantity">
                          <input min="1" max="100" defaultValue="1" type="number" />
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
                        <li>
                          <button type="button" data-bs-toggle="modal" data-bs-target="#modalAddcart">
                            <Icon name="FaShoppingCart" />
                            Add To Cart
                          </button>
                        </li>
                      </ul>
                    </div>
                    <ul className="modal-product-details-social">
                      <li>
                        <button type="button" className="facebook" aria-label="Facebook">
                          <Icon name="FaFacebookF" size={16} />
                        </button>
                      </li>
                      <li>
                        <button type="button" className="twitter" aria-label="Twitter">
                          <Icon name="FaTwitter" size={16} />
                        </button>
                      </li>
                      <li>
                        <button type="button" className="pinterest" aria-label="Pinterest">
                          <Icon name="FaPinterestP" size={16} />
                        </button>
                      </li>
                      <li>
                        <button type="button" className="google-plus" aria-label="Google Plus">
                          <Icon name="FaGooglePlusG" size={16} />
                        </button>
                      </li>
                      <li>
                        <button type="button" className="linkedin" aria-label="LinkedIn">
                          <Icon name="FaLinkedinIn" size={16} />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

