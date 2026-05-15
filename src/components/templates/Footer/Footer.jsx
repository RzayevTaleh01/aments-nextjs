"use client";

import Link from "next/link";
import { navigation } from "@/constants/navigation";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import styles from "./Footer.module.scss";
import { cn } from "@/utils/cn";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function Footer() {
  const { information, account } = navigation.footer;
  const { staticContent } = useInitial();

  return (
    <footer className="footer-section section-top-gap-100">
      {/* Start Footer Top Area */}
      <div className="footer-top section-inner-bg">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-3 col-md-3 col-sm-5">
              <div
                className="footer-widget footer-widget-contact"
              >
                <div className={styles["footer-logo"]}>
                  <Link href="/">
                    <img
                      src="/assets/images/company_logo/company_logo_2.png"
                      alt={HelperTranslate({ defaultText: "Logo", translateText: staticContent?.footer__logoAlt })}
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div className={styles["footer-contact"]}>
                  <p>
                    {HelperTranslate({
                      defaultText: "We are a team of designers and developers that create high quality Magento, Prestashop, Opencart...",
                      translateText: staticContent?.footer__aboutText,
                    })}
                  </p>
                  <div className={styles["customer-support"]}>
                    <div className={styles["customer-support-icon"]}>
                      <img src="/assets/images/icon/support-icon.png" alt="" />
                    </div>
                    <div className="customer-support-text">
                      <span>
                        {HelperTranslate({ defaultText: "Customer Support", translateText: staticContent?.footer__customerSupport })}
                      </span>
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
            <div className="col-lg-5 col-md-5">
              <div
                className={cn("footer-widget", styles["footer-widget-menu"])}
              >
                <h3 className={styles["footer-widget-title"]}>
                  {HelperTranslate({ defaultText: "Information", translateText: staticContent?.footer__informationTitle })}
                </h3>
                <div className={styles["footer-menu"]}>
                  <ul className={styles["footer-menu-nav"]}>
                    {information.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>
                          {HelperTranslate({
                            defaultText: item.label,
                            translateText: staticContent?.[`footer__infoLink__${String(item.label || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`],
                          })}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className={styles["footer-menu-nav"]}>
                    {account.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>
                          {HelperTranslate({
                            defaultText: item.label,
                            translateText: staticContent?.[`footer__accountLink__${String(item.label || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`],
                          })}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className={styles["footer-social"]}>
                  <li>
                    <button
                      type="button"
                      className="facebook"
                      aria-label={HelperTranslate({ defaultText: "Facebook", translateText: staticContent?.contact__facebook })}
                    >
                          <Icon name="FaFacebookF" size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="twitter"
                      aria-label={HelperTranslate({ defaultText: "Twitter", translateText: staticContent?.contact__twitter })}
                    >
                          <Icon name="FaTwitter" size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="youtube"
                      aria-label={HelperTranslate({ defaultText: "YouTube", translateText: staticContent?.contact__youtube })}
                    >
                          <Icon name="FaYoutube" size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="pinterest"
                      aria-label={HelperTranslate({ defaultText: "Pinterest", translateText: staticContent?.footer__pinterest })}
                    >
                          <Icon name="FaPinterestP" size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="instagram"
                      aria-label={HelperTranslate({ defaultText: "Instagram", translateText: staticContent?.contact__instagram })}
                    >
                          <Icon name="FaInstagram" size={16} />
                    </button>
                  </li>
                </ul>
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
                  {HelperTranslate({ defaultText: "Copyright", translateText: staticContent?.footer__copyright })}{" "}
                  &copy; {new Date().getFullYear()}{" "}
                  
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className={styles["footer-payment"]}>
                <button
                  type="button"
                  className="p-0 border-0 bg-transparent"
                  aria-label={HelperTranslate({ defaultText: "Payment methods", translateText: staticContent?.footer__paymentMethodsAria })}
                >
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
