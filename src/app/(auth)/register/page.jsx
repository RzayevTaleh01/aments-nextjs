"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import validate from "validate.js";
import { toast } from "react-toastify";
import ApiService from "@/services/api/ApiService";
import { RegisterPage } from "@/components/pages";

const registerConstraints = {
  email: {
    presence: { allowEmpty: false, message: "^Email tələb olunur" },
    email: { message: "^Email formatı düzgün deyil" },
  },
  username: {
    presence: { allowEmpty: false, message: "^İstifadəçi adı tələb olunur" },
    length: { minimum: 3, maximum: 32, tooShort: "^İstifadəçi adı ən az 3 simvol olmalıdır", tooLong: "^İstifadəçi adı ən çox 32 simvol ola bilər" },
    format: { pattern: "^[a-zA-Z0-9_]+$", message: "^İstifadəçi adında yalnız hərf, rəqəm və _ istifadə oluna bilər" },
  },
  password: {
    presence: { allowEmpty: false, message: "^Şifrə tələb olunur" },
    length: { minimum: 6, tooShort: "^Şifrə ən az 6 simvol olmalıdır" },
  },
  passwordConfirm: {
    presence: { allowEmpty: false, message: "^Şifrəni təsdiqləyin" },
    equality: { attribute: "password", message: "^Şifrələr uyğun deyil" },
  },
  first_name: {
    presence: { allowEmpty: false, message: "^Ad tələb olunur" },
  },
  last_name: {
    presence: { allowEmpty: false, message: "^Soyad tələb olunur" },
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: "^Əlaqə nömrəsi tələb olunur" },
    format: { pattern: "^\\d{7,15}$", message: "^Əlaqə nömrəsi yalnız rəqəmlərdən ibarət olmalıdır (7-15 rəqəm)" },
  },
  post_index: {
    presence: { allowEmpty: false, message: "^İndeks tələb olunur" },
    format: { pattern: "^\\d{3,10}$", message: "^İndeks yalnız rəqəmlərdən ibarət olmalıdır" },
  },
  country: {
    presence: { allowEmpty: false, message: "^Ölkə tələb olunur" },
  },
  region: {
    presence: { allowEmpty: false, message: "^Region tələb olunur" },
  },
  city: {
    presence: { allowEmpty: false, message: "^Şəhər tələb olunur" },
  },
  street: {
    presence: { allowEmpty: false, message: "^Küçə tələb olunur" },
  },
  home_number: {
    presence: { allowEmpty: false, message: "^Ev nömrəsi tələb olunur" },
  },
  home_office: {
    presence: { allowEmpty: false, message: "^Mənzil / Ofis tələb olunur" },
  },
  acceptTerms: {
    inclusion: { within: [true], message: "^Şərtləri qəbul etməlisiniz" },
  },
  acceptPrivacy: {
    inclusion: { within: [true], message: "^Şəxsi məlumatların emalına razılıq verməlisiniz" },
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
    const routes = ["/api/user/register", "/user/register"];
    let lastError;

    for (const route of routes) {
      try {
        return await ApiService.post(route, payload, { headers: { "Content-Type": "application/json" } });
      } catch (error) {
        const status = error?.response?.status;
        lastError = error;
        if (status !== 404) break;
      }
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

      toast.success("Qeydiyyat uğurla tamamlandı");
      router.push("/login");
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Qeydiyyat zamanı xəta baş verdi";
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
