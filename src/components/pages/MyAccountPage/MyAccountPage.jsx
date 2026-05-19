"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "./MyAccountPage.module.scss";
import { cn } from "@/utils/cn";
import ApiService from "@/services/api/ApiService";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

function TabLink({ id, activeId, setActiveId, children }) {
  const isActive = activeId === id;
  return (
    <button type="button" className={`nav-link${isActive ? " active" : ""}`} onClick={() => setActiveId(id)}>
      {children}
    </button>
  );
}

function TabPane({ id, activeId, children }) {
  const isActive = activeId === id;
  return (
    <div className={`tab-pane fade${isActive ? " show active" : ""}`} id={id}>
      {children}
    </div>
  );
}

export default function MyAccountPageClient() {
  const [activeId, setActiveId] = useState("dashboard");
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user ?? {};
  const { staticContent } = useInitial();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const fullName = `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim();
  const displayName = fullName || user?.username || user?.email || "";

  const billingAddressLine = [user?.street, user?.home_number, user?.home_office].filter(Boolean).join(" ");
  const cityRegionLine = [user?.post_index, user?.city, user?.region].filter(Boolean).join(", ");
  const countryLine = [user?.country].filter(Boolean).join("");

  const processingLabel = useMemo(
    () =>
      HelperTranslate({
        defaultText: "Processing",
        translateText: staticContent?.myAccount__orderStatus__processing,
      }),
    [staticContent]
  );

  useEffect(() => {
    let isActive = true;
    setOrdersLoading(true);

    const normalizeOrders = (resp) => {
      const payload = resp?.data?.data ?? resp?.data ?? null;
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload?.data)) return payload.data;
      if (Array.isArray(payload?.items)) return payload.items;
      if (Array.isArray(payload?.orders)) return payload.orders;
      return [];
    };

    ApiService.get("/order/")
      .then((resp) => {
        if (!isActive) return;
        setOrders(normalizeOrders(resp));
      })
      .catch(() => {
        if (!isActive) return;
        setOrders([]);
      })
      .finally(() => {
        if (!isActive) return;
        setOrdersLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="account_dashboard">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="dashboard_tab_button">
              <ul role="tablist" className="nav flex-column dashboard-list">
                <li>
                  <TabLink id="dashboard" activeId={activeId} setActiveId={setActiveId}>
                    Dashboard
                  </TabLink>
                </li>
                <li>
                  <TabLink id="orders" activeId={activeId} setActiveId={setActiveId}>
                    Orders
                  </TabLink>
                </li>
                <li>
                  <TabLink id="address" activeId={activeId} setActiveId={setActiveId}>
                    Addresses
                  </TabLink>
                </li>
                <li>
                  <TabLink id="account-details" activeId={activeId} setActiveId={setActiveId}>
                    Account details
                  </TabLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="nav-link"
                    onClick={async () => {
                      await signOut({ redirect: false });
                      router.push("/");
                    }}
                  >
                    logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-12 col-md-9 col-lg-9">
            <div className="tab-content dashboard_content">
              <TabPane id="dashboard" activeId={activeId}>
                <h4>Dashboard </h4>
                <p>
                  From your account dashboard. you can easily check &amp; view your{" "}
                  <button type="button" className="p-0 border-0 bg-transparent" onClick={() => setActiveId("orders")}>
                    recent orders
                  </button>
                  , manage your{" "}
                  <button type="button" className="p-0 border-0 bg-transparent" onClick={() => setActiveId("address")}>
                    shipping and billing addresses
                  </button>{" "}
                  and{" "}
                  <button type="button" className="p-0 border-0 bg-transparent" onClick={() => setActiveId("account-details")}>
                    Edit your password and account details.
                  </button>
                </p>
              </TabPane>

              <TabPane id="orders" activeId={activeId}>
                <h4>Orders</h4>
                <div className="table_page table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersLoading ? (
                        <tr>
                          <td colSpan={5}>
                            {HelperTranslate({
                              defaultText: "Loading...",
                              translateText: staticContent?.common__loading,
                            })}
                          </td>
                        </tr>
                      ) : orders?.length ? (
                        orders.map((o) => {
                          const id = o?.id ?? "-";
                          const dateRaw = o?.createdAt ?? o?.created_at ?? o?.date ?? null;
                          const date = dateRaw ? String(dateRaw) : "-";
                          const total = o?.total_price ?? o?.totalPrice ?? "-";
                          const qty = Number(o?.quantity ?? o?.qty ?? 0) || 0;

                          return (
                            <tr key={String(id)}>
                              <td>{id}</td>
                              <td>{date}</td>
                              <td>{processingLabel}</td>
                              <td>
                                {String(total)}
                                {qty ? ` (${qty})` : ""}
                              </td>
                              <td>
                                <button type="button" className="view" disabled aria-disabled="true">
                                  view
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5}>
                            {HelperTranslate({
                              defaultText: "No results found",
                              translateText: staticContent?.common__noResults,
                            })}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabPane>

              <TabPane id="address" activeId={activeId}>
                <p>The following addresses will be used on the checkout page by default.</p>
                <h5 className="billing-address">Billing address</h5>
                <button type="button" className="view">
                  Edit
                </button>
                <p>
                  <strong>{displayName || " "}</strong>
                </p>
                <address>
                  {billingAddressLine ? (
                    <>
                      {billingAddressLine}
                      <br />
                    </>
                  ) : null}
                  {cityRegionLine ? (
                    <>
                      {cityRegionLine}
                      <br />
                    </>
                  ) : null}
                  {countryLine ? (
                    <>
                      {countryLine}
                      <br />
                    </>
                  ) : null}
                  {user?.phoneNumber || user?.phone ? (
                    <>
                      {user?.phoneNumber ?? user?.phone}
                      <br />
                    </>
                  ) : null}
                  {user?.email ? user.email : null}
                </address>
              </TabPane>

              <TabPane id="account-details" activeId={activeId}>
                <h3>Account details </h3>
                <div className="login">
                  <div className="login_form_container">
                    <div className={cn(styles.account_login_form, "account_login_form")}>
                      <form action="#" onSubmit={(e) => e.preventDefault()}>
                        
                        <div className={cn(styles["input-radio"], "input-radio")}>
                          <span className="custom-radio">
                            <input type="radio" value="1" name="id_gender" /> Mr.
                          </span>
                          <span className="custom-radio">
                            <input type="radio" value="1" name="id_gender" /> Mrs.
                          </span>
                        </div>
                        <br />
                        <div className="default-form-box mb-20">
                          <label>First Name</label>
                          <input type="text" name="first-name" />
                        </div>
                        <div className="default-form-box mb-20">
                          <label>Last Name</label>
                          <input type="text" name="last-name" />
                        </div>
                        <div className="default-form-box mb-20">
                          <label>Email</label>
                          <input type="text" name="email-name" />
                        </div>
                        <div className="default-form-box mb-20">
                          <label>Password</label>
                          <input type="password" name="user-password" />
                        </div>
                        <div className="default-form-box mb-20">
                          <label>Birthdate</label>
                          <input type="date" name="birthday" />
                        </div>
                        <span className="example">(E.g.: 05/31/1970)</span>
                        <br />
                        <label className="checkbox-default" htmlFor="offer">
                          <input type="checkbox" id="offer" />
                          <span>Receive offers from our partners</span>
                        </label>
                        <br />
                        <label className="checkbox-default checkbox-default-more-text" htmlFor="newsletter">
                          <input type="checkbox" id="newsletter" />
                          <span>
                            Sign up for our newsletter
                            <br />
                            <em>
                              You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.
                            </em>
                          </span>
                        </label>
                        <div className={cn(styles.save_button, "save_button", "primary_btn", "default_button")}>
                          <button type="submit">Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </TabPane>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

