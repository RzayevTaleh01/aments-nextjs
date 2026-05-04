"use client";

import Link from "next/link";
import { navigation } from "@/constants/navigation";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import styles from "./Footer.module.scss";
import { cn } from "@/utils/cn";

export default function Footer() {
  const { information, account } = navigation.footer;

  return (
    <footer className="footer-section section-top-gap-100">
      {/* Start Footer Top Area */}
      <div className="footer-top section-inner-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-5">
              <div
                className="footer-widget footer-widget-contact"
              >
                <div className={styles["footer-logo"]}>
                  <Link href="/">
                    <img
                      src="/assets/images/logo/logo.png"
                      alt="Aments"
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div className={styles["footer-contact"]}>
                  <p>
                    We are a team of designers and developers that create high
                    quality Magento, Prestashop, Opencart...
                  </p>
                  <div className={styles["customer-support"]}>
                    <div className={styles["customer-support-icon"]}>
                      <img src="/assets/images/icon/support-icon.png" alt="" />
                    </div>
                    <div className="customer-support-text">
                      <span>Customer Support</span>
                      <a
                        className={styles["customer-support-text-phone"]}
                        href="tel:(08)123456789"
                      >
                        (08) 123 456 789
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-7">
              <div
                className={cn("footer-widget", styles["footer-widget-subscribe"])}
              >
                <h3 className={styles["footer-widget-title"]}>
                  Subscribe newsletter to get updated
                </h3>
                <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
                  <div className="footer-subscribe-box default-search-style d-flex">
                    <input
                      className="default-search-style-input-box border-around border-right-none subscribe-form"
                      type="email"
                      placeholder="Search entire store here ..."
                      required
                    />
                    <button
                      className="default-search-style-input-btn"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
                <p className={styles["footer-widget-subscribe-note"]}>
                  We’ll never share your email address <br /> with a
                  third-party.
                </p>
                <ul className={styles["footer-social"]}>
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
                    <button type="button" className="youtube" aria-label="YouTube">
                          <Icon name="FaYoutube" size={16} />
                    </button>
                  </li>
                  <li>
                    <button type="button" className="pinterest" aria-label="Pinterest">
                          <Icon name="FaPinterestP" size={16} />
                    </button>
                  </li>
                  <li>
                    <button type="button" className="instagram" aria-label="Instagram">
                          <Icon name="FaInstagram" size={16} />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div
                className={cn("footer-widget", styles["footer-widget-menu"])}
              >
                <h3 className={styles["footer-widget-title"]}>Information</h3>
                <div className={styles["footer-menu"]}>
                  <ul className={styles["footer-menu-nav"]}>
                    {information.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <ul className={styles["footer-menu-nav"]}>
                    {account.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End Footer Top Area */}
      {/* Start Footer Bottom Area */}
      <div className={styles["footer-bottom"]}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className={styles["copyright-area"]}>
                <p className={styles["copyright-area-text"]}>
                  Copyright &copy; {new Date().getFullYear()}{" "}
                  
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className={styles["footer-payment"]}>
                <button type="button" className="p-0 border-0 bg-transparent" aria-label="Payment methods">
                  <img
                    className="img-fluid"
                    src="/assets/images/icon/payment-icon.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End Footer Bottom Area */}
    </footer>
  );
}
