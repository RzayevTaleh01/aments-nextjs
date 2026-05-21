import ApiService from "@/services/api/ApiService";
import { PRODUCT_DETAIL_API_ROUTE } from "@/configs/apiRoutes";
import { mapProductDetails } from "@/mappers/productDetails.mapper";

function buildProductDetailRoute(id) {
  return PRODUCT_DETAIL_API_ROUTE.replace(":id", String(id));
}

export async function getProductDetails({ lang, id } = {}) {
  const res = await ApiService.get(buildProductDetailRoute(id), { params: { lang } });
  const raw = res?.data?.data ?? null;
  if (!raw) return null;
  return mapProductDetails(raw, lang);
}
