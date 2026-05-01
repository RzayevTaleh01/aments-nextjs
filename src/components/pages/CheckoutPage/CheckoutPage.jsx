"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Breadcrumb } from "@/components/ui";
import { useCart } from "@/context/ui-drawers-context";
import styles from "./CheckoutPage.module.scss";

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
  const showPrice = status === "authenticated";
  const { cartItems, cartSubtotalNumber, cartSubtotalText } = useCart();
  const user = session?.user ?? {};

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

  return (
    <div className={styles.scope}>
      <Breadcrumb
        title="Checkout"
        items={[
          { label: "Home", href: "/" },
          { label: "Checkout" },
        ]}
      />

      <div className="checkout_section">
        <div className="container">
          <div className="checkout_form">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                  <h3>Billing Details</h3>
                  <div className="row">
                    <div className="col-lg-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          First Name <span>*</span>
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
                          Last Name <span>*</span>
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
                          country <span>*</span>
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
                          Street address <span>*</span>
                        </label>
                        <input
                          placeholder="House number and street name"
                          type="text"
                          value={billing.street}
                          onChange={(e) => setBilling((prev) => ({ ...prev, street: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <div className="default-form-box">
                        <input
                          placeholder="Apartment, suite, unit etc. (optional)"
                          type="text"
                          value={billing.apartment}
                          onChange={(e) => setBilling((prev) => ({ ...prev, apartment: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <div className="default-form-box">
                        <label>
                          Town / City <span>*</span>
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
                          State / County <span>*</span>
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
                          Phone<span>*</span>
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
                          Email Address <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={billing.email}
                          onChange={(e) => setBilling((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>


                    <div className="col-12 mb-20">
                      <div id="anotherShipping" className="collapse" data-bs-parent="#anotherShipping">
                        <div className="row">
                          <div className="col-lg-6 mb-20">
                            <div className="default-form-box">
                              <label>
                                First Name <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-lg-6 mb-20">
                            <div className="default-form-box">
                              <label>
                                Last Name <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="default-form-box">
                              <label>Company Name</label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="select_form_select default-form-box">
                              <label htmlFor="countru_name">
                                country <span>*</span>
                              </label>
                              <select className="form-select" name="cuntry" id="countru_name" defaultValue="2">
                                <option value="2">Bangladesh</option>
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
                                Street address <span>*</span>
                              </label>
                              <input placeholder="House number and street name" type="text" />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="default-form-box">
                              <input placeholder="Apartment, suite, unit etc. (optional)" type="text" />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="default-form-box">
                              <label>
                                Town / City <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="default-form-box">
                              <label>
                                State / County <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-lg-6 mb-20">
                            <div className="default-form-box">
                              <label>
                                Phone<span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="default-form-box">
                              <label>
                                {" "}
                                Email Address <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="order-notes">
                        <label htmlFor="order_note">Order Notes</label>
                        <textarea id="order_note" placeholder="Notes about your order, e.g. special notes for delivery." />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-lg-6 col-md-6">
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                  <h3>Your order</h3>
                  <div className="order_table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
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
                            <td colSpan={2}>Cart is empty</td>
                          </tr>
                        ) : null}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Cart Subtotal</th>
                          <td>{showPrice ? cartSubtotalText : null}</td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td>
                            <strong>{showPrice ? formatMoney(shippingNumber, currency) : null}</strong>
                          </td>
                        </tr>
                        <tr className="order_total">
                          <th>Order Total</th>
                          <td>
                            <strong>{showPrice ? orderTotalText : null}</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {!showPrice ? <div className="mt-10">Login to see prices</div> : null}
                  <div className="payment_method">
                    <div className="order_button pt-15">
                      <button type="submit" disabled={!cartItems.length}>
                        Proceed to PayPal
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
