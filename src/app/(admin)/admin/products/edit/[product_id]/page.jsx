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
import { EDIT_PRODUCT_BY_ID_ROUTE, GET_PRODUCT_BY_ID_ROUTE } from "@/admin/configs/apiRoutes";
import { getBase64 } from "@/admin/utils/getBase64";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const params = useParams();
  const productId = params?.product_id;

  const langParam = searchParams?.get("lang");
  useEffect(() => {
    const next = String(langParam || "").trim().toLowerCase();
    if (!next) return;
    const ok = CONTENT_LANGUAGE_OPTIONS.some((l) => String(l?.id || "").toLowerCase() === next);
    if (ok) setActiveLang(next);
  }, [langParam]);

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
    async function safeGetFirst(paths) {
      for (const p of paths) {
        try {
          const res = await ApiService.get(p);
          return res.data;
        } catch {}
      }
      return null;
    }

    (async () => {
      const [brandRes, markRes, modelRes, categoryRes] = await Promise.all([
        safeGetFirst(["/brand", "/brand/"]),
        safeGetFirst(["/mark", "/mark/"]),
        safeGetFirst(["/model", "/model/"]),
        safeGetFirst(["/category", "/category/", "/product/category", "/product/category/"]),
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
      if (typeof editIndex === "number" && editIndex >= 0 && editIndex < currentImages.length) {
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

      const imagesRaw = Array.isArray(data?.images) ? data.images : [];
      const images = imagesRaw
        .map((img) => {
          if (!img) return null;
          if (typeof img === "string") {
            const s = img.trim();
            if (!s) return null;
            if (s.startsWith("data:")) return { base64: s };
            return { url: s };
          }
          const base64 = String(img?.base64 || "").trim();
          if (base64) return { base64 };
          const urlLike = String(img?.url || img?.image || img?.path || img?.src || img?.file || "").trim();
          if (urlLike) return { url: urlLike };
          return null;
        })
        .filter(Boolean);

      const payload = {
        translations,
        slug: String(data?.slug ?? "").trim(),
        code: String(data?.code ?? "").trim(),
        oem_code: String(data?.oem_code ?? "").trim(),
        similar_oem_codes: String(data?.similar_oem_codes ?? "").trim(),
        posAppId: String(data?.posAppId ?? "").trim(),
      };

      const numericFields = ["brandId", "markId", "modelId", "categoryId", "isActivated"];
      for (const key of numericFields) {
        const raw = data?.[key];
        if (raw === "" || raw == null) continue;
        const n = Number(raw);
        payload[key] = Number.isFinite(n) ? n : raw;
      }
      payload.images = images;

      ApiService.put(`${EDIT_PRODUCT_BY_ID_ROUTE}/${productId}`, { ...payload })
        .then(() => {
          toast.success("Uğurla yeniləndi");
          router.push("/admin/products");
        })
        .catch(() => {
          toast.error("Xəta baş verdi");
        });
    }
  }

  useEffect(() => {
    if (!productId) return;
    ApiService.get(`${GET_PRODUCT_BY_ID_ROUTE}/${productId}`, { _skipLang: true })
      .then((resp) => {
        const payload = resp?.data?.data ?? {};
        const product = payload?.product ?? payload;
        const next = { ...(product || {}) };

        const translations = Array.isArray(product?.translations) ? product.translations : [];
        CONTENT_LANGUAGE_OPTIONS.forEach((l) => {
          const hit = translations.find((t) => String(t?.languageCode || "").toLowerCase() === String(l.id).toLowerCase());
          if (hit) {
            next[`name_${l.id}`] = hit?.name ?? "";
            next[`description_${l.id}`] = hit?.description ?? "";
          }
        });

        if (!next[`name_${CONTENT_LANGUAGES.AZ}`]) next[`name_${CONTENT_LANGUAGES.AZ}`] = product?.name ?? "";
        if (!next[`description_${CONTENT_LANGUAGES.AZ}`]) next[`description_${CONTENT_LANGUAGES.AZ}`] = product?.description ?? "";

        const normalizeImageItem = (img) => {
          if (!img) return "";
          if (typeof img === "string") return img;
          const base64 = String(img?.base64 || "").trim();
          if (base64) return { base64 };
          const urlLike = String(img?.url || img?.image || img?.path || img?.src || img?.file || img?.slug || "").trim();
          return urlLike || "";
        };

        if (!Array.isArray(next.images) || !next.images.length) {
          if (Array.isArray(product?.images) && product.images.length) {
            next.images = product.images.map(normalizeImageItem).filter(Boolean);
          } else if (product?.image) {
            next.images = [normalizeImageItem(product.image)].filter(Boolean);
          } else {
            next.images = [];
          }
        } else {
          next.images = next.images.map(normalizeImageItem).filter(Boolean);
        }

        setData(next);
      })
      .catch(() => {});
  }, [productId]);

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Məhsulu düzəlt" filter={true}>
          <SgButton type="link" to="/admin/products" color="primary" size="md">
            Məhsullar
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div className={["row"].join(" ").trim()}>
            <div className="col-lg-12">
              <div style={{ marginBottom: 16 }}>
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
                  variant="creatable-select"
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
