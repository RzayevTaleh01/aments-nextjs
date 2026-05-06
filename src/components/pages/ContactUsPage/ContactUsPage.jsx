"use client";

import { useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import styles from "./ContactUsPage.module.scss";
import { changeData } from "@/utils/changeData";
import { validate } from "@/utils/validate";

export default function ContactUsPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [valueErrors, setValueErrors] = useState({});

  function handleChange(e) {
    changeData(e, data, setData, valueErrors, setValueErrors);
  }

  function validationConstraints(_, type) {
    if (type !== "contact-us") return {};
    return {
      name: { presence: { allowEmpty: false } },
      email: { presence: { allowEmpty: false }, email: true },
      subject: { presence: { allowEmpty: false } },
      message: { presence: { allowEmpty: false } },
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(data, "contact-us", validationConstraints);
    if (Object.keys(errors).length > 0) {
      setValueErrors(errors);
      return;
    }
  }

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
                      <button type="button" aria-label="Facebook">
                        <Icon name="FaFacebookF" size={16} />
                      </button>
                    </li>
                    <li>
                      <button type="button" aria-label="Twitter">
                        <Icon name="FaTwitter" size={16} />
                      </button>
                    </li>
                    <li>
                      <button type="button" aria-label="YouTube">
                        <Icon name="FaYoutube" size={16} />
                      </button>
                    </li>
                    <li>
                      <button type="button" aria-label="Google Plus">
                        <Icon name="FaGooglePlusG" size={16} />
                      </button>
                    </li>
                    <li>
                      <button type="button" aria-label="Instagram">
                        <Icon name="FaInstagram" size={16} />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-form section-top-gap-100">
                <h3>Get In Touch</h3>
                <form id="contact-form" action="#" method="POST" onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-name">Name</label>
                        <input name="name" type="text" id="contact-name" value={data.name} onChange={handleChange} />
                        {valueErrors?.name ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-email">Email</label>
                        <input name="email" type="email" id="contact-email" value={data.email} onChange={handleChange} />
                        {valueErrors?.email ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-subject">Subject</label>
                        <input name="subject" type="text" id="contact-subject" value={data.subject} onChange={handleChange} />
                        {valueErrors?.subject ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-message">Your Message</label>
                        <textarea name="message" id="contact-message" cols="30" rows="10" value={data.message} onChange={handleChange} />
                        {valueErrors?.message ? <small className="text-danger">Required</small> : null}
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
