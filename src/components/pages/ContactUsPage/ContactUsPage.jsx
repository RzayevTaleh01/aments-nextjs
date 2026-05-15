"use client";

import { useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import styles from "./ContactUsPage.module.scss";
import { changeData } from "@/utils/changeData";
import { validate } from "@/utils/validate";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function ContactUsPage() {
  const { staticContent } = useInitial();
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
      <Breadcrumb
        title="Contact Us"
        titleKey="contact__breadcrumbTitle"
        items={[{ label: "Home", labelKey: "breadcrumb__home", href: "/" }, { label: "Contact Us" }]}
      />

      <div className="map-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe
                    id="gmap_canvas"
                    title={HelperTranslate({ defaultText: "Map", translateText: staticContent?.contact__mapTitle })}
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
                      <span>
                        {HelperTranslate({ defaultText: "Address goes here,", translateText: staticContent?.contact__addressLine1 })}
                      </span>
                      <span>
                        {HelperTranslate({ defaultText: "street, Crossroad 123.", translateText: staticContent?.contact__addressLine2 })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="contact-social">
                  <h4>{HelperTranslate({ defaultText: "Follow Us", translateText: staticContent?.contact__followUs })}</h4>
                  <ul>
                    <li>
                      <button
                        type="button"
                        aria-label={HelperTranslate({ defaultText: "Facebook", translateText: staticContent?.contact__facebook })}
                      >
                        <Icon name="FaFacebookF" size={16} />
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        aria-label={HelperTranslate({ defaultText: "Twitter", translateText: staticContent?.contact__twitter })}
                      >
                        <Icon name="FaTwitter" size={16} />
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        aria-label={HelperTranslate({ defaultText: "YouTube", translateText: staticContent?.contact__youtube })}
                      >
                        <Icon name="FaYoutube" size={16} />
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        aria-label={HelperTranslate({ defaultText: "Google Plus", translateText: staticContent?.contact__googlePlus })}
                      >
                        <Icon name="FaGooglePlusG" size={16} />
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        aria-label={HelperTranslate({ defaultText: "Instagram", translateText: staticContent?.contact__instagram })}
                      >
                        <Icon name="FaInstagram" size={16} />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-form section-top-gap-100">
                <h3>{HelperTranslate({ defaultText: "Get In Touch", translateText: staticContent?.contact__getInTouch })}</h3>
                <form id="contact-form" action="#" method="POST" onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-name">
                          {HelperTranslate({ defaultText: "Name", translateText: staticContent?.contact__name })}
                        </label>
                        <input name="name" type="text" id="contact-name" value={data.name} onChange={handleChange} />
                        {valueErrors?.name ? (
                          <small className="text-danger">
                            {HelperTranslate({ defaultText: "Required", translateText: staticContent?.common__required })}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-email">
                          {HelperTranslate({ defaultText: "Email", translateText: staticContent?.contact__email })}
                        </label>
                        <input name="email" type="email" id="contact-email" value={data.email} onChange={handleChange} />
                        {valueErrors?.email ? (
                          <small className="text-danger">
                            {HelperTranslate({ defaultText: "Required", translateText: staticContent?.common__required })}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-subject">
                          {HelperTranslate({ defaultText: "Subject", translateText: staticContent?.contact__subject })}
                        </label>
                        <input name="subject" type="text" id="contact-subject" value={data.subject} onChange={handleChange} />
                        {valueErrors?.subject ? (
                          <small className="text-danger">
                            {HelperTranslate({ defaultText: "Required", translateText: staticContent?.common__required })}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="default-form-box mb-20">
                        <label htmlFor="contact-message">
                          {HelperTranslate({ defaultText: "Your Message", translateText: staticContent?.contact__yourMessage })}
                        </label>
                        <textarea name="message" id="contact-message" cols="30" rows="10" value={data.message} onChange={handleChange} />
                        {valueErrors?.message ? (
                          <small className="text-danger">
                            {HelperTranslate({ defaultText: "Required", translateText: staticContent?.common__required })}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button className="contact-submit-btn" type="submit">
                        {HelperTranslate({ defaultText: "SEND", translateText: staticContent?.contact__send })}
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
