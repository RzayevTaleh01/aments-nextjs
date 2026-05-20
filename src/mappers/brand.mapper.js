const BrandDefaults = {
  id: null,
  name: "",
  href: "/products",
  imageSrc: "/assets/images/products_images/aments_products_image_1.jpg",
  brandName: "",
  markName: "",
  modelName: "",
  compareAt: null,
  isSimilarOem: false,
  price: null,
};

export function mapBrand(raw = {}) {
  const id = raw?.id ?? BrandDefaults.id;

  return {
    ...BrandDefaults,
    id,
    name: raw?.name ?? raw?.title ?? BrandDefaults.name,
    imageSrc: raw?.image ?? raw?.logo ?? raw?.icon ?? BrandDefaults.imageSrc,
    href: id != null ? `/products?brandId=${encodeURIComponent(String(id))}` : BrandDefaults.href,
  };
}

