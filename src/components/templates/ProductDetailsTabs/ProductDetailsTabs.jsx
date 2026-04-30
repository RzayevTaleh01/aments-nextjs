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
                  <a
                    className={cn("nav-link", activeTab === "description" && "active")}
                    href="#description"
                    onClick={(e) => {
                      e.preventDefault();
                      onTabChange("description");
                    }}
                  >
                    <h5>Description</h5>
                  </a>
                </li>
                <li>
                  <a
                    className={cn("nav-link", activeTab === "specification" && "active")}
                    href="#specification"
                    onClick={(e) => {
                      e.preventDefault();
                      onTabChange("specification");
                    }}
                  >
                    <h5>Specification</h5>
                  </a>
                </li>
              </ul>

              <div className="product-details-content-tab">
                <div className="tab-content">
                  <div className={cn("tab-pane fade", activeTab === "description" && "show active")} id="description">
                    <div>
                      <p>
                        {product?.description ||
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla."}
                      </p>
                      <p>
                        Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus
                        ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue
                        nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi
                        posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula
                        tellus, in imperdiet ligula euismod eget
                      </p>
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

