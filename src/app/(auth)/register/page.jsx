"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import validate from "validate.js";
import { toast } from "react-toastify";
import ApiService from "@/services/api/ApiService";
import { RegisterPage } from "@/components/pages";

const registerConstraints = {
  email: {
    presence: { allowEmpty: false, message: "^Email is required" },
    email: { message: "^Invalid email format" },
  },
  username: {
    presence: { allowEmpty: false, message: "^Username is required" },
    length: { minimum: 3, maximum: 32, tooShort: "^Username must be at least 3 characters", tooLong: "^Username must be at most 32 characters" },
    format: { pattern: "^[a-zA-Z0-9_]+$", message: "^Username can contain only letters, numbers, and _" },
  },
  password: {
    presence: { allowEmpty: false, message: "^Password is required" },
    length: { minimum: 6, tooShort: "^Password must be at least 6 characters" },
  },
  passwordConfirm: {
    presence: { allowEmpty: false, message: "^Please confirm your password" },
    equality: { attribute: "password", message: "^Passwords do not match" },
  },
  first_name: {
    presence: { allowEmpty: false, message: "^First name is required" },
  },
  last_name: {
    presence: { allowEmpty: false, message: "^Last name is required" },
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: "^Phone number is required" },
    format: { pattern: "^\\d{7,15}$", message: "^Phone number must contain only digits (7-15 digits)" },
  },
  post_index: {
    presence: { allowEmpty: false, message: "^Postal code is required" },
    format: { pattern: "^\\d{3,10}$", message: "^Postal code must contain only digits" },
  },
  country: {
    presence: { allowEmpty: false, message: "^Country is required" },
  },
  region: {
    presence: { allowEmpty: false, message: "^Region/State is required" },
  },
  city: {
    presence: { allowEmpty: false, message: "^City is required" },
  },
  street: {
    presence: { allowEmpty: false, message: "^Street is required" },
  },
  home_number: {
    presence: { allowEmpty: false, message: "^House number is required" },
  },
  home_office: {
    presence: { allowEmpty: false, message: "^Apartment/Office is required" },
  },
  acceptTerms: {
    inclusion: { within: [true], message: "^You must accept the Terms and Conditions" },
  },
  acceptPrivacy: {
    inclusion: { within: [true], message: "^You must consent to personal data processing" },
  },
};

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    phoneNumber: "",
    post_index: "",
    country: "",
    region: "",
    city: "",
    street: "",
    home_number: "",
    home_office: "",
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasAnyError = useMemo(() => Object.keys(fieldErrors || {}).length > 0, [fieldErrors]);

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev?.[name]) return prev;
      const { [name]: _removed, ...rest } = prev;
      return rest;
    });
  }

  function normalizeValidateErrors(validateErrors) {
    if (!validateErrors) return {};
    const normalized = {};
    for (const [key, messages] of Object.entries(validateErrors)) {
      if (Array.isArray(messages) && messages[0]) normalized[key] = messages[0];
    }
    return normalized;
  }

  async function postRegister(payload) {
    let lastError;
      try {
        return await ApiService.post("/user/register", payload, { headers: { "Content-Type": "application/json" } });
      } catch (error) {
        const status = error?.response?.status;
        lastError = error;
        if (status !== 404) throw error;
      }

    throw lastError;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validateErrors = validate(form, registerConstraints, { fullMessages: false });
    if (validateErrors) {
      const normalized = normalizeValidateErrors(validateErrors);
      setFieldErrors(normalized);
      const firstMessage = Object.values(normalized)[0];
      if (firstMessage) toast.error(firstMessage);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        username: form.username,
        password: form.password,
        email: form.email,
        phoneNumber: form.phoneNumber,
        post_index: form.post_index,
        country: form.country,
        region: form.region,
        city: form.city,
        street: form.street,
        home_number: form.home_number,
        home_office: form.home_office,
      };

      await postRegister(payload);

      toast.success("Registration completed successfully");
      router.push("/login");
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "An error occurred during registration";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <RegisterPage
      form={form}
      fieldErrors={fieldErrors}
      isSubmitting={isSubmitting}
      hasAnyError={hasAnyError}
      onFieldChange={setField}
      onSubmit={handleSubmit}
    />
  );
}
