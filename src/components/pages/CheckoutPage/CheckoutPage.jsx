"use client";

import { Breadcrumb } from "@/components/ui";
import styles from "./CheckoutPage.module.scss";

export default function CheckoutPageClient() {
  return (
    <div className={styles.scope}>
      <Breadcrumb
        title="Checkout"
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/grid/sidebar-left" },
          { label: "Checkout" },
        ]}
      />

      <div className="checkout_section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="user-actions accordion" data-aos="fade-up" data-aos-delay="0">
                <h3>
                  Returning customer?
                  <button type="button" className="Returning" data-bs-toggle="collapse" data-bs-target="#checkout_login" aria-expanded="true">
                    Click here to login
                  </button>
                </h3>
                <div id="checkout_login" className="collapse" data-bs-parent="#checkout_login">
                  <div className="checkout_info">
                    <p>
                      If you have shopped with us before, please enter your details in the boxes below. If you are a new customer please proceed to the
                      Billing &amp; Shipping section.
                    </p>
                    <form action="#" onSubmit={(e) => e.preventDefault()}>
                      <div className="form_group default-form-box">
                        <label>
                          Username or email <span>*</span>
                        </label>
                        <input type="text" />
                      </div>
                      <div className="form_group default-form-box">
                        <label>
                          Password <span>*</span>
                        </label>
                        <input type="password" />
                      </div>
                      <div className="form_group group_3 default-form-box">
                        <button type="submit">Login</button>
                        <label className="checkbox-default">
                          <input type="checkbox" />
                          <span>Remember me</span>
                        </label>
                      </div>
                      <button type="button" className="btn btn-link p-0">
                        Lost your password?
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="user-actions accordion" data-aos="fade-up" data-aos-delay="200">
                <h3>
                  Returning customer?
                  <button type="button" className="Returning" data-bs-toggle="collapse" data-bs-target="#checkout_coupon" aria-expanded="true">
                    Click here to enter your code
                  </button>
                </h3>
                <div id="checkout_coupon" className="collapse" data-bs-parent="#checkout_coupon">
                  <div className="checkout_info">
                    <form action="#" onSubmit={(e) => e.preventDefault()}>
                      <input placeholder="Coupon code" type="text" />
                      <button type="submit">Apply coupon</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

              <div className="checkout_form" data-aos="fade-up" data-aos-delay="400">
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
                      <div className="default-form-box">
                        <label htmlFor="country">
                          country <span>*</span>
                        </label>
                        <select className="country_option nice-select wide" name="country" id="country" defaultValue="2">
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
                    <div className="col-lg-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          {" "}
                          Email Address <span>*</span>
                        </label>
                        <input type="text" />
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="checkbox-default" htmlFor="newAccount" data-bs-toggle="collapse" data-bs-target="#newAccountPassword">
                        <input type="checkbox" id="newAccount" />
                        <span>Create an account?</span>
                      </label>
                      <div id="newAccountPassword" className="collapse" data-bs-parent="#newAccountPassword">
                        <div className="card-body1 default-form-box">
                          <label>
                            {" "}
                            Account password <span>*</span>
                          </label>
                          <input placeholder="password" type="password" />
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mb-20">
                      <label className="checkbox-default" htmlFor="newShipping" data-bs-toggle="collapse" data-bs-target="#anotherShipping">
                        <input type="checkbox" id="newShipping" />
                        <span>Ship to a different address?</span>
                      </label>

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
                              <select className="niceselect_option wide" name="cuntry" id="countru_name" defaultValue="2">
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
                        <tr>
                          <td>
                            {" "}
                            Handbag fringilla <strong> × 2</strong>
                          </td>
                          <td> $165.00</td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            Handbag justo <strong> × 2</strong>
                          </td>
                          <td> $50.00</td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            Handbag elit <strong> × 2</strong>
                          </td>
                          <td> $50.00</td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            Handbag Rutrum <strong> × 1</strong>
                          </td>
                          <td> $50.00</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Cart Subtotal</th>
                          <td>$215.00</td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td>
                            <strong>$5.00</strong>
                          </td>
                        </tr>
                        <tr className="order_total">
                          <th>Order Total</th>
                          <td>
                            <strong>$220.00</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="payment_method">
                    <div className="panel-default">
                      <label className="checkbox-default" htmlFor="currencyCod" data-bs-toggle="collapse" data-bs-target="#methodCod">
                        <input type="checkbox" id="currencyCod" />
                        <span>Cash on Delivery</span>
                      </label>

                      <div id="methodCod" className="collapse" data-bs-parent="#methodCod">
                        <div className="card-body1">
                          <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                        </div>
                      </div>
                    </div>
                    <div className="panel-default">
                      <label className="checkbox-default" htmlFor="currencyPaypal" data-bs-toggle="collapse" data-bs-target="#methodPaypal">
                        <input type="checkbox" id="currencyPaypal" />
                        <span>PayPal</span>
                      </label>
                      <div id="methodPaypal" className="collapse " data-bs-parent="#methodPaypal">
                        <div className="card-body1">
                          <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</p>
                        </div>
                      </div>
                    </div>
                    <div className="order_button pt-15">
                      <button type="submit">Proceed to PayPal</button>
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
