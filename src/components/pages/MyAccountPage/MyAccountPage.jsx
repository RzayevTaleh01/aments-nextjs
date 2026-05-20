"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "./MyAccountPage.module.scss";
import { cn } from "@/utils/cn";
import ApiService from "@/services/api/ApiService";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";

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

  const t = useMemo(() => {
    return (defaultText, key) =>
      HelperTranslate({
        defaultText,
        translateText: key ? staticContent?.[key] : undefined,
      });
  }, [staticContent]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = String(window.location.hash || "");
    if (hash === "#orders") setActiveId("orders");
    if (hash === "#address") setActiveId("address");
    if (hash === "#account-details") setActiveId("account-details");
  }, []);

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
      <Breadcrumb
        title={t("My Account", "myAccount__breadcrumbTitle")}
        items={[
          { label: t("Home", "breadcrumb__home"), href: "/" },
          { label: t("My Account", "myAccount__breadcrumbTitle") },
        ]}
      />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="dashboard_tab_button">
              <ul role="tablist" className="nav flex-column dashboard-list">
                <li>
                  <TabLink id="dashboard" activeId={activeId} setActiveId={setActiveId}>
                    {t("Dashboard", "myAccount__tab__dashboard")}
                  </TabLink>
                </li>
                <li>
                  <TabLink id="orders" activeId={activeId} setActiveId={setActiveId}>
                    {t("Orders", "myAccount__tab__orders")}
                  </TabLink>
                </li>
                <li>
                  <TabLink id="address" activeId={activeId} setActiveId={setActiveId}>
                    {t("Addresses", "myAccount__tab__addresses")}
                  </TabLink>
                </li>
                <li>
                  <TabLink id="account-details" activeId={activeId} setActiveId={setActiveId}>
                    {t("Account details", "myAccount__tab__accountDetails")}
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
                    {t("Logout", "header__logout")}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-12 col-md-9 col-lg-9">
            <div className="tab-content dashboard_content">
              <TabPane id="dashboard" activeId={activeId}>
                <h4>{t("Dashboard", "myAccount__dashboard__title")}</h4>
                <p>
                  {t("From your account dashboard, you can easily check & view your", "myAccount__dashboard__line1")}{" "}
                  <button type="button" className="p-0 border-0 bg-transparent" onClick={() => setActiveId("orders")}>
                    {t("recent orders", "myAccount__dashboard__recentOrders")}
                  </button>
                  , {t("manage your", "myAccount__dashboard__line2")}{" "}
                  <button type="button" className="p-0 border-0 bg-transparent" onClick={() => setActiveId("address")}>
                    {t("shipping and billing addresses", "myAccount__dashboard__addresses")}
                  </button>{" "}
                  {t("and", "myAccount__dashboard__and")}{" "}
                  <button type="button" className="p-0 border-0 bg-transparent" onClick={() => setActiveId("account-details")}>
                    {t("Edit your password and account details.", "myAccount__dashboard__accountDetailsCta")}
                  </button>
                </p>
              </TabPane>

              <TabPane id="orders" activeId={activeId}>
                <h4>{t("Orders", "myAccount__orders__title")}</h4>
                <div className="table_page table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>{t("Order", "myAccount__orders__table__order")}</th>
                        <th>{t("Date", "myAccount__orders__table__date")}</th>
                        <th>{t("Status", "myAccount__orders__table__status")}</th>
                        <th>{t("Total", "myAccount__orders__table__total")}</th>
                        <th>{t("Actions", "myAccount__orders__table__actions")}</th>
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
                                  {t("View", "myAccount__orders__view")}
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
                <p>{t("The following addresses will be used on the checkout page by default.", "myAccount__addresses__intro")}</p>
                <h5 className="billing-address">{t("Billing address", "myAccount__addresses__billing")}</h5>
                <button type="button" className="view">
                  {t("Edit", "myAccount__addresses__edit")}
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
                <h3>{t("Account details", "myAccount__accountDetails__title")}</h3>
                <div className="login">
                  <div className="login_form_container">
                    <div className={cn(styles.account_login_form, "account_login_form")}>
                      <form action="#" onSubmit={(e) => e.preventDefault()}>
                        
                    
                        <br />
                        <div className="default-form-box mb-20">
                          <label>{t("First Name", "myAccount__accountDetails__firstName")}</label>
                          <input type="text" name="first-name" />
                        </div>
                        <div className="default-form-box mb-20">
                          <label>{t("Last Name", "myAccount__accountDetails__lastName")}</label>
                          <input type="text" name="last-name" />
                        </div>
                        <div className="default-form-box mb-20">
                          <label>{t("Email", "myAccount__accountDetails__email")}</label>
                          <input type="text" name="email-name" />
                        </div>
                        <div className="default-form-box mb-20">
                          <label>{t("Password", "myAccount__accountDetails__password")}</label>
                          <input type="password" name="user-password" />
                        </div>
                        <div className="default-form-box mb-20">
                          <label>{t("Birthdate", "myAccount__accountDetails__birthdate")}</label>
                          <input type="date" name="birthday" />
                        </div>
                        <span className="example">{t("(E.g.: 05/31/1970)", "myAccount__accountDetails__birthdateExample")}</span>
                        <br />
                      
                        <div className={cn(styles.save_button, "save_button", "primary_btn", "default_button")}>
                          <button type="submit">{t("Save", "myAccount__accountDetails__save")}</button>
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

