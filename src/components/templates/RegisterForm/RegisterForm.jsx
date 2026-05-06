"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./RegisterForm.module.scss";

export default function RegisterTemplate({
  form,
  fieldErrors,
  isSubmitting,
  hasAnyError,
  onChange,
  onSubmit,
}) {
  const safeForm = form ?? {};
  const safeErrors = fieldErrors ?? {};
  const handleChange = onChange ?? (() => {});
  const handleSubmit = onSubmit ?? ((e) => e?.preventDefault?.());

  return (
    <div className="customer_login">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={cn(styles.account_form, "account_form", styles.register, "register")}>
              <h3>Register</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-lg-6 mb-30">
                    <h5 className="mb-20">Registration Details</h5>
                    <div className="default-form-box mb-20">
                      <label>
                        Email <span>*</span>
                      </label>
                      <input name="email" type="email" value={safeForm.email ?? ""} onChange={handleChange} />
                      {safeErrors.email ? <small className="text-danger">Required</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Username <span>*</span>
                      </label>
                      <input name="username" type="text" value={safeForm.username ?? ""} onChange={handleChange} />
                      {safeErrors.username ? <small className="text-danger">Required</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Password <span>*</span>
                      </label>
                      <input name="password" type="password" value={safeForm.password ?? ""} onChange={handleChange} />
                      {safeErrors.password ? <small className="text-danger">Required</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Confirm Password <span>*</span>
                      </label>
                      <input name="passwordConfirm" type="password" value={safeForm.passwordConfirm ?? ""} onChange={handleChange} />
                      {safeErrors.passwordConfirm ? <small className="text-danger">Required</small> : null}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-30">
                    <h5 className="mb-20">Contact Information</h5>
                    <div className="default-form-box mb-20">
                      <label>
                        First Name <span>*</span>
                      </label>
                      <input name="first_name" type="text" value={safeForm.first_name ?? ""} onChange={handleChange} />
                      {safeErrors.first_name ? <small className="text-danger">Required</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Last Name <span>*</span>
                      </label>
                      <input name="last_name" type="text" value={safeForm.last_name ?? ""} onChange={handleChange} />
                      {safeErrors.last_name ? <small className="text-danger">Required</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Phone Number <span>*</span>
                      </label>
                      <input
                        name="phoneNumber"
                        type="text"
                        inputMode="tel"
                        value={safeForm.phoneNumber ?? ""}
                        onChange={handleChange}
                        placeholder="994..."
                      />
                      {safeErrors.phoneNumber ? <small className="text-danger">Required</small> : null}
                    </div>
                  </div>
                </div>

                <div className="mb-30">
                  <h5 className="mb-20">Shipping Address</h5>
                  <div className="row">
                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          Postal Code <span>*</span>
                        </label>
                        <input name="post_index" type="text" value={safeForm.post_index ?? ""} onChange={handleChange} />
                        {safeErrors.post_index ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          Country <span>*</span>
                        </label>
                        <input name="country" type="text" value={safeForm.country ?? ""} onChange={handleChange} />
                        {safeErrors.country ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          Region/State <span>*</span>
                        </label>
                        <input name="region" type="text" value={safeForm.region ?? ""} onChange={handleChange} />
                        {safeErrors.region ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          City <span>*</span>
                        </label>
                        <input name="city" type="text" value={safeForm.city ?? ""} onChange={handleChange} />
                        {safeErrors.city ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          Street <span>*</span>
                        </label>
                        <input name="street" type="text" value={safeForm.street ?? ""} onChange={handleChange} />
                        {safeErrors.street ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          House Number <span>*</span>
                        </label>
                        <input name="home_number" type="text" value={safeForm.home_number ?? ""} onChange={handleChange} />
                        {safeErrors.home_number ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          Apartment/Office <span>*</span>
                        </label>
                        <input
                          name="home_office"
                          type="text"
                          value={safeForm.home_office ?? ""}
                          onChange={handleChange}
                          placeholder="Apartment / Office"
                        />
                        {safeErrors.home_office ? <small className="text-danger">Required</small> : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-30">
                  <div className="form-check mb-10">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      checked={Boolean(safeForm.acceptTerms)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      I have read and agree to the Terms and Conditions <span>*</span>
                    </label>
                    {safeErrors.acceptTerms ? <small className="text-danger d-block">Required</small> : null}
                  </div>

                  <div className="form-check">
                    <input
                      id="acceptPrivacy"
                      name="acceptPrivacy"
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      checked={Boolean(safeForm.acceptPrivacy)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="acceptPrivacy">
                      I agree to the processing of my personal data and accept the policy <span>*</span>
                    </label>
                    {safeErrors.acceptPrivacy ? <small className="text-danger d-block">Required</small> : null}
                  </div>
                </div>

                <div className={cn(styles.login_submit, "login_submit")}>
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Register"}
                  </button>
                  {hasAnyError ? <small className="text-danger mt-10">Please check the highlighted fields.</small> : null}
                  <p className="mb-0 mt-10">
                    Already have an account?{" "}
                    <Link className="text-danger" href="/login">
                      Log in instead!
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
