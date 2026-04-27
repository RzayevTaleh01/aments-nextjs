"use client";

import Link from "next/link";
import { navigation } from "@/constants/navigation";
import { Icon } from "@/components/ui";
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
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <div className={cn(styles["footer-logo"], "footer-logo")}>
                  <Link href="/">
                    <img
                      src="/assets/images/logo/logo.png"
                      alt="Aments"
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div className={cn(styles["footer-contact"], "footer-contact")}>
                  <p>
                    We are a team of designers and developers that create high
                    quality Magento, Prestashop, Opencart...
                  </p>
                  <div className="customer-support">
                    <div className="customer-support-icon">
                      <img src="/assets/images/icon/support-icon.png" alt="" />
                    </div>
                    <div className="customer-support-text">
                      <span>Customer Support</span>
                      <a
                        className="customer-support-text-phone"
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
                className={cn("footer-widget", styles["footer-widget-subscribe"], "footer-widget-subscribe")}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3 className={cn(styles["footer-widget-title"], "footer-widget-title")}>
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
                <p className={cn(styles["footer-widget-subscribe-note"], "footer-widget-subscribe-note")}>
                  We’ll never share your email address <br /> with a
                  third-party.
                </p>
                <ul className={cn(styles["footer-social"], "footer-social")}>
                  <li>
                    <a href="#" className="facebook" onClick={(e) => e.preventDefault()}>
                          <Icon name="FaFacebookF" size={16} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="twitter" onClick={(e) => e.preventDefault()}>
                          <Icon name="FaTwitter" size={16} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="youtube" onClick={(e) => e.preventDefault()}>
                          <Icon name="FaYoutube" size={16} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="pinterest" onClick={(e) => e.preventDefault()}>
                          <Icon name="FaPinterestP" size={16} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="instagram" onClick={(e) => e.preventDefault()}>
                          <Icon name="FaInstagram" size={16} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div
                className={cn("footer-widget", styles["footer-widget-menu"], "footer-widget-menu")}
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <h3 className={cn(styles["footer-widget-title"], "footer-widget-title")}>Information</h3>
                <div className={cn(styles["footer-menu"], "footer-menu")}>
                  <ul className={cn(styles["footer-menu-nav"], "footer-menu-nav")}>
                    {information.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <ul className={cn(styles["footer-menu-nav"], "footer-menu-nav")}>
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
      <div className={cn(styles["footer-bottom"], "footer-bottom")}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="copyright-area">
                <p className="copyright-area-text">
                  Copyright &copy; {new Date().getFullYear()}{" "}
                  
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className={cn(styles["footer-payment"], "footer-payment")}>
                <a href="#">
                  <img
                    className="img-fluid"
                    src="/assets/images/icon/payment-icon.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End Footer Bottom Area */}
    </footer>
  );
}
