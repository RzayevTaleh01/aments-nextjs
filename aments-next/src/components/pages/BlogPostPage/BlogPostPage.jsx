"use client";

import Link from "next/link";
import { Breadcrumb, Icon } from "@/components/ui";
import styles from "./BlogPostPage.module.scss";

export default function BlogPostPage({ sidebarPosition = "left", title = "Blog Single Sidebar Left" }) {
  const rowClass = sidebarPosition === "right" ? "row flex-column-reverse flex-lg-row-reverse" : "row flex-column-reverse flex-lg-row";

  return (
    <div className={styles.scope}>
      <Breadcrumb
        title={title}
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog/grid/sidebar-left" },
          { label: title },
        ]}
      />

      <div className="blog-single-section">
        <div className="container">
          <div className={rowClass}>
            <div className="col-lg-3">
              <div className="siderbar-section" data-aos="fade-up" data-aos-delay="0">
                <div className="sidebar-single-widget">
                  <h6 className="sidebar-title">Search</h6>
                  <div className="sidebar-content">
                    <div className="search-bar">
                      <form className="default-search-style d-flex" action="#" onSubmit={(e) => e.preventDefault()}>
                        <input className="default-search-style-input-box border-around border-right-none" type="search" placeholder="Search..." required />
                        <button className="default-search-style-input-btn" type="submit" aria-label="Search">
                          <Icon name="FaSearch" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="sidebar-single-widget">
                  <h6 className="sidebar-title">Recent Post</h6>
                  <div className="sidebar-content">
                    <div className="recent-post">
                      <ul>
                        {[
                          { img: "/assets/images/blog_recent_post/blog1.jpg", date: "March 16, 2022" },
                          { img: "/assets/images/blog_recent_post/blog2.jpg", date: "March 16, 2022" },
                          { img: "/assets/images/blog_recent_post/blog3.jpg", date: "March 16, 2022" },
                        ].map((p, idx) => (
                          <li key={idx} className="recent-post-list">
                            <Link href="/blog/post/sidebar-left" className="post-image">
                              <img src={p.img} alt="" />
                            </Link>
                            <div className="post-content">
                              <Link className="post-link" href="/blog/post/sidebar-left">
                                Blog Image Post
                              </Link>
                              <span className="post-date">{p.date}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="sidebar-single-widget">
                  <h6 className="sidebar-title">Tag products</h6>
                  <div className="sidebar-content">
                    <div className="tag-link">
                      {["asian", "brown", "euro", "fashion", "hat", "t-shirt", "teen", "travel", "white"].map((tag) => (
                        <a key={tag} href="#" onClick={(e) => e.preventDefault()}>
                          {tag}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="blog-single-wrapper">
                <div className="blog-single-img" data-aos="fade-up" data-aos-delay="0">
                  <img className="img-fluid" src="/assets/images/blog_images/blog-big1.jpg" alt="" />
                </div>
                <div className="blog-feed-post-meta" data-aos="fade-up" data-aos-delay="200">
                  <span>By:</span>
                  <a href="#" className="blog-feed-post-meta-author" onClick={(e) => e.preventDefault()}>
                    Admin
                  </a>{" "}
                  -{" "}
                  <a href="#" className="blog-feed-post-meta-date" onClick={(e) => e.preventDefault()}>
                    Sep 14, 2022
                  </a>
                </div>
                <h4 className="post-title" data-aos="fade-up" data-aos-delay="400">
                  Blog image post
                </h4>
                <div className="para-content" data-aos="fade-up" data-aos-delay="600">
                  <p>
                    Aenean et tempor eros, vitae sollicitudin velit. Etiam varius enim nec quam tempor, sed efficitur ex ultrices. Phasellus pretium est
                    vel dui vestibulum condimentum. Aenean nec suscipit nibh. Phasellus nec lacus id arcu facilisis elementum. Curabitur lobortis, elit ut
                    elementum congue, erat ex bibendum odio, nec iaculis lacus sem non lorem. Duis suscipit metus ante, sed convallis quam posuere quis. Ut
                    tincidunt eleifend odio, ac fringilla mi vehicula nec. Nunc vitae lacus eget lectus imperdiet tempus sed in dui. Nam molestie magna at
                    risus consectetur, placerat suscipit justo dignissim. Sed vitae fringilla enim, nec ullamcorper arcu.
                  </p>
                  <blockquote className="blockquote-content">
                    Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur. In venenatis elit ac ultrices convallis. Duis est nisi,
                    tincidunt ac urna sed, cursus blandit lectus. In ullamcorper sit amet ligula ut eleifend. Proin dictum tempor ligula, ac feugiat
                    metus. Sed finibus tortor eu scelerisque scelerisque.
                  </blockquote>
                  <p>
                    Aenean et tempor eros, vitae sollicitudin velit. Etiam varius enim nec quam tempor, sed efficitur ex ultrices. Phasellus pretium est
                    vel dui vestibulum condimentum. Aenean nec suscipit nibh. Phasellus nec lacus id arcu facilisis elementum. Curabitur lobortis, elit ut
                    elementum congue, erat ex bibendum odio, nec iaculis lacus sem non lorem. Duis suscipit metus ante, sed convallis quam posuere quis. Ut
                    tincidunt eleifend odio, ac fringilla mi vehicula nec. Nunc vitae lacus eget lectus imperdiet tempus sed in dui. Nam molestie magna at
                    risus consectetur, placerat suscipit justo dignissim. Sed vitae fringilla enim, nec ullamcorper arcu.
                  </p>
                  <p>
                    Suspendisse turpis ipsum, tempus in nulla eu, posuere pharetra nibh. In dignissim vitae lorem non mollis. Praesent pretium tellus in
                    tortor viverra condimentum. Nullam dignissim facilisis nisl, accumsan placerat justo ultricies vel. Vivamus finibus mi a neque pretium,
                    ut convallis dui lacinia. Morbi a rutrum velit. Curabitur sagittis quam quis consectetur mattis. Aenean sit amet quam vel turpis
                    interdum sagittis et eget neque. Nunc ante quam, luctus et neque a, interdum iaculis metus. Aliquam vel ante mattis, placerat orci id,
                    vehicula quam. Suspendisse quis eros cursus, viverra urna sed, commodo mauris. Cras diam arcu, fringilla a sem condimentum, viverra
                    facilisis nunc. Curabitur vitae orci id nulla maximus maximus. Nunc pulvinar sollicitudin molestie.
                  </p>
                </div>
                <div className="para-tags" data-aos="fade-up" data-aos-delay="0">
                  <span>Tags: </span>
                  <ul>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        fashion
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        t-shirt
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        white
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="comment-area">
                <div className="comment-box" data-aos="fade-up" data-aos-delay="0">
                  <h4 className="mb-30">3 Comments</h4>
                  <ul className="comment">
                    <li className="comment-list">
                      <div className="comment-wrapper">
                        <div className="comment-img">
                          <img src="/assets/images/user/image-1.png" alt="" />
                        </div>
                        <div className="comment-content">
                          <div className="comment-content-top">
                            <div className="comment-content-left">
                              <h6 className="comment-name">Kaedyn Fraser</h6>
                            </div>
                            <div className="comment-content-right">
                              <a href="#" onClick={(e) => e.preventDefault()}>
                                <Icon name="FaReply" size={16} className="me-1" />
                                Reply
                              </a>
                            </div>
                          </div>

                          <div className="para-content">
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
                        <li className="comment-reply-list">
                          <div className="comment-wrapper">
                            <div className="comment-img">
                              <img src="/assets/images/user/image-2.png" alt="" />
                            </div>
                            <div className="comment-content">
                              <div className="comment-content-top">
                                <div className="comment-content-left">
                                  <h6 className="comment-name">Oaklee Odom</h6>
                                </div>
                                <div className="comment-content-right">
                                  <a href="#" onClick={(e) => e.preventDefault()}>
                                    <Icon name="FaReply" size={16} className="me-1" />
                                    Reply
                                  </a>
                                </div>
                              </div>

                              <div className="para-content">
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
                    </li>

                    <li className="comment-list">
                      <div className="comment-wrapper">
                        <div className="comment-img">
                          <img src="/assets/images/user/image-3.png" alt="" />
                        </div>
                        <div className="comment-content">
                          <div className="comment-content-top">
                            <div className="comment-content-left">
                              <h6 className="comment-name">Jaydin Jones</h6>
                            </div>
                            <div className="comment-content-right">
                              <a href="#" onClick={(e) => e.preventDefault()}>
                                <Icon name="FaReply" size={16} className="me-1" />
                                Reply
                              </a>
                            </div>
                          </div>

                          <div className="para-content">
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
                </div>

                <div className="comment-form" data-aos="fade-up" data-aos-delay="0">
                  <div className="coment-form-text-top mt-30">
                    <h4>Leave a Reply</h4>
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
                          Post Comment
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
  );
}
