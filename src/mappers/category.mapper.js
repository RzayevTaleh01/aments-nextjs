const CategoryDefaults = {
  id: null,
  title: "",
  href: "/products",
  imageSrc: "/assets/images/categories_images/aments_categories_01.jpg",
  items: "",
};

function buildCategoryItemsLabel(raw) {
  const countCandidates = [
    raw?.order_count,
    raw?.ordersCount,
    raw?.orders_count,
    raw?.products_count,
    raw?.product_count,
    raw?.count,
  ];
  const count = countCandidates.find(
    (v) => (typeof v === "number" && Number.isFinite(v)) || (typeof v === "string" && v.trim() !== ""),
  );
  return count != null ? `(${count} Items)` : "";
}

export function mapCategory(raw = {}) {
  const id = raw?.id ?? CategoryDefaults.id;

  return {
    ...CategoryDefaults,
    id,
    title: raw?.title ?? raw?.name ?? CategoryDefaults.title,
    imageSrc: raw?.image ?? raw?.icon ?? raw?.photo ?? raw?.thumbnail ?? CategoryDefaults.imageSrc,
    items: raw?.items ?? buildCategoryItemsLabel(raw),
    href: id != null ? `/products?categoryId=${encodeURIComponent(String(id))}` : CategoryDefaults.href,
  };
}
