import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Icon } from "@/components/ui";
import styles from "./ServicePage.module.scss";

const services = [
  { title: "BRANDING", iconName: "FaChartBar" },
  { title: "WEB DESIGN", iconName: "FaUmbrella" },
  { title: "PHOTOGRAPHY", iconName: "FaCamera" },
  { title: "WEB DEVELOPMENT", iconName: "FaCog" },
  { title: "CODING", iconName: "FaFileCode" },
  { title: "MARKETING", iconName: "FaChartBar" },
  { title: "SUPPORT", iconName: "FaHeadphones" },
  { title: "GRAPHIC DESIGN", iconName: "FaLeaf" },
];

export default function ServicePage() {
  return (
    <div className={styles.scope}>
      <Breadcrumb title="Service" items={[{ label: "Home", href: "/" }, { label: "Service" }]} />

      <div className="about-us-bottom-area section-top-gap-100">
        <div className="container">
          <div className="row">
            {[
              { img: "/assets/images/about/about-feature-1.jpg", title: "What Do We Do?", text: "Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima." },
              { img: "/assets/images/about/about-feature-2.jpg", title: "Our Mission", text: "Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima." },
              { img: "/assets/images/about/about-feature-3.jpg", title: "History Of Us", text: "Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima." },
            ].map((item) => (
              <div key={item.title} className="col-lg-4 col-md-6">
                <div className="about-feature-single-item">
                  <Image className="img-fluid" src={item.img} alt={item.title} width={410} height={300} />
                  <h6>{item.title}</h6>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="service-promo section-top-gap-100 section-inner-bg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="service-content text-center">
                <h4>OUR SERVICES</h4>
                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit..
                </p>
              </div>
            </div>
          </div>
          <div className="service-promo-wrapper">
            <div className="row">
              {services.map((s) => {
                return (
                  <div key={s.title} className="col-lg-3 col-md-6">
                    <div className="service-promo-single-item">
                      <div className="service-promo-icon">
                        <Icon name={s.iconName} size={40} />
                      </div>
                      <div className="service-promo-content">
                        <h6>{s.title}</h6>
                        <p>Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="service-display-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="service-display-img">
                <Image className="img-fluid" src="/assets/images/service/service-display.jpg" alt="Service display" width={560} height={420} />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="service-display-content text-center">
                <h4>UNLIMITED IDEAS</h4>
                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem.
                </p>
                <Link href="/service">
                  MORE INFO <Icon name="FaAngleRight" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="price-section section-top-gap-100">
        <div className="container">
          <div className="row">
            {[
              { title: "STANDARD", price: "£19", period: "/MONTH" },
              { title: "RETURNS", price: "£23", period: "/MONTH" },
              { title: "AFFILIATE", price: "£20", period: "/MONTH" },
              { title: "SPECIALS", price: "£25", period: "/MONTH" },
            ].map((p) => (
              <div key={p.title} className="col-lg-3 col-md-6">
                <div className="price-single-item">
                  <div className="price-content">
                    <h6 className="price-title">{p.title}</h6>
                    <h3 className="price-value">
                      {p.price}
                      <span>{p.period}</span>
                    </h3>
                  </div>
                  <ul className="price-detail">
                    <li>2 GB Webspace</li>
                    <li>1 Domain</li>
                    <li>PHP 5 Enbled</li>
                    <li>24H – Support</li>
                    <li>
                      <Link className="price-btn" href="/service">
                        PURCHASE NOW
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
