import HomePage from "@/components/pages/HomePage";
import { getPopularCategories } from "@/queries/popularCategories.query";
import { getServerLang } from "@/utils/lang";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Home",
};

export default async function Page() {
  const lang = await getServerLang();

  let popularCategories = [];
  try {
    popularCategories = await getPopularCategories({ lang });
  } catch {
    popularCategories = [];
  }

  return <HomePage popularCategories={popularCategories} />;
}
