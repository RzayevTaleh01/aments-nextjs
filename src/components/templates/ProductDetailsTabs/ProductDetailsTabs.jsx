"use client";
import { cn } from "@/utils/cn";
import "./ProductDetailsTabs.module.scss";

export default function ProductDetailsTabs({ activeTab, onTabChange, product }) {
  return (
    <div className="section-inner-bg section-top-gap-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="product-details-content-tab-wrapper">
              <ul className="product-details-content-tab-btn nav tablist d-flex justify-content-center">
                <li>
                  <button
                    type="button"
                    className={cn("nav-link", activeTab === "description" && "active")}
                    onClick={() => onTabChange("description")}
                  >
                    <h5>Description</h5>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={cn("nav-link", activeTab === "specification" && "active")}
                    onClick={() => onTabChange("specification")}
                  >
                    <h5>Specification</h5>
                  </button>
                </li>
              </ul>

              <div className="product-details-content-tab">
                <div className="tab-content">
                  <div className={cn("tab-pane fade", activeTab === "description" && "show active")} id="description">
                    <div>
                      <p>{product.description}</p>
                    </div>
                  </div>

                  <div className={cn("tab-pane fade", activeTab === "specification" && "show active")} id="specification">
                    <div>
                      <table className="table table-bordered mb-20">
                        <tbody>
                          <tr>
                            <th scope="row">Compositions</th>
                            <td>Polyester</td>
                          </tr>
                          <tr>
                            <th scope="row">Styles</th>
                            <td>Girly</td>
                          </tr>
                          <tr>
                            <th scope="row">Properties</th>
                            <td>Short Dress</td>
                          </tr>
                        </tbody>
                      </table>
                      <p>
                        Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and
                        statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman&apos;s
                        wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are
                        made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats,
                        belts and more!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

