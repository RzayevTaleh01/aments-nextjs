import ApiService from "@/services/api/ApiService";
import { ALL_PRODUCTS_ROUTE } from "@/configs/apiRoutes";
import { mapProduct } from "@/mappers/product.mapper";

function extractProductsList(data) {
  const list = Array.isArray(data?.products) ? data.products : [];
  return list.map((x) => mapProduct(x)).filter((x) => x.id != null && x.name);
}

function extractSimilar(data) {
  const rawSimilar = data?.similar_praducts ?? data?.similar_products;
  if (!Array.isArray(rawSimilar)) return { similarProducts: [], similarTotal: null };

  if (Array.isArray(rawSimilar[0])) {
    const list = Array.isArray(rawSimilar[0]) ? rawSimilar[0] : [];
    const total = typeof rawSimilar[1] === "number" ? rawSimilar[1] : null;
    return {
      similarProducts: list.map((x) => mapProduct(x)).filter((x) => x.id != null && x.name),
      similarTotal: total,
    };
  }

  if (rawSimilar.length > 0 && typeof rawSimilar[0] === "object") {
    return {
      similarProducts: rawSimilar.map((x) => mapProduct(x)).filter((x) => x.id != null && x.name),
      similarTotal: null,
    };
  }

  return { similarProducts: [], similarTotal: null };
}

export async function getProducts({ lang, params } = {}) {
  const res = await ApiService.get(ALL_PRODUCTS_ROUTE, { params: { ...(params || {}), lang } });
  const data = res?.data?.data ?? {};
  const products = extractProductsList(data);
  const meta = data?.meta ?? null;
  const { similarProducts, similarTotal } = extractSimilar(data);
  return { products, meta, similarProducts, similarTotal };
}

