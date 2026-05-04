import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import TestimonialSection from "@/components/sections/about/TestimonialSection/TestimonialSection";
import styles from "./AboutUsPage.module.scss";

export default function AboutUsPage() {
  return (
    <div className={styles.scope}>
      <Breadcrumb title="About Us" items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <div className="about-us-top-area section-top-gap-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="about-us-top-content text-center">
                <h4>Store About</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia minima consequuntur nulla voluptate sunt accusamus error dolores laboriosam facere, et saepe, velit incidunt doloremque ab eius. Explicabo magnam iure et.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-us-center-area section-top-gap-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="about-us-center-content text-center">
                <h4>Why Chose Us?</h4>
              </div>
            </div>
          </div>
          <div className="row">
            {[
              { img: "/assets/images/icon/about-icon-1.jpg", title: "Creative Design", text: "Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim" },
              { img: "/assets/images/icon/about-icon-2.jpg", title: "100% Money Back Guarantee", text: "Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim" },
              { img: "/assets/images/icon/about-icon-3.jpg", title: "Online Support 24/7", text: "Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim" },
            ].map((item) => (
              <div key={item.title} className="col-lg-4 col-md-6">
                <div className="about-promo-single-item">
                  <Image src={item.img} alt={item.title} width={90} height={90} />
                  <h6>{item.title}</h6>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

      <TestimonialSection
        items={[
          { id: "t1", img: "/assets/images/testimonial/testimonial-1.png", name: "Kathy Young", role: "CEO of SunPark" },
          { id: "t2", img: "/assets/images/testimonial/testimonial-2.jpg", name: "Kathy Young", role: "CEO of SunPark" },
          { id: "t3", img: "/assets/images/testimonial/testimonial-3.jpg", name: "Kathy Young", role: "CEO of SunPark" },
        ]}
      />
    </div>
  );
}
