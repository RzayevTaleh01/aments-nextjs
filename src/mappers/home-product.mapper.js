function parsePriceNumber(price) {
  if (typeof price === "number" && Number.isFinite(price)) return price;
  if (typeof price !== "string") return null;
  const normalized = price.replace(/\s+/g, " ").trim().replace(/,/g, ".");
  const match = normalized.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const n = Number(match[0]);
  return Number.isFinite(n) ? n : null;
}

function extractCurrencyFromPriceText(priceText) {
  if (typeof priceText !== "string") return "AZN";
  const match = priceText.toUpperCase().match(/[A-Z]{3}/);
  return match?.[0] || "AZN";
}

function formatMoney(value, currency) {
  const n = typeof value === "number" ? value : parsePriceNumber(value);
  if (!Number.isFinite(n)) return currency ? `0.00 ${currency}` : "0.00";
  const text = n.toFixed(2);
  return currency ? `${text} ${currency}` : text;
}

function normalizePriceText(rawPrice, fallbackCurrency = "AZN") {
  if (typeof rawPrice === "number" && Number.isFinite(rawPrice)) return formatMoney(rawPrice, fallbackCurrency);
  if (typeof rawPrice !== "string") return "";
  const text = rawPrice.trim();
  if (!text) return "";
  const hasCurrency = /[A-Za-z]{3}/.test(text);
  if (hasCurrency) return text;
  const n = parsePriceNumber(text);
  if (!Number.isFinite(n)) return "";
  return formatMoney(n, fallbackCurrency);
}

function computeProductDisplayPrice(p) {
  const storageLists = Array.isArray(p?.storageLists) ? p.storageLists : null;
  const storageProducts = Array.isArray(p?.storageProducts) ? p.storageProducts : null;
  const entries = storageLists ?? storageProducts ?? [];
  if (!entries.length) return null;

  const rawPriceTexts = entries.map((x) => x?.price).filter((v) => v != null);
  if (!rawPriceTexts.length) return null;

  const currency = rawPriceTexts.map(extractCurrencyFromPriceText).find((x) => x && x !== "AZN") || "AZN";
  const parsed = rawPriceTexts
    .map((raw) => ({ raw, n: parsePriceNumber(raw) }))
    .filter((x) => Number.isFinite(x.n));

  if (!parsed.length) return null;

  if (parsed.length === 1) {
    const raw = parsed[0].raw;
    const normalized = normalizePriceText(raw, currency);
    return normalized || null;
  }

  let min = Infinity;
  let max = -Infinity;
  for (const x of parsed) {
    if (x.n < min) min = x.n;
    if (x.n > max) max = x.n;
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  if (Math.abs(min - max) < 1e-9) return formatMoney(min, currency);
  return `${formatMoney(min, currency)} - ${formatMoney(max, currency)}`;
}

const HomeProductDefaults = {
  id: null,
  name: "",
  href: "/product/default",
  imageSrc: "/assets/images/products_images/aments_products_image_1.jpg",
  brandName: "",
  markName: "",
  modelName: "",
  compareAt: null,
  isSimilarOem: false,
  price: null,
};

export function mapHomeProduct(raw = {}) {
  return {
    ...HomeProductDefaults,
    id: raw?.id ?? HomeProductDefaults.id,
    name: raw?.name ?? HomeProductDefaults.name,
    href: raw?.id != null ? `/product/${String(raw.id)}` : HomeProductDefaults.href,
    imageSrc: raw?.images?.[0]?.image ?? raw?.image ?? HomeProductDefaults.imageSrc,
    brandName: raw?.brand?.name ?? raw?.brand ?? HomeProductDefaults.brandName,
    markName: raw?.mark?.name ?? raw?.mark ?? HomeProductDefaults.markName,
    modelName: raw?.model?.name ?? raw?.model ?? HomeProductDefaults.modelName,
    compareAt: raw?.compareAt ?? raw?.compare_at ?? HomeProductDefaults.compareAt,
    isSimilarOem: Boolean(raw?.isSimilarOem ?? raw?.is_similar_oem ?? HomeProductDefaults.isSimilarOem),
    price: computeProductDisplayPrice(raw),
  };
}
