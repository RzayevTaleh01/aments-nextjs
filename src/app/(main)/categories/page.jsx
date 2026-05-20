import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import ProductCategorySingle from "@/components/templates/ProductCategorySingle/ProductCategorySingle";
import { getCategories } from "@/queries/categories.query";
import { getServerLang } from "@/utils/lang";

export const dynamic = "force-dynamic";

export default async function Page() {
  const lang = await getServerLang();

  let categories = [];
  try {
    categories = await getCategories({ lang });
  } catch {
    categories = [];
  }

  return (
    <div>
      <Breadcrumb title="Categories" items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />

      <div className="product-catagory-wrapper section-top-gap-100">
        <div className="container">
          <div className="row mb-4 align-items-center">
            <div className="col">
              <h3 className="section-title mb-0">All Categories</h3>
            </div>
            <div className="col-auto text-muted">{`Cəmi: ${categories.length}`}</div>
          </div>

          <div className="row pt-3">
            {categories.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-light border mb-0">Kateqoriya tapılmadı</div>
              </div>
            ) : null}

            {categories.map((cat) => (
              <div key={String(cat.id)} className="col-lg-3 col-md-4 col-sm-6 col-12">
                <ProductCategorySingle href={cat.href} imageSrc={cat.imageSrc} title={cat.title} items={cat.items} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
