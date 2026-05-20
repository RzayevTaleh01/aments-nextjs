import HomePage from "@/components/pages/HomePage";
import { getHomeProducts } from "@/queries/homeProducts.query";
import { getPopularCategories } from "@/queries/popularCategories.query";
import { getServerLang } from "@/utils/lang";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Home",
};

export default async function Page() {
  const lang = await getServerLang();

  let popularCategories = [];
  let homeProducts = [];
  try {
    const [cats, products] = await Promise.all([getPopularCategories({ lang }), getHomeProducts({ lang })]);
    popularCategories = cats;
    homeProducts = products;
  } catch {
    popularCategories = [];
    homeProducts = [];
  }

  return <HomePage popularCategories={popularCategories} products={homeProducts} />;
}
