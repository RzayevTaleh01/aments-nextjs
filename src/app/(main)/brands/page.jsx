import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import ProductCatalogList from "@/components/templates/ProductCatalogList";
import { getBrands } from "@/queries/brands.query";
import { getServerLang } from "@/utils/lang";

export const dynamic = "force-dynamic";

export default async function Page() {
  const lang = await getServerLang();

  let brands = [];
  try {
    brands = await getBrands({ lang });
  } catch {
    brands = [];
  }

  return (
    <div>
      <Breadcrumb title="Brands" items={[{ label: "Home", href: "/" }, { label: "Brands" }]} />

      <ProductCatalogList
        products={brands}
        withSidebar={false}
        defaultView="grid"
        showPagination={false}
        showCartIcon={false}
        emptyMessage={"Brend tapılmadı"}
        enableClientSearch={false}
      />
    </div>
  );
}
