import ApiService from "@/services/api/ApiService";
import { CATEGORIES_ROUTE } from "@/configs/apiRoutes";
import { mapCategory } from "@/mappers/category.mapper";

export async function getCategories({ lang } = {}) {
  const res = await ApiService.get(CATEGORIES_ROUTE, { params: { lang } });
  const payload = res?.data?.data ?? res?.data ?? null;
  const list =
    (Array.isArray(payload) && payload) ||
    (Array.isArray(payload?.data) && payload.data) ||
    (Array.isArray(payload?.categories) && payload.categories) ||
    (Array.isArray(payload?.category) && payload.category) ||
    (Array.isArray(payload?.data?.categories) && payload.data.categories) ||
    (Array.isArray(payload?.data?.category) && payload.data.category) ||
    [];
  return list.map((x) => mapCategory(x)).filter((x) => x.id != null && x.title);
}
