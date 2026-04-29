"use client";

import Image from "next/image";
import { Icon } from "@/components/ui";
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
                <li>
                  <a
                    className={cn("nav-link", activeTab === "review" && "active")}
                    href="#review"
                    onClick={(e) => {
                      e.preventDefault();
                      onTabChange("review");
                    }}
                  >
                    <h5>Reviews (1)</h5>
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

                  <div className={cn("tab-pane fade", activeTab === "review" && "show active")} id="review">
                    <div>
                      <ul>
                        <li className="comment-list">
                          <div className="comment-wrapper">
                            <div className="comment-img">
                              <Image src="/assets/images/user/image-1.png" alt="" width={80} height={80} />
                            </div>
                            <div>
                              <div className="comment-content-top">
                                <div>
                                  <h6 className="comment-name">Kaedyn Fraser</h6>
                                  <div className="product-review">
                                    <span className="review-fill">
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className="review-fill">
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className="review-fill">
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className="review-fill">
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className="review-empty">
                                      <Icon name="FaRegStar" size={14} />
                                    </span>
                                  </div>
                                </div>
                                <div className="comment-content-right">
                                  <a href="#" onClick={(e) => e.preventDefault()}>
                                    <i>
                                      <Icon name="FaReply" size={16} />
                                    </i>
                                    Reply
                                  </a>
                                </div>
                              </div>

                              <div>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora inventore dolorem a unde modi iste odio amet, fugit fuga
                                  aliquam, voluptatem maiores animi dolor nulla magnam ea! Dignissimos aspernatur cumque nam quod sint provident modi alias
                                  culpa, inventore deserunt accusantium amet earum soluta consequatur quasi eum eius laboriosam, maiores praesentium explicabo
                                  enim dolores quaerat! Voluptas ad ullam quia odio sint sunt. Ipsam officia, saepe repellat.
                                </p>
                              </div>
                            </div>
                          </div>

                          <ul className="comment-reply">
                            <li>
                              <div className="comment-wrapper">
                                <div className="comment-img">
                                  <Image src="/assets/images/user/image-2.png" alt="" width={80} height={80} />
                                </div>
                                <div>
                                  <div className="comment-content-top">
                                    <div>
                                      <h6 className="comment-name">Oaklee Odom</h6>
                                    </div>
                                    <div className="comment-content-right">
                                      <a href="#" onClick={(e) => e.preventDefault()}>
                                        <i>
                                          <Icon name="FaReply" size={16} />
                                        </i>
                                        Reply
                                      </a>
                                    </div>
                                  </div>

                                  <div>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora inventore dolorem a unde modi iste odio amet, fugit
                                      fuga aliquam, voluptatem maiores animi dolor nulla magnam ea! Dignissimos aspernatur cumque nam quod sint provident modi
                                      alias culpa, inventore deserunt accusantium amet earum soluta consequatur quasi eum eius laboriosam, maiores praesentium
                                      explicabo enim dolores quaerat! Voluptas ad ullam quia odio sint sunt. Ipsam officia, saepe repellat.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>

                        <li className="comment-list">
                          <div className="comment-wrapper">
                            <div className="comment-img">
                              <Image src="/assets/images/user/image-3.png" alt="" width={80} height={80} />
                            </div>
                            <div>
                              <div className="comment-content-top">
                                <div>
                                  <h6 className="comment-name">Jaydin Jones</h6>
                                  <div className="product-review">
                                    <span className="review-fill">
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className="review-fill">
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className="review-fill">
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className="review-fill">
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className="review-empty">
                                      <Icon name="FaRegStar" size={14} />
                                    </span>
                                  </div>
                                </div>
                                <div className="comment-content-right">
                                  <a href="#" onClick={(e) => e.preventDefault()}>
                                    <i>
                                      <Icon name="FaReply" size={16} />
                                    </i>
                                    Reply
                                  </a>
                                </div>
                              </div>

                              <div>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora inventore dolorem a unde modi iste odio amet, fugit fuga
                                  aliquam, voluptatem maiores animi dolor nulla magnam ea! Dignissimos aspernatur cumque nam quod sint provident modi alias
                                  culpa, inventore deserunt accusantium amet earum soluta consequatur quasi eum eius laboriosam, maiores praesentium explicabo
                                  enim dolores quaerat! Voluptas ad ullam quia odio sint sunt. Ipsam officia, saepe repellat.
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>

                      <div>
                        <div className="review-form-text-top">
                          <h5>ADD A REVIEW</h5>
                          <p>Your email address will not be published. Required fields are marked *</p>
                        </div>

                        <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="default-form-box mb-20">
                                <label htmlFor="comment-name">
                                  Your name <span>*</span>
                                </label>
                                <input id="comment-name" type="text" placeholder="Enter your name" required />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="default-form-box mb-20">
                                <label htmlFor="comment-email">
                                  Your Email <span>*</span>
                                </label>
                                <input id="comment-email" type="email" placeholder="Enter your email" required />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="default-form-box mb-20">
                                <label htmlFor="comment-review-text">
                                  Your review <span>*</span>
                                </label>
                                <textarea id="comment-review-text" placeholder="Write a review" required />
                              </div>
                            </div>
                            <div className="col-12">
                              <button className="form-submit-btn" type="submit">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
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

