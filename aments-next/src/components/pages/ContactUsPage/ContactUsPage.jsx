"use client";

import { Breadcrumb, Icon } from "@/components/ui";
import styles from "./ContactUsPage.module.scss";

export default function ContactUsPage() {
  return (
    <div className={styles.scope}>
      <Breadcrumb title="Contact Us" items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

      <div className="map-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe
                    id="gmap_canvas"
                    title="Map"
                    src="https://maps.google.com/maps?q=121%20King%20St%2C%20Melbourne%20VIC%203000%2C%20Australia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-details-wrapper section-top-gap-100">
                <div className="contact-details">
                  <div className="contact-details-single-item">
                    <div className="contact-details-icon">
                      <Icon name="FaPhoneAlt" size={18} />
                    </div>
                    <div className="contact-details-content contact-phone">
                      <a href="tel:+012345678102">+012 345 678 102</a>
                      <a href="tel:+012345678102">+012 345 678 102</a>
                    </div>
                  </div>
                  <div className="contact-details-single-item">
                    <div className="contact-details-icon">
                      <Icon name="FaGlobe" size={18} />
                    </div>
                    <div className="contact-details-content contact-phone">
                      <a href="mailto:urname@email.com">urname@email.com</a>
                      <a href="http://www.yourwebsite.com">www.yourwebsite.com</a>
                    </div>
                  </div>
                  <div className="contact-details-single-item">
                    <div className="contact-details-icon">
                      <Icon name="FaMapMarkerAlt" size={18} />
                    </div>
                    <div className="contact-details-content contact-phone">
                      <span>Address goes here,</span>
                      <span>street, Crossroad 123.</span>
                    </div>
                  </div>
                </div>
                <div className="contact-social">
                  <h4>Follow Us</h4>
                  <ul>
                    <li>
                      <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
                        <Icon name="FaFacebookF" size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
                        <Icon name="FaTwitter" size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-label="YouTube" onClick={(e) => e.preventDefault()}>
                        <Icon name="FaYoutube" size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-label="Google Plus" onClick={(e) => e.preventDefault()}>
                        <Icon name="FaGooglePlusG" size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
                        <Icon name="FaInstagram" size={16} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-form section-top-gap-100">
                <h3>Get In Touch</h3>
                <form id="contact-form" action="#" method="POST">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-name">Name</label>
                        <input name="name" type="text" id="contact-name" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-email">Email</label>
                        <input name="email" type="email" id="contact-email" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-subject">Subject</label>
                        <input name="subject" type="text" id="contact-subject" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-message">Your Message</label>
                        <textarea name="message" id="contact-message" cols="30" rows="10" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button className="contact-submit-btn" type="submit">
                        SEND
                      </button>
                    </div>
                    <p className="form-messege" />
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
