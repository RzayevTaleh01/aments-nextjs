import { normalizeLang } from "@/utils/lang";

const ProductDetailsDefaults = {
  id: null,
  name: "Məhsul",
  href: "/product/default",
  imageSrc: "",
  brandName: "",
  markName: "",
  modelName: "",
  compareAt: null,
  price: null,
  description: "",
  code: "",
  oemCode: "",
  similarOemCodes: "",
  galleryImages: [""],
};

function mapOfferGroups(raw = {}) {
  const entries = (Array.isArray(raw?.storageLists) ? raw.storageLists : null) ?? (raw?.storageProducts ?? []);
  if (!Array.isArray(entries) || entries.length === 0) return [];

  const rows = entries.map((sp) => {
    return {
      storageProductId: sp?.sp_id ?? null,
      imageSrc: sp?.img ?? ProductDetailsDefaults.imageSrc,
      brand: sp?.brand ?? "",
      code: sp?.code ?? "",
      name: sp?.name ?? ProductDetailsDefaults.name,
      warehouse: sp?.warehouse ?? "",
      qty: sp?.qty ?? 0,
      price: sp?.price ?? "",
    };
  });

  return [{ title: "Anbarlar", rows }];
}

function pickTranslation(raw = {}, lang) {
  const list = Array.isArray(raw?.translations) ? raw.translations : [];
  if (list.length === 0) return null;
  const normalized = normalizeLang(lang);
  return list.find((t) => normalizeLang(t?.languageCode) === normalized) ?? list[0];
}

function pickText(...candidates) {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c;
  }
  return "";
}

export function mapProductDetails(raw = {}, lang) {
  const id = raw?.id ?? ProductDetailsDefaults.id;
  const translation = pickTranslation(raw, lang);
  const galleryImages =
    Array.isArray(raw?.images) && raw.images.length > 0
      ? raw.images.map((x) => x?.image).filter(Boolean)
      : raw?.image
        ? [raw.image]
        : ProductDetailsDefaults.galleryImages;

  return {
    product: {
      ...ProductDetailsDefaults,
      id,
      href: id != null ? `/product/${String(id)}` : ProductDetailsDefaults.href,
      imageSrc: raw?.images?.[0]?.image ?? raw?.image ?? ProductDetailsDefaults.imageSrc,
      brandName: raw?.brand?.name ?? ProductDetailsDefaults.brandName,
      markName: raw?.mark?.name ?? ProductDetailsDefaults.markName,
      modelName: raw?.model?.name ?? ProductDetailsDefaults.modelName,
      name: pickText(raw?.name, raw?.title, translation?.name, raw?.storageLists?.[0]?.name, ProductDetailsDefaults.name),
      description: pickText(raw?.description, translation?.description, ProductDetailsDefaults.description),
      code: raw?.code ?? ProductDetailsDefaults.code,
      oemCode: raw?.oem_code ?? ProductDetailsDefaults.oemCode,
      similarOemCodes: raw?.similar_oem_codes ?? ProductDetailsDefaults.similarOemCodes,
      price: raw?.storageLists?.[0]?.price ?? ProductDetailsDefaults.price,
      galleryImages,
    },
    offerGroups: mapOfferGroups(raw),
  };
}
