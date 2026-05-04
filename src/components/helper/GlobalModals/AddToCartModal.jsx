"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Modal, ModalBody } from "reactstrap";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import { useCart } from "@/context/ui-drawers-context";

export default function AddToCartModal() {
  const { status } = useSession();
  const showPrice = status === "authenticated";
  const { cartCount, cartSubtotalText } = useCart();
  const [lastItem, setLastItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  useEffect(() => {
    function onAdded(e) {
      setLastItem(e?.detail?.item ?? null);
      setIsOpen(true);
    }
    window.addEventListener("aments:cart:added", onAdded);
    return () => window.removeEventListener("aments:cart:added", onAdded);
  }, []);

  return (
    <Modal
      id="modalAddcart"
      isOpen={isOpen}
      toggle={close}
      centered
      size="xl"
      modalClassName="fade"
    >
      <ModalBody>
        <div className="container-fluid">
          <div className="row">
            <div className="col text-end">
              <button type="button" className="close modal-close" onClick={close} aria-label="Close">
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
                      src={lastItem?.imageSrc ?? "/assets/images/products_images/aments_products_image_1.jpg"}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="modal-add-cart-info">
                    <Icon name="FaCheckSquare" size={18} className="me-2" />
                    Added to cart successfully!
                  </div>
                  {lastItem?.name ? <div className="mt-2">{lastItem.name}</div> : null}
                  <div className="modal-add-cart-product-cart-buttons">
                    <Link href="/cart" onClick={close}>
                      View Cart
                    </Link>
                    <Link href="/checkout" onClick={close}>
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 modal-border">
              <ul className="modal-add-cart-product-shipping-info">
                <li>
                  {" "}
                  <strong>
                    <Icon name="FaShoppingCart" /> There Are {cartCount} Items In Your Cart.
                  </strong>
                </li>
                <li>
                  {" "}
                  <strong>TOTAL PRICE: </strong> <span>{showPrice ? cartSubtotalText : null}</span>
                </li>
                <li className="modal-continue-button">
                  <button type="button" onClick={close}>
                    CONTINUE SHOPPING
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
