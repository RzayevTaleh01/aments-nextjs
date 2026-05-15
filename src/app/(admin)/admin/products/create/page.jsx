"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageFooter, SgPageHead } from "@/admin/components/ui/Page";
import { SgButton } from "@/admin/components/ui/Button";
import { useEffect, useMemo, useState } from "react";
import { SgFile, SgFormGroup, SgInput } from "@/admin/components/ui/Form";
import { changeData } from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import { validate } from "@/admin/utils/validate";
import { CONTENT_LANGUAGE_OPTIONS, CONTENT_LANGUAGES, validationConstraints } from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import { CREATE_PRODUCT_ROUTE } from "@/admin/configs/apiRoutes";
import { getBase64 } from "@/admin/utils/getBase64";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function Page() {
  const [data, setData] = useState({});
  const [valueErrors, setValueErrors] = useState({});
  const [brands, setBrands] = useState([]);
  const [marks, setMarks] = useState([]);
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeLang, setActiveLang] = useState(CONTENT_LANGUAGES.AZ);
  const router = useRouter();

  const filteredModels = useMemo(() => {
    const markId = data?.markId;
    if (!markId) return [];
    return (models || [])
      .filter((m) => String(m?.markId) === String(markId))
      .filter((m) => m?.id != null && m?.name != null)
      .map((m) => ({ id: m.id, name: m.name }));
  }, [data?.markId, models]);

  useEffect(() => {
    let isActive = true;
    const baseUrl =
      process.env.NEXT_PUBLIC_ADMIN_API ||
      process.env.NEXT_PUBLIC_REQUEST_ADMIN_BASE_URL ||
      process.env.NEXT_PUBLIC_REQUEST_BASE_URL ||
      "";
    const authHeaderKey = process.env.NEXT_PUBLIC_REQUEST_HEADER_AUTH_KEY || "Authorization";
    const tokenType = process.env.NEXT_PUBLIC_REQUEST_TOKEN_TYPE || "Bearer";

    function normalizeLang(value) {
      const raw = String(value ?? "").trim();
      if (!raw) return "en";
      const base = raw.split("-")[0]?.toLowerCase();
      return base || "en";
    }

    function getCookieValue(name) {
      try {
        const cookie = String(document?.cookie ?? "");
        if (!cookie) return null;
        const parts = cookie.split(";").map((p) => p.trim());
        const match = parts.find((p) => p.startsWith(`${name}=`));
        if (!match) return null;
        return decodeURIComponent(match.slice(name.length + 1));
      } catch {
        return null;
      }
    }

    function resolveLang() {
      try {
        const rawLocal = window?.localStorage?.getItem("oem_lang");
        if (rawLocal) return normalizeLang(rawLocal);
      } catch {}
      const rawCookie = getCookieValue("oem_lang");
      if (rawCookie) return normalizeLang(rawCookie);
      return "en";
    }

    function withLang(url) {
      const lang = resolveLang();
      try {
        const u = new URL(url);
        if (!u.searchParams.has("lang")) u.searchParams.set("lang", lang);
        return u.toString();
      } catch {
        if (/(^|[?&])lang=/.test(url)) return url;
        const sep = url.includes("?") ? "&" : "?";
        return `${url}${sep}lang=${encodeURIComponent(lang)}`;
      }
    }

    function joinUrl(base, path) {
      const b = String(base || "").replace(/\/+$/, "");
      const p = String(path || "").startsWith("/") ? String(path || "") : `/${path || ""}`;
      return `${b}${p}`;
    }

    async function safeGetJson(path) {
      const session = await getSession();
      const headers = {};
      const accessToken = session?.token?.accessToken;
      if (accessToken) headers[authHeaderKey] = `${tokenType} ${accessToken}`;

      const url = withLang(joinUrl(baseUrl, path));
      const res = await fetch(url, { method: "GET", headers });
      if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
      return res.json();
    }

    async function safeGetFirst(paths) {
      for (const p of paths) {
        try {
          return await safeGetJson(p);
        } catch {}
      }
      return null;
    }

    (async () => {
      const [brandRes, markRes, modelRes, categoryRes] = await Promise.all([
        safeGetFirst(["/brand", "/brand/"]),
        safeGetFirst(["/mark", "/mark/"]),
        safeGetFirst(["/model", "/model/"]),
        safeGetFirst(["/category", "/category/", "/category", "/category/", "/product/category", "/product/category/"]),
      ]);

      if (!isActive) return;

      const brandList = Array.isArray(brandRes?.data) ? brandRes.data : [];
      const markList = Array.isArray(markRes?.data) ? markRes.data : [];
      const modelList = Array.isArray(modelRes?.data) ? modelRes.data : [];
      const categoryList = Array.isArray(categoryRes?.data) ? categoryRes.data : [];

      setBrands(brandList.filter((b) => b?.id != null && b?.name != null).map((b) => ({ id: b.id, name: b.name })));
      setMarks(markList.filter((m) => m?.id != null && m?.name != null).map((m) => ({ id: m.id, name: m.name })));
      setModels(modelList.filter((m) => m?.id != null));
      setCategories(categoryList.filter((c) => c?.id != null && c?.name != null).map((c) => ({ id: c.id, name: c.name })));
    })();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const markId = data?.markId;
    const modelId = data?.modelId;
    if (!markId) {
      if (modelId) setData((prev) => ({ ...prev, modelId: "" }));
      return;
    }
    if (!modelId) return;
    const ok = (models || []).some((m) => String(m?.id) === String(modelId) && String(m?.markId) === String(markId));
    if (!ok) setData((prev) => ({ ...prev, modelId: "" }));
  }, [data?.markId, data?.modelId, models]);

  function handleChange(e) {
    changeData(e, data, setData, valueErrors, setValueErrors);
  }

  async function handleImagesChange(e) {
    const files = Array.from(e?.target?.files || []);
    if (!files.length) return;

    const accepts = String(e?.target?.accept || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const acceptedFiles = accepts.length ? files.filter((f) => accepts.includes(f.type)) : files;

    const toBase64Obj = (file) =>
      new Promise((resolve) => {
        getBase64(file, (result64) => {
          const dataUrl = String(result64?.result || "");
          resolve({
            base64: dataUrl,
          });
        });
      });

    const newImages = await Promise.all(acceptedFiles.map(toBase64Obj));
    const editIndex = e?.editIndex;
    
    setData((prev) => {
      const currentImages = Array.isArray(prev?.images) ? [...prev.images] : [];
      if (typeof editIndex === 'number' && editIndex >= 0 && editIndex < currentImages.length) {
        currentImages[editIndex] = newImages[0];
        if (newImages.length > 1) {
          currentImages.splice(editIndex + 1, 0, ...newImages.slice(1));
        }
      } else {
        currentImages.push(...newImages);
      }
      return {
        ...prev,
        images: currentImages,
      };
    });
    setValueErrors((prev) => {
      if (!prev || typeof prev !== "object") return prev;
      const next = { ...prev };
      delete next.images;
      return next;
    });
  }

  function handleImagesRemove(e) {
    const idx = e?.removeIndex;
    if (typeof idx === "number") {
      setData((prev) => {
        const current = Array.isArray(prev?.images) ? prev.images : [];
        return {
          ...prev,
          images: current.filter((_, i) => i !== idx),
        };
      });
      return;
    }
    setData((prev) => ({ ...prev, images: [] }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(data, "productCreate", validationConstraints);

    if (Object.keys(errors).length > 0) {
      setValueErrors(errors);
    } else {
      const translations = CONTENT_LANGUAGE_OPTIONS.map((l) => ({
        languageCode: l.id,
        name: data[`name_${l.id}`] || "",
        description: data[`description_${l.id}`] || "",
      })).filter((t) => t.name || t.description);

      const payload = {
        ...data,
        translations,
        images: (Array.isArray(data?.images) ? data.images : []).map((img) => ({
          base64: String(img?.base64 || ""),
        })),
      };

      CONTENT_LANGUAGE_OPTIONS.forEach((l) => {
        delete payload[`name_${l.id}`];
        delete payload[`description_${l.id}`];
      });

      ApiService.post(`${CREATE_PRODUCT_ROUTE}`, payload)
        .then(() => {
          toast.success("Uğurla əlavə edildi");
          router.push("/admin/products");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Məhsul əlavə et" filter={true}>
          <SgButton type="link" to="/admin/products" color="primary" size="md">
            Məhsullar
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div className={["row"].join(" ").trim()}>
            <div className="col-lg-12">
              <div className="mb-4">
                <SgButtonGroup gap={true} className="mt-2">
                  {CONTENT_LANGUAGE_OPTIONS.map((lang) => (
                    <SgButton
                      key={lang.id}
                      color={activeLang === lang.id ? "primary" : "secondary-outline"}
                      onClick={() => setActiveLang(lang.id)}
                      type="button"
                    >
                      {lang.name}
                    </SgButton>
                  ))}
                </SgButtonGroup>
              </div>

              <SgFormGroup>
                <SgInput
                  name={`name_${activeLang}`}
                  id={`name_${activeLang}`}
                  placeholder="Məhsul adı"
                  label={`Məhsul adı (${activeLang.toUpperCase()})`}
                  value={data[`name_${activeLang}`] || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors[`name_${activeLang}`]}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="slug"
                  id="slug"
                  placeholder="məs: teker"
                  label="Slug"
                  value={data.slug || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.slug}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name={`description_${activeLang}`}
                  id={`description_${activeLang}`}
                  placeholder="Məhsulun təsviri"
                  label={`Təsvir (${activeLang.toUpperCase()})`}
                  variant="editor"
                  value={data[`description_${activeLang}`] || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors[`description_${activeLang}`]}
                />
              </SgFormGroup>
              <div className="row">
                <div className="col-lg-6">
                  <SgFormGroup>
                    <SgInput
                      name="code"
                      id="code"
                      placeholder="BST-9922"
                      label="Kod"
                      value={data.code || ""}
                      onChange={handleChange}
                      isInvalid={valueErrors.code}
                    />
                  </SgFormGroup>
                </div>
                <div className="col-lg-6">
                  <SgFormGroup>
                    <SgInput
                      name="oem_code"
                      id="oem_code"
                      placeholder="0451103313"
                      label="OEM kod"
                      value={data.oem_code || ""}
                      onChange={handleChange}
                      isInvalid={valueErrors.oem_code}
                    />
                  </SgFormGroup>
                </div>
              </div>
              <SgFormGroup>
                <SgInput
                  name="similar_oem_codes"
                  id="similar_oem_codes"
                  placeholder="W712/94, OP526/1, OC295"
                  label="Similar OEM kodlar"
                  value={data.similar_oem_codes || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.similar_oem_codes}
                />
              </SgFormGroup>
              <div className="row">
                <div className="col-lg-6">
                  <SgFormGroup>
                    <SgInput
                      name="brandId"
                      id="brandId"
                      placeholder="Brend seçin"
                      label="Brand"
                      variant="select"
                      searchAble={true}
                      options={brands}
                      value={data.brandId ?? ""}
                      onChange={handleChange}
                      isInvalid={valueErrors.brandId}
                    />
                  </SgFormGroup>
                </div>
                <div className="col-lg-6">
                  <SgFormGroup>
                    <SgInput
                      name="markId"
                      id="markId"
                      placeholder="Marka seçin"
                      label="Marka"
                      variant="select"
                      searchAble={true}
                      options={marks}
                      value={data.markId ?? ""}
                      onChange={handleChange}
                      isInvalid={valueErrors.markId}
                    />
                  </SgFormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <SgFormGroup>
                    <SgInput
                      name="modelId"
                      id="modelId"
                      placeholder={data?.markId ? "Model seçin" : "Əvvəlcə marka seçin"}
                      label="Model"
                      variant="select"
                      searchAble={true}
                      options={filteredModels}
                      value={data.modelId ?? ""}
                      disabled={!data?.markId}
                      onChange={handleChange}
                      isInvalid={valueErrors.modelId}
                    />
                  </SgFormGroup>
                </div>
                <div className="col-lg-6">
                  <SgFormGroup>
                    <SgInput
                      name="categoryId"
                      id="categoryId"
                      placeholder="Kateqoriya seçin"
                      label="Kateqoriya"
                      variant="select"
                      searchAble={true}
                      options={categories}
                      value={data.categoryId ?? ""}
                      onChange={handleChange}
                      isInvalid={valueErrors.categoryId}
                    />
                  </SgFormGroup>
                </div>
              </div>
              <SgFormGroup>
                <SgInput
                  name="posAppId"
                  id="posAppId"
                  placeholder="POS-12345"
                  label="POS App ID"
                  value={data.posAppId || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.posAppId}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="isActivated"
                  id="isActivated"
                  label="Status"
                  variant="select"
                  value={data.isActivated ?? ""}
                  options={[
                    { name: "Aktiv", id: 1 },
                    { name: "Passiv", id: 0 },
                  ]}
                  onChange={handleChange}
                  isInvalid={valueErrors.isActivated}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgFile
                  accepts="image/jpeg, image/png, image/jpg"
                  label="Şəkillər"
                  multiple={true}
                  onChange={handleImagesChange}
                  onRemove={handleImagesRemove}
                  value={data.images}
                  id="images"
                  name="images"
                  isInvalid={valueErrors.images}
                />
              </SgFormGroup>
            </div>
          </div>
        </SgPageBody>
        <SgPageFooter>
          <SgButtonGroup gap={true}>
            <SgButton color="primary" size="sm" onClick={handleSubmit}>
              Yadda saxla
            </SgButton>
            <SgButton color="error" size="sm" type="link" to="/admin/products">
              Ləğv et
            </SgButton>
          </SgButtonGroup>
        </SgPageFooter>
      </SgPage>
    </MainLayout>
  );
}
