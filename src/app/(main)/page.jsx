import HomePage from "@/components/pages/HomePage";
import ApiService from "@/services/api/ApiService";
import { STATISTICS_CATEGORY_POPULAR_ROUTE } from "@/configs/apiRoutes";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Home",
};

async function getPopularCategoriesForHome() {
    const res = await ApiService.get(STATISTICS_CATEGORY_POPULAR_ROUTE);
    if (!res?.data?.data || !Array.isArray(res.data.data)) return null;
    return res.data.data;
}

export default async function Page() {
  const popularCategoriesApi = await getPopularCategoriesForHome();
    console.log(popularCategoriesApi)
  return <HomePage popularCategories={popularCategoriesApi} />;
}
