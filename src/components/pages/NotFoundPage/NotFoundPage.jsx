"use client";

import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import styles from "./NotFoundPage.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function NotFoundPage() {
  const { staticContent } = useInitial();
  return (
    <div className={styles.scope}>
      <Breadcrumb
        title="404 Pages"
        titleKey="notFound__breadcrumbTitle"
        items={[
          { label: "Home", labelKey: "breadcrumb__home", href: "/" },
          { label: "404" },
        ]}
      />
      <div className="error-section">
        <div className="container">
          <div className="row">
            <div className="error_form">
              <h1 data-aos="fade-up" data-aos-delay="0">
                404
              </h1>
              <h4 data-aos="fade-up" data-aos-delay="200">
                {HelperTranslate({
                  defaultText: "Opps! PAGE NOT BE FOUND",
                  translateText: staticContent?.notFound__headline,
                })}
              </h4>
              <p data-aos="fade-up" data-aos-delay="400">
                {HelperTranslate({
                  defaultText: "Sorry but the page you are looking for does not exist, have been",
                  translateText: staticContent?.notFound__messageLine1,
                })}
                <br />{" "}
                {HelperTranslate({
                  defaultText: "removed, name changed or is temporarily unavailable.",
                  translateText: staticContent?.notFound__messageLine2,
                })}
              </p>
              <div className="row">
                <div className="col-10 offset-1 col-md-6 offset-md-3">
                  <form
                    className="default-search-style d-flex"
                    data-aos="fade-up"
                    data-aos-delay="600"
                    action="#"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      className="default-search-style-input-box border-around border-right-none"
                      type="search"
                      placeholder={HelperTranslate({
                        defaultText: "Search entire store here ...",
                        translateText: staticContent?.notFound__searchPlaceholder,
                      })}
                      required
                    />
                    <button
                      className="default-search-style-input-btn"
                      type="submit"
                      aria-label={HelperTranslate({ defaultText: "Search", translateText: staticContent?.notFound__searchAria })}
                    >
                      <Icon name="FaSearch" />
                    </button>
                  </form>
                  <Link href="/" data-aos="fade-up" data-aos-delay="800">
                    {HelperTranslate({ defaultText: "Back to home page", translateText: staticContent?.notFound__backToHome })}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
