import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./PopularCategoriesSection.module.scss";

export default function PopularCategoriesSection({ categories }) {
  return (
    <div className={cn(styles.scope, "product-catagory-section section-top-gap-100")}>
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
                <Link href={cat.href} className="product-catagory-single">
                  <div className="product-catagory-img">
                    <Image src={cat.imageSrc} alt={cat.title} width={300} height={300} />
                  </div>
                  <div className="product-catagory-content">
                    <h5 className="product-catagory-title">{cat.title}</h5>
                    <span className="product-catagory-items">{cat.items}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
