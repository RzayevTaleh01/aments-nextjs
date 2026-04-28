import { cn } from "@/utils/cn";
import { ProductCategorySingle } from "@/components/ui";
import styles from "./PopularCategoriesSection.module.scss";

export default function PopularCategoriesSection({ categories }) {
  return (
    <div className={cn(styles.root, "product-catagory-section section-top-gap-100")}>
      <div className="section-content-gap">
        <div className="container">
          <div className="row">
            <div className="section-content">
              <h3 className="section-title">Popular Categories</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="product-catagory-wrapper">
        <div className="container">
          <div className="row">
            {categories.map((cat) => (
              <div key={cat.id} className="col-lg-3 col-md-4 col-sm-6 col-12">
                <ProductCategorySingle href={cat.href} imageSrc={cat.imageSrc} title={cat.title} items={cat.items} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
