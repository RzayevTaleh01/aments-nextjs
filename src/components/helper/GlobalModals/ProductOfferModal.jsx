"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Modal } from "reactstrap";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import { useCart } from "@/context/ui-drawers-context";
import { toast } from "react-toastify";
import styles from "./ProductOfferModal.module.scss";

function coerceNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parsePriceNumber(priceText) {
  if (typeof priceText !== "string") return null;
  const normalized = priceText.replace(",", ".").replace(/[^\d.]/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function formatPrice(priceNumber, currencySuffix) {
  if (!Number.isFinite(priceNumber)) return "";
  const text = priceNumber.toFixed(2);
  return currencySuffix ? `${text} ${currencySuffix}` : text;
}

export default function ProductOfferModal() {
  const { status } = useSession();
  const showPrice = status === "authenticated";
  const { addToCart } = useCart();
  const [offer, setOffer] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  useEffect(() => {
    function onOpen(e) {
      setOffer(e?.detail ?? null);
      setQuantity(1);
      setNote("");
      setIsOpen(true);
    }

    window.addEventListener("aments:product-offer-modal", onOpen);
    return () => window.removeEventListener("aments:product-offer-modal", onOpen);
  }, []);

  const title = useMemo(() => {
    const brand = offer?.row?.brand ?? "";
    const code = offer?.row?.code ?? "";
    return `${brand} ${code}`.trim();
  }, [offer]);

  const subtitle = useMemo(() => {
    return offer?.row?.name ?? offer?.product?.name ?? "";
  }, [offer]);

  const unitPriceText = offer?.row?.price ?? "";
  const currencySuffix = typeof unitPriceText === "string" && unitPriceText.toUpperCase().includes("AZN") ? "AZN" : "";
  const unitPrice = parsePriceNumber(unitPriceText);
  const totalPriceText = unitPrice != null ? formatPrice(unitPrice * quantity, currencySuffix) : unitPriceText;

  return (
    <Modal
      id="modalProductOffer"
      isOpen={isOpen}
      toggle={close}
      centered
      className={styles.modalDialog}
      contentClassName={styles.modalContent}
      modalClassName="fade"
    >
      <div className="modal-header">
        <div>
          <p className={styles.title}>{title || " "}</p>
          <p className={styles.subtitle}>{subtitle || " "}</p>
        </div>
        <button type="button" className={styles.closeButton} onClick={close} aria-label="Close">
          <Icon name="FaTimes" size={18} />
        </button>
      </div>

      <div className="modal-body">
        <div className={styles.row}>
          <div>
            <p className={styles.label}>Miqdar</p>
            <div className={styles.qtyControl}>
              <button type="button" className={styles.qtyBtn} onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Azalt">
                <Icon name="FaMinus" size={12} />
              </button>
              <input
                className={styles.qtyInput}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, coerceNumber(e.target.value, 1)))}
                inputMode="numeric"
              />
              <button type="button" className={styles.qtyBtn} onClick={() => setQuantity((q) => q + 1)} aria-label="Artır">
                <Icon name="FaPlus" size={12} />
              </button>
            </div>
          </div>

          <div>
            <p className={styles.label}>Məbləğ</p>
            <div className={styles.amount}>{showPrice ? totalPriceText : ""}</div>
          </div>
        </div>

        <div className={styles.note}>
          <p className={styles.label}>Qeydləriniz varsa daxil edin.</p>
          <input className={styles.noteInput} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <div className={styles.delivery}>
          Çatdırılma tarixi: <strong>30 aprelə</strong>
        </div>

        <div className={styles.action}>
          <button
            type="button"
            className={styles.addButton}
            onClick={() => {
              const product = offer?.product ?? null;
              const row = offer?.row ?? null;

              const productId = product?.id ?? product?.slug ?? product?.code ?? "";
              const imageSrc = row?.img ?? product?.imageSrc ?? product?.image ?? "/assets/images/products_images/aments_products_image_1.jpg";
              const href = product?.href ?? (product?.slug ? `/product/${product.slug}` : "/product/default");

              const itemKey = `${String(productId)}::${String(row?.brand ?? "")}::${String(row?.code ?? "")}::${String(row?.warehouse ?? "")}`;
              const displayName = row?.name ?? product?.name ?? "";

              addToCart({
                key: itemKey,
                productId,
                name: displayName,
                brand: row?.brand ?? "",
                code: row?.code ?? "",
                warehouse: row?.warehouse ?? "",
                imageSrc,
                href,
                unitPrice: unitPrice ?? unitPriceText,
                unitPriceText,
                currency: currencySuffix,
                quantity,
                note,
              });

              close();

              window.dispatchEvent(
                new CustomEvent("aments:cart:added", {
                  detail: {
                    item: {
                      key: itemKey,
                      productId,
                      name: displayName,
                      imageSrc,
                      href,
                      quantity,
                    },
                  },
                })
              );
              toast.success("Səbətə uğurla əlavə edildi");
            }}
          >
            <Icon name="FaShoppingCart" size={16} /> SƏBƏTƏ AT
          </button>
        </div>
      </div>
    </Modal>
  );
}
