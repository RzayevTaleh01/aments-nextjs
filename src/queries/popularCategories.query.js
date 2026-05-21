import ApiService from "@/services/api/ApiService";
import { STATISTICS_CATEGORY_POPULAR_ROUTE } from "@/configs/apiRoutes";
import { mapPopularCategory } from "@/mappers/popularCategory.mapper";

export async function getPopularCategories({ lang } = {}) {
  const res = await ApiService.get(STATISTICS_CATEGORY_POPULAR_ROUTE, { params: { lang } });
  const list = Array.isArray(res?.data?.data) ? res.data.data : [];
  return list.map((x) => mapPopularCategory(x)).filter((x) => x?.id != null && x?.name);
}

