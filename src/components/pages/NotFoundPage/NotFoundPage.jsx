"use client";

import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  return (
    <div className={styles.scope}>
      <Breadcrumb title="404 Pages" items={[{ label: "Home", href: "/" }, { label: "404" }]} />
      <div className="error-section">
        <div className="container">
          <div className="row">
            <div className="error_form">
              <h1 data-aos="fade-up" data-aos-delay="0">
                404
              </h1>
              <h4 data-aos="fade-up" data-aos-delay="200">
                Opps! PAGE NOT BE FOUND
              </h4>
              <p data-aos="fade-up" data-aos-delay="400">
                Sorry but the page you are looking for does not exist, have been
                <br /> removed, name changed or is temporarily unavailable.
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
                    <input className="default-search-style-input-box border-around border-right-none" type="search" placeholder="Search entire store here ..." required />
                    <button className="default-search-style-input-btn" type="submit" aria-label="Search">
                      <Icon name="FaSearch" />
                    </button>
                  </form>
                  <Link href="/" data-aos="fade-up" data-aos-delay="800">
                    Back to home page
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
