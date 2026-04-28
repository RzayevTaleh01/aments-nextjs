"use client";

import Image from "next/image";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import styles from "./ProductDetailsTabs.module.scss";

export default function ProductDetailsTabs({ activeTab, onTabChange, product }) {
  return (
    <div className={cn(styles.section, "section-inner-bg section-top-gap-100")}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={styles.wrapper} data-aos="fade-up" data-aos-delay="0">
              <ul className={cn(styles.tabBtn, "nav tablist d-flex justify-content-center")}>
                <li>
                  <a
                    className={cn(styles.tabLink, activeTab === "description" && styles.activeTabLink)}
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
                    className={cn(styles.tabLink, activeTab === "specification" && styles.activeTabLink)}
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
                    className={cn(styles.tabLink, activeTab === "review" && styles.activeTabLink)}
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

              <div className={styles.tabContent}>
                <div className={styles.tabPanes}>
                  <div className={cn(styles.tabPane, activeTab === "description" && styles.active)} id="description">
                    <div className={styles.singleTabContentItem}>
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

                  <div className={cn(styles.tabPane, activeTab === "specification" && styles.active)} id="specification">
                    <div className={styles.singleTabContentItem}>
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
                        statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's
                        wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are
                        made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats,
                        belts and more!
                      </p>
                    </div>
                  </div>

                  <div className={cn(styles.tabPane, activeTab === "review" && styles.active)} id="review">
                    <div className={styles.singleTabContentItem}>
                      <ul className={styles.comment}>
                        <li className={styles.commentList}>
                          <div className={styles.commentWrapper}>
                            <div className={styles.commentImg}>
                              <Image src="/assets/images/user/image-1.png" alt="" width={80} height={80} />
                            </div>
                            <div className={styles.commentContent}>
                              <div className={styles.commentContentTop}>
                                <div className={styles.commentContentLeft}>
                                  <h6 className={styles.commentName}>Kaedyn Fraser</h6>
                                  <div className={styles.productReview}>
                                    <span className={styles.reviewFill}>
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className={styles.reviewFill}>
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className={styles.reviewFill}>
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className={styles.reviewFill}>
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className={styles.reviewEmpty}>
                                      <Icon name="FaRegStar" size={14} />
                                    </span>
                                  </div>
                                </div>
                                <div className={styles.commentContentRight}>
                                  <a href="#" onClick={(e) => e.preventDefault()}>
                                    <Icon name="FaReply" size={16} className="me-1" />
                                    Reply
                                  </a>
                                </div>
                              </div>

                              <div className={styles.paraContent}>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora inventore dolorem a unde modi iste odio amet, fugit fuga
                                  aliquam, voluptatem maiores animi dolor nulla magnam ea! Dignissimos aspernatur cumque nam quod sint provident modi alias
                                  culpa, inventore deserunt accusantium amet earum soluta consequatur quasi eum eius laboriosam, maiores praesentium explicabo
                                  enim dolores quaerat! Voluptas ad ullam quia odio sint sunt. Ipsam officia, saepe repellat.
                                </p>
                              </div>
                            </div>
                          </div>

                          <ul className={styles.commentReply}>
                            <li className={styles.commentReplyList}>
                              <div className={styles.commentWrapper}>
                                <div className={styles.commentImg}>
                                  <Image src="/assets/images/user/image-2.png" alt="" width={80} height={80} />
                                </div>
                                <div className={styles.commentContent}>
                                  <div className={styles.commentContentTop}>
                                    <div className={styles.commentContentLeft}>
                                      <h6 className={styles.commentName}>Oaklee Odom</h6>
                                    </div>
                                    <div className={styles.commentContentRight}>
                                      <a href="#" onClick={(e) => e.preventDefault()}>
                                        <Icon name="FaReply" size={16} className="me-1" />
                                        Reply
                                      </a>
                                    </div>
                                  </div>

                                  <div className={styles.paraContent}>
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

                        <li className={styles.commentList}>
                          <div className={styles.commentWrapper}>
                            <div className={styles.commentImg}>
                              <Image src="/assets/images/user/image-3.png" alt="" width={80} height={80} />
                            </div>
                            <div className={styles.commentContent}>
                              <div className={styles.commentContentTop}>
                                <div className={styles.commentContentLeft}>
                                  <h6 className={styles.commentName}>Jaydin Jones</h6>
                                  <div className={styles.productReview}>
                                    <span className={styles.reviewFill}>
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className={styles.reviewFill}>
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className={styles.reviewFill}>
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className={styles.reviewFill}>
                                      <Icon name="FaStar" size={14} />
                                    </span>
                                    <span className={styles.reviewEmpty}>
                                      <Icon name="FaRegStar" size={14} />
                                    </span>
                                  </div>
                                </div>
                                <div className={styles.commentContentRight}>
                                  <a href="#" onClick={(e) => e.preventDefault()}>
                                    <Icon name="FaReply" size={16} className="me-1" />
                                    Reply
                                  </a>
                                </div>
                              </div>

                              <div className={styles.paraContent}>
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

                      <div className={styles.reviewForm}>
                        <div className={styles.reviewFormTextTop}>
                          <h5>ADD A REVIEW</h5>
                          <p>Your email address will not be published. Required fields are marked *</p>
                        </div>

                        <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
                          <div className="row">
                            <div className="col-md-6">
                              <div className={cn(styles.defaultFormBox, "mb-20")}>
                                <label htmlFor="comment-name">
                                  Your name <span>*</span>
                                </label>
                                <input id="comment-name" type="text" placeholder="Enter your name" required />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className={cn(styles.defaultFormBox, "mb-20")}>
                                <label htmlFor="comment-email">
                                  Your Email <span>*</span>
                                </label>
                                <input id="comment-email" type="email" placeholder="Enter your email" required />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className={cn(styles.defaultFormBox, "mb-20")}>
                                <label htmlFor="comment-review-text">
                                  Your review <span>*</span>
                                </label>
                                <textarea id="comment-review-text" placeholder="Write a review" required />
                              </div>
                            </div>
                            <div className="col-12">
                              <button className={styles.formSubmitBtn} type="submit">
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

