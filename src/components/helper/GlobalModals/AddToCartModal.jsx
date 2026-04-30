import Link from "next/link";
import { Icon } from "@/components/ui";

export default function AddToCartModal() {
  return (
    <div
      className="modal fade"
      id="modalAddcart"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col text-end">
                  <button
                    type="button"
                    className="close modal-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">
                      {" "}
                      <Icon name="FaTimes" size={18} />
                    </span>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="modal-add-cart-product-img">
                        <img
                          className="img-fluid"
                          src="/assets/images/products_images/aments_products_image_1.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="modal-add-cart-info">
                        <Icon name="FaCheckSquare" size={18} className="me-2" />
                        Added to cart successfully!
                      </div>
                      <div className="modal-add-cart-product-cart-buttons">
                        <Link href="/cart">View Cart</Link>
                        <Link href="/checkout">Checkout</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 modal-border">
                  <ul className="modal-add-cart-product-shipping-info">
                    <li>
                      {" "}
                      <strong>
                        <Icon name="FaShoppingCart" /> There Are 5 Items In Your Cart.
                      </strong>
                    </li>
                    <li>
                      {" "}
                      <strong>TOTAL PRICE: </strong> <span>$187.00</span>
                    </li>
                    <li className="modal-continue-button">
                      <button type="button" data-bs-dismiss="modal">
                        CONTINUE SHOPPING
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
  );
}
