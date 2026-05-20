"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Modal, ModalBody } from "reactstrap";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import { useCart } from "@/context/cart-context";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function AddToCartModal() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" || Boolean(session?.token?.accessToken);
  const showPrice = isAuthenticated;
  const { cartCount, cartSubtotalText } = useCart();
  const { staticContent } = useInitial();
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
    window.addEventListener("oem:cart:added", onAdded);
    return () => window.removeEventListener("oem:cart:added", onAdded);
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
                    {HelperTranslate({
                      defaultText: "Added to cart successfully!",
                      translateText: staticContent?.addToCartModal__successMessage,
                    })}
                  </div>
                  {lastItem?.name ? <div className="mt-2">{lastItem.name}</div> : null}
                  {isAuthenticated ? (
                    <div className="modal-add-cart-product-cart-buttons">
                      <Link href="/cart" onClick={close}>
                        {HelperTranslate({ defaultText: "View Cart", translateText: staticContent?.addToCartModal__viewCart })}
                      </Link>
                      <Link href="/checkout" onClick={close}>
                        {HelperTranslate({ defaultText: "Checkout", translateText: staticContent?.addToCartModal__checkout })}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-5 modal-border">
              <ul className="modal-add-cart-product-shipping-info">
                <li>
                  {" "}
                  <strong>
                    <Icon name="FaShoppingCart" />{" "}
                    {HelperTranslate({
                      defaultText: `There Are ${cartCount} Items In Your Cart.`,
                      translateText: staticContent?.addToCartModal__itemsInCart
                        ? String(staticContent.addToCartModal__itemsInCart).replace("{count}", String(cartCount))
                        : undefined,
                    })}
                  </strong>
                </li>
                <li>
                  {" "}
                  <strong>
                    {HelperTranslate({ defaultText: "TOTAL PRICE:", translateText: staticContent?.addToCartModal__totalPriceLabel })}{" "}
                  </strong>{" "}
                  <span>{showPrice ? cartSubtotalText : null}</span>
                </li>
                <li className="modal-continue-button">
                  <button type="button" onClick={close}>
                    {HelperTranslate({ defaultText: "CONTINUE SHOPPING", translateText: staticContent?.addToCartModal__continueShopping })}
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
