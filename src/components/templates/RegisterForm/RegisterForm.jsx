"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./RegisterForm.module.scss";
import { Checkbox, Input } from "@/components/ui/Form";

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
                    <Input
                      className="mb-20"
                      name="email"
                      type="email"
                      label="Email"
                      required
                      value={safeForm.email ?? ""}
                      onChange={handleChange}
                      isInvalid={Boolean(safeErrors.email)}
                      invalidMessage="Required"
                    />

                    <Input
                      className="mb-20"
                      name="username"
                      type="text"
                      label="Username"
                      required
                      value={safeForm.username ?? ""}
                      onChange={handleChange}
                      isInvalid={Boolean(safeErrors.username)}
                      invalidMessage="Required"
                    />

                    <Input
                      className="mb-20"
                      name="password"
                      type="password"
                      label="Password"
                      required
                      value={safeForm.password ?? ""}
                      onChange={handleChange}
                      isInvalid={Boolean(safeErrors.password)}
                      invalidMessage="Required"
                    />

                    <Input
                      className="mb-20"
                      name="passwordConfirm"
                      type="password"
                      label="Confirm Password"
                      required
                      value={safeForm.passwordConfirm ?? ""}
                      onChange={handleChange}
                      isInvalid={Boolean(safeErrors.passwordConfirm)}
                      invalidMessage="Required"
                    />
                  </div>

                  <div className="col-lg-6 mb-30">
                    <h5 className="mb-20">Contact Information</h5>
                    <Input
                      className="mb-20"
                      name="first_name"
                      type="text"
                      label="First Name"
                      required
                      value={safeForm.first_name ?? ""}
                      onChange={handleChange}
                      isInvalid={Boolean(safeErrors.first_name)}
                      invalidMessage="Required"
                    />

                    <Input
                      className="mb-20"
                      name="last_name"
                      type="text"
                      label="Last Name"
                      required
                      value={safeForm.last_name ?? ""}
                      onChange={handleChange}
                      isInvalid={Boolean(safeErrors.last_name)}
                      invalidMessage="Required"
                    />

                    <Input
                      className="mb-20"
                      name="phoneNumber"
                      type="text"
                      inputMode="tel"
                      label="Phone Number"
                      required
                      value={safeForm.phoneNumber ?? ""}
                      onChange={handleChange}
                      placeholder="994..."
                      isInvalid={Boolean(safeErrors.phoneNumber)}
                      invalidMessage="Required"
                    />
                  </div>
                </div>

                <div className="mb-30">
                  <h5 className="mb-20">Shipping Address</h5>
                  <div className="row">
                    <div className="col-md-6 mb-20">
                      <Input
                        name="post_index"
                        type="text"
                        label="Postal Code"
                        required
                        value={safeForm.post_index ?? ""}
                        onChange={handleChange}
                        isInvalid={Boolean(safeErrors.post_index)}
                        invalidMessage="Required"
                      />
                    </div>

                    <div className="col-md-6 mb-20">
                      <Input
                        name="country"
                        type="text"
                        label="Country"
                        required
                        value={safeForm.country ?? ""}
                        onChange={handleChange}
                        isInvalid={Boolean(safeErrors.country)}
                        invalidMessage="Required"
                      />
                    </div>

                    <div className="col-md-6 mb-20">
                      <Input
                        name="region"
                        type="text"
                        label="Region/State"
                        required
                        value={safeForm.region ?? ""}
                        onChange={handleChange}
                        isInvalid={Boolean(safeErrors.region)}
                        invalidMessage="Required"
                      />
                    </div>

                    <div className="col-md-6 mb-20">
                      <Input
                        name="city"
                        type="text"
                        label="City"
                        required
                        value={safeForm.city ?? ""}
                        onChange={handleChange}
                        isInvalid={Boolean(safeErrors.city)}
                        invalidMessage="Required"
                      />
                    </div>

                    <div className="col-md-6 mb-20">
                      <Input
                        name="street"
                        type="text"
                        label="Street"
                        required
                        value={safeForm.street ?? ""}
                        onChange={handleChange}
                        isInvalid={Boolean(safeErrors.street)}
                        invalidMessage="Required"
                      />
                    </div>

                    <div className="col-md-6 mb-20">
                      <Input
                        name="home_number"
                        type="text"
                        label="House Number"
                        required
                        value={safeForm.home_number ?? ""}
                        onChange={handleChange}
                        isInvalid={Boolean(safeErrors.home_number)}
                        invalidMessage="Required"
                      />
                    </div>

                    <div className="col-md-6 mb-20">
                      <Input
                        name="home_office"
                        type="text"
                        label="Apartment/Office"
                        required
                        value={safeForm.home_office ?? ""}
                        onChange={handleChange}
                        placeholder="Apartment / Office"
                        isInvalid={Boolean(safeErrors.home_office)}
                        invalidMessage="Required"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-30">
                  <Checkbox
                    className="mb-10"
                    id="acceptTerms"
                    name="acceptTerms"
                    label={
                      <>
                        I have read and agree to the Terms and Conditions <span>*</span>
                      </>
                    }
                    checked={Boolean(safeForm.acceptTerms)}
                    onChange={handleChange}
                    isInvalid={Boolean(safeErrors.acceptTerms)}
                    invalidMessage="Required"
                  />

                  <Checkbox
                    id="acceptPrivacy"
                    name="acceptPrivacy"
                    label={
                      <>
                        I agree to the processing of my personal data and accept the policy <span>*</span>
                      </>
                    }
                    checked={Boolean(safeForm.acceptPrivacy)}
                    onChange={handleChange}
                    isInvalid={Boolean(safeErrors.acceptPrivacy)}
                    invalidMessage="Required"
                  />
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
