"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./RegisterForm.module.scss";

export default function RegisterTemplate({
  form,
  fieldErrors,
  isSubmitting,
  hasAnyError,
  onFieldChange,
  onSubmit,
}) {
  const safeForm = form ?? {};
  const safeErrors = fieldErrors ?? {};
  const setField = onFieldChange ?? (() => {});
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
                      <input type="email" value={safeForm.email ?? ""} onChange={(e) => setField("email", e.target.value)} />
                      {safeErrors.email ? <small className="text-danger">{safeErrors.email}</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Username <span>*</span>
                      </label>
                      <input type="text" value={safeForm.username ?? ""} onChange={(e) => setField("username", e.target.value)} />
                      {safeErrors.username ? <small className="text-danger">{safeErrors.username}</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Password <span>*</span>
                      </label>
                      <input type="password" value={safeForm.password ?? ""} onChange={(e) => setField("password", e.target.value)} />
                      {safeErrors.password ? <small className="text-danger">{safeErrors.password}</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Confirm Password <span>*</span>
                      </label>
                      <input type="password" value={safeForm.passwordConfirm ?? ""} onChange={(e) => setField("passwordConfirm", e.target.value)} />
                      {safeErrors.passwordConfirm ? <small className="text-danger">{safeErrors.passwordConfirm}</small> : null}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-30">
                    <h5 className="mb-20">Contact Information</h5>
                    <div className="default-form-box mb-20">
                      <label>
                        First Name <span>*</span>
                      </label>
                      <input type="text" value={safeForm.first_name ?? ""} onChange={(e) => setField("first_name", e.target.value)} />
                      {safeErrors.first_name ? <small className="text-danger">{safeErrors.first_name}</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Last Name <span>*</span>
                      </label>
                      <input type="text" value={safeForm.last_name ?? ""} onChange={(e) => setField("last_name", e.target.value)} />
                      {safeErrors.last_name ? <small className="text-danger">{safeErrors.last_name}</small> : null}
                    </div>

                    <div className="default-form-box mb-20">
                      <label>
                        Phone Number <span>*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="tel"
                        value={safeForm.phoneNumber ?? ""}
                        onChange={(e) => setField("phoneNumber", e.target.value)}
                        placeholder="994..."
                      />
                      {safeErrors.phoneNumber ? <small className="text-danger">{safeErrors.phoneNumber}</small> : null}
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
                        <input type="text" value={safeForm.post_index ?? ""} onChange={(e) => setField("post_index", e.target.value)} />
                        {safeErrors.post_index ? <small className="text-danger">{safeErrors.post_index}</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          Country <span>*</span>
                        </label>
                        <input type="text" value={safeForm.country ?? ""} onChange={(e) => setField("country", e.target.value)} />
                        {safeErrors.country ? <small className="text-danger">{safeErrors.country}</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          Region/State <span>*</span>
                        </label>
                        <input type="text" value={safeForm.region ?? ""} onChange={(e) => setField("region", e.target.value)} />
                        {safeErrors.region ? <small className="text-danger">{safeErrors.region}</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          City <span>*</span>
                        </label>
                        <input type="text" value={safeForm.city ?? ""} onChange={(e) => setField("city", e.target.value)} />
                        {safeErrors.city ? <small className="text-danger">{safeErrors.city}</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          Street <span>*</span>
                        </label>
                        <input type="text" value={safeForm.street ?? ""} onChange={(e) => setField("street", e.target.value)} />
                        {safeErrors.street ? <small className="text-danger">{safeErrors.street}</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          House Number <span>*</span>
                        </label>
                        <input type="text" value={safeForm.home_number ?? ""} onChange={(e) => setField("home_number", e.target.value)} />
                        {safeErrors.home_number ? <small className="text-danger">{safeErrors.home_number}</small> : null}
                      </div>
                    </div>

                    <div className="col-md-6 mb-20">
                      <div className="default-form-box">
                        <label>
                          Apartment/Office <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={safeForm.home_office ?? ""}
                          onChange={(e) => setField("home_office", e.target.value)}
                          placeholder="Apartment / Office"
                        />
                        {safeErrors.home_office ? <small className="text-danger">{safeErrors.home_office}</small> : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-30">
                  <div className="form-check mb-10">
                    <input
                      id="acceptTerms"
                      className="form-check-input"
                      type="checkbox"
                      checked={Boolean(safeForm.acceptTerms)}
                      onChange={(e) => setField("acceptTerms", e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      I have read and agree to the Terms and Conditions <span>*</span>
                    </label>
                    {safeErrors.acceptTerms ? <small className="text-danger d-block">{safeErrors.acceptTerms}</small> : null}
                  </div>

                  <div className="form-check">
                    <input
                      id="acceptPrivacy"
                      className="form-check-input"
                      type="checkbox"
                      checked={Boolean(safeForm.acceptPrivacy)}
                      onChange={(e) => setField("acceptPrivacy", e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="acceptPrivacy">
                      I agree to the processing of my personal data and accept the policy <span>*</span>
                    </label>
                    {safeErrors.acceptPrivacy ? <small className="text-danger d-block">{safeErrors.acceptPrivacy}</small> : null}
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
