"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Collapse } from "reactstrap";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { useCart } from "@/context/ui-drawers-context";
import { ORDER_POST_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";
import { toast } from "react-toastify";
import styles from "./CheckoutPage.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

function parsePriceNumber(priceText) {
  if (typeof priceText === "number" && Number.isFinite(priceText)) return priceText;
  if (typeof priceText !== "string") return null;
  const normalized = priceText.replace(",", ".").replace(/[^\d.]/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function formatMoney(value, currency) {
  const n = typeof value === "number" ? value : parsePriceNumber(value);
  if (!Number.isFinite(n)) return currency ? `0.00 ${currency}` : "0.00";
  const text = n.toFixed(2);
  return currency ? `${text} ${currency}` : text;
}

export default function CheckoutPageClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const showPrice = status === "authenticated";
  const { cartItems, cartSubtotalNumber, cartSubtotalText, clearCart } = useCart();
  const { staticContent } = useInitial();
  const user = session?.user ?? {};
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    street: "",
    apartment: "",
    city: "",
    region: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (status !== "authenticated") return;

    setBilling((prev) => ({
      ...prev,
      firstName: user?.first_name ?? user?.firstName ?? prev.firstName,
      lastName: user?.last_name ?? user?.lastName ?? prev.lastName,
      companyName: user?.companyName ?? user?.company_name ?? prev.companyName,
      country: user?.country ?? prev.country,
      street: user?.street ?? prev.street,
      apartment: user?.home_office ?? user?.apartment ?? prev.apartment,
      city: user?.city ?? prev.city,
      region: user?.region ?? user?.state ?? prev.region,
      phoneNumber: user?.phoneNumber ?? user?.phone ?? prev.phoneNumber,
      email: user?.email ?? prev.email,
    }));
  }, [status, user]);

  const currency = useMemo(() => {
    const first = cartItems.find((x) => x?.currency);
    return first?.currency ?? "";
  }, [cartItems]);

  const shippingNumber = 0;
  const orderTotalText = useMemo(() => {
    const total = (Number.isFinite(cartSubtotalNumber) ? cartSubtotalNumber : 0) + shippingNumber;
    return formatMoney(total, currency);
  }, [cartSubtotalNumber, currency, shippingNumber]);

  async function submitOrder() {
    if (isSubmitting) return;
    if (status !== "authenticated") {
      toast.error(
        HelperTranslate({
          defaultText: "Please log in to complete the order",
          translateText: staticContent?.checkout__loginToCompleteOrderToast,
        })
      );
      return;
    }
    if (!cartItems.length) return;

    const payloads = cartItems.map((item) => {
      const storageProductId = item?.storageProductId ?? item?.storage_product_id ?? null;
      if (storageProductId == null) return null;

      const quantity = Math.max(1, Number(item?.quantity ?? 1));
      const unit = parsePriceNumber(item?.unitPrice) ?? parsePriceNumber(item?.unitPriceText) ?? 0;
      const total = unit * quantity;

      const storageProductIdNumber = Number(storageProductId);
      return {
        quantity,
        storage_product_id: Number.isFinite(storageProductIdNumber) ? storageProductIdNumber : storageProductId,
        total_price: Number.isFinite(total) ? total : 0,
      };
    });

    if (payloads.some((x) => !x)) {
      toast.error(
        HelperTranslate({
          defaultText: "storage_product_id was not found in cart",
          translateText: staticContent?.checkout__cartMissingProductIdToast,
        })
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await Promise.all(payloads.map((body) => ApiService.post(ORDER_POST_ROUTE, body)));
      toast.success(
        HelperTranslate({
          defaultText: "Order submitted successfully",
          translateText: staticContent?.checkout__orderSuccessToast,
        })
      );
      clearCart();
      router.push("/");
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.scope}>
      <Breadcrumb
        title="Checkout"
        titleKey="checkout__breadcrumbTitle"
        items={[
          { label: "Home", labelKey: "breadcrumb__home", href: "/" },
          { label: "Checkout", labelKey: "checkout__breadcrumbTitle" },
        ]}
      />

      <div className="checkout_section">
        <div className="container">
          <div className="checkout_form">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                  <h3>
                    {HelperTranslate({ defaultText: "Billing Details", translateText: staticContent?.checkout__billingDetails })}
                  </h3>
                  <div className="row">
                    <div className="col-lg-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          {HelperTranslate({ defaultText: "First Name", translateText: staticContent?.checkout__firstName })} <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={billing.firstName}
                          onChange={(e) => setBilling((prev) => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          {HelperTranslate({ defaultText: "Last Name", translateText: staticContent?.checkout__lastName })} <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={billing.lastName}
                          onChange={(e) => setBilling((prev) => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <div className="default-form-box">
                        <label htmlFor="country">
                          {HelperTranslate({ defaultText: "Country", translateText: staticContent?.checkout__country })} <span>*</span>
                        </label>
                        <input
                          id="country"
                          type="text"
                          value={billing.country}
                          onChange={(e) => setBilling((prev) => ({ ...prev, country: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <div className="default-form-box">
                        <label>
                          {HelperTranslate({ defaultText: "Street address", translateText: staticContent?.checkout__streetAddress })} <span>*</span>
                        </label>
                        <input
                          placeholder={HelperTranslate({
                            defaultText: "House number and street name",
                            translateText: staticContent?.checkout__streetPlaceholderHouseNumber,
                          })}
                          type="text"
                          value={billing.street}
                          onChange={(e) => setBilling((prev) => ({ ...prev, street: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <div className="default-form-box">
                        <input
                          placeholder={HelperTranslate({
                            defaultText: "Apartment, suite, unit etc. (optional)",
                            translateText: staticContent?.checkout__apartmentPlaceholder,
                          })}
                          type="text"
                          value={billing.apartment}
                          onChange={(e) => setBilling((prev) => ({ ...prev, apartment: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <div className="default-form-box">
                        <label>
                          {HelperTranslate({ defaultText: "Town / City", translateText: staticContent?.checkout__townCity })} <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={billing.city}
                          onChange={(e) => setBilling((prev) => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <div className="default-form-box">
                        <label>
                          {HelperTranslate({ defaultText: "State / County", translateText: staticContent?.checkout__stateCounty })} <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={billing.region}
                          onChange={(e) => setBilling((prev) => ({ ...prev, region: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          {HelperTranslate({ defaultText: "Phone", translateText: staticContent?.checkout__phone })}
                          <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={billing.phoneNumber}
                          onChange={(e) => setBilling((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          {" "}
                          {HelperTranslate({ defaultText: "Email Address", translateText: staticContent?.checkout__emailAddress })} <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={billing.email}
                          onChange={(e) => setBilling((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>


                    <div className="col-12 mb-20">
                      <div className="checkout_account">
                        <label className="checkbox-default" htmlFor="shipDifferentAddress">
                          <input
                            type="checkbox"
                            id="shipDifferentAddress"
                            checked={shipToDifferentAddress}
                            onChange={(e) => setShipToDifferentAddress(e.target.checked)}
                          />
                          <span>
                            {HelperTranslate({
                              defaultText: "Ship to a different address?",
                              translateText: staticContent?.checkout__shipDifferentAddress,
                            })}
                          </span>
                        </label>
                      </div>

                      <Collapse isOpen={shipToDifferentAddress}>
                        <div id="anotherShipping" className="row">
                          <div className="col-lg-6 mb-20">
                            <div className="default-form-box">
                              <label>
                                {HelperTranslate({ defaultText: "First Name", translateText: staticContent?.checkout__firstName })} <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-lg-6 mb-20">
                            <div className="default-form-box">
                              <label>
                                {HelperTranslate({ defaultText: "Last Name", translateText: staticContent?.checkout__lastName })} <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="default-form-box">
                              <label>
                                {HelperTranslate({ defaultText: "Company Name", translateText: staticContent?.checkout__companyName })}
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="select_form_select default-form-box">
                              <label htmlFor="countru_name">
                                {HelperTranslate({ defaultText: "Country", translateText: staticContent?.checkout__country })} <span>*</span>
                              </label>
                              <select className="form-select" name="cuntry" id="countru_name" defaultValue="2">
                                <option value="2">Azerbaijan</option>
                                <option value="3">Algeria</option>
                                <option value="4">Afghanistan</option>
                                <option value="5">Ghana</option>
                                <option value="6">Albania</option>
                                <option value="7">Bahrain</option>
                                <option value="8">Colombia</option>
                                <option value="9">Dominican Republic</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-12 mb-20">
                            <div className="default-form-box">
                              <label>
                                {HelperTranslate({ defaultText: "Street address", translateText: staticContent?.checkout__streetAddress })} <span>*</span>
                              </label>
                              <input
                                placeholder={HelperTranslate({
                                  defaultText: "House number and street name",
                                  translateText: staticContent?.checkout__streetPlaceholderHouseNumber,
                                })}
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="default-form-box">
                              <input
                                placeholder={HelperTranslate({
                                  defaultText: "Apartment, suite, unit etc. (optional)",
                                  translateText: staticContent?.checkout__apartmentPlaceholder,
                                })}
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="default-form-box">
                              <label>
                                {HelperTranslate({ defaultText: "Town / City", translateText: staticContent?.checkout__townCity })} <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="default-form-box">
                              <label>
                                {HelperTranslate({ defaultText: "State / County", translateText: staticContent?.checkout__stateCounty })} <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-lg-6 mb-20">
                            <div className="default-form-box">
                              <label>
                                {HelperTranslate({ defaultText: "Phone", translateText: staticContent?.checkout__phone })}
                                <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="default-form-box">
                              <label>
                                {" "}
                                {HelperTranslate({ defaultText: "Email Address", translateText: staticContent?.checkout__emailAddress })} <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </div>

                    <div className="col-12">
                      <div className="order-notes">
                        <label htmlFor="order_note">
                          {HelperTranslate({ defaultText: "Order Notes", translateText: staticContent?.checkout__orderNotes })}
                        </label>
                        <textarea
                          id="order_note"
                          placeholder={HelperTranslate({
                            defaultText: "Notes about your order, e.g. special notes for delivery.",
                            translateText: staticContent?.checkout__orderNotesPlaceholder,
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-lg-6 col-md-6">
                <form
                  action="#"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitOrder();
                  }}
                >
                  <h3>{HelperTranslate({ defaultText: "Your order", translateText: staticContent?.checkout__yourOrder })}</h3>
                  <div className="order_table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>{HelperTranslate({ defaultText: "Product", translateText: staticContent?.checkout__tableProduct })}</th>
                          <th>{HelperTranslate({ defaultText: "Total", translateText: staticContent?.checkout__tableTotal })}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((row) => {
                          const unit = parsePriceNumber(row.unitPrice) ?? parsePriceNumber(row.unitPriceText) ?? 0;
                          const qty = Number(row.quantity ?? 1);
                          const total = unit * (Number.isFinite(qty) ? qty : 1);
                          const lineTotalText = formatMoney(total, row.currency ?? currency);

                          return (
                            <tr key={row.key}>
                              <td>
                                {row.name} <strong>× {row.quantity ?? 1}</strong>
                              </td>
                              <td>{showPrice ? lineTotalText : null}</td>
                            </tr>
                          );
                        })}
                        {cartItems.length === 0 ? (
                          <tr>
                            <td colSpan={2}>{HelperTranslate({ defaultText: "Cart is empty", translateText: staticContent?.cart__empty })}</td>
                          </tr>
                        ) : null}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>{HelperTranslate({ defaultText: "Cart Subtotal", translateText: staticContent?.checkout__cartSubtotal })}</th>
                          <td>{showPrice ? cartSubtotalText : null}</td>
                        </tr>
                        <tr>
                          <th>{HelperTranslate({ defaultText: "Shipping", translateText: staticContent?.checkout__shipping })}</th>
                          <td>
                            <strong>{showPrice ? formatMoney(shippingNumber, currency) : null}</strong>
                          </td>
                        </tr>
                        <tr className="order_total">
                          <th>{HelperTranslate({ defaultText: "Order Total", translateText: staticContent?.checkout__orderTotal })}</th>
                          <td>
                            <strong>{showPrice ? orderTotalText : null}</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {!showPrice ? (
                    <div className="mt-10">
                      {HelperTranslate({ defaultText: "Login to see prices", translateText: staticContent?.checkout__loginToSeePrices })}
                    </div>
                  ) : null}
                  <div className="payment_method">
                    <div className="order_button pt-15">
                      <button type="submit" disabled={!cartItems.length || isSubmitting}>
                        {HelperTranslate({ defaultText: "Complete", translateText: staticContent?.checkout__complete })}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
