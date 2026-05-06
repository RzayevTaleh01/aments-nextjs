"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ApiService from "@/services/api/ApiService";
import RegisterPage from "@/components/pages/RegisterPage/RegisterPage";
import { changeData } from "@/utils/changeData";
import { validate } from "@/utils/validate";
import { validationConstraints } from "./validationConstraints";

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

  function handleChange(e) {
    changeData(e, form, setForm, fieldErrors, setFieldErrors);
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

    const errors = validate(form, "register", validationConstraints);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
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

      router.push("/login");
    } catch {
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
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
