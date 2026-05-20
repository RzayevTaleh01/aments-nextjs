const PopularCategoryDefaults = {
  id: null,
  name: "",
  image: "",
  items: "(0 Items)",
  href: "/products",
};

export function mapPopularCategory(raw = {}) {
  return {
    ...PopularCategoryDefaults,
    id: raw?.id ?? PopularCategoryDefaults.id,
    name: raw?.name ?? PopularCategoryDefaults.name,
    image: raw?.image ?? PopularCategoryDefaults.image,
    items: `(${raw?.orderCount ?? 0} Items)`,
    href: raw?.id != null ? `/products?categoryId=${encodeURIComponent(String(raw.id))}` : PopularCategoryDefaults.href,
  };
}
