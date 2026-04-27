"use client";

import Link from "next/link";
import { Breadcrumb, Icon } from "@/components/ui";
import { blogPosts } from "@/constants/blog";
import styles from "./BlogListPage.module.scss";

export default function BlogListPage({ title, breadcrumbLabel, withSidebar = false, sidebarPosition = "left", columns = 3 }) {
  const gridColClass = columns === 2 ? "col-md-6 col-12" : "col-lg-4 col-md-6 col-12";

  const sidebar = (
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
              <a
                key={tag}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.scope}>
      <Breadcrumb
        title={title}
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog/grid/sidebar-left" },
          { label: breadcrumbLabel },
        ]}
      />

      <div className="blog-section">
        <div className="container">
          {withSidebar ? (
            <div className={`row flex-column-reverse flex-lg-row${sidebarPosition === "right" ? "-reverse" : ""}`}>
              <div className="col-lg-3">{sidebar}</div>
              <div className="col-lg-9">
                <div className="blog-grid-wrapper">
                  <div className="row">
                    {blogPosts.map((post, idx) => (
                      <div key={post.id} className="col-md-6 col-12">
                        <div className="blog-feed-single" data-aos="fade-up" data-aos-delay={idx % 2 === 0 ? "0" : "200"}>
                          <Link href={post.href} className="blog-feed-img-link">
                            <img src={post.images?.[0]} alt="" className="blog-feed-img" />
                          </Link>
                          <div className="blog-feed-content">
                            <div className="blog-feed-post-meta">
                              <span>By:</span>
                              <a href="#" className="blog-feed-post-meta-author" onClick={(e) => e.preventDefault()}>
                                {post.author || "Admin"}
                              </a>{" "}
                              -{" "}
                              <a href="#" className="blog-feed-post-meta-date" onClick={(e) => e.preventDefault()}>
                                {post.date || "Sep 14, 2022"}
                              </a>
                            </div>
                            <h5 className="blog-feed-link">
                              <Link href={post.href}>{post.title}</Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="page-pagination text-center" data-aos="fade-up" data-aos-delay="0">
                  <ul>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Previous
                      </a>
                    </li>
                    <li>
                      <a className="active" href="#" onClick={(e) => e.preventDefault()}>
                        1
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        2
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        3
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="row ">
              <div className="col-12">
                <div className="blog-full-width-wrapper">
                  <div className="row">
                    {blogPosts.map((post, idx) => (
                      <div key={post.id} className={gridColClass}>
                        <div className="blog-feed-single" data-aos="fade-up" data-aos-delay={String((idx % 3) * 200)}>
                          <Link href={post.href} className="blog-feed-img-link">
                            <img src={post.images?.[0]} alt="" className="blog-feed-img" />
                          </Link>
                          <div className="blog-feed-content">
                            <div className="blog-feed-post-meta">
                              <span>By:</span>
                              <a href="#" className="blog-feed-post-meta-author" onClick={(e) => e.preventDefault()}>
                                {post.author || "Admin"}
                              </a>{" "}
                              -{" "}
                              <a href="#" className="blog-feed-post-meta-date" onClick={(e) => e.preventDefault()}>
                                {post.date || "Sep 14, 2022"}
                              </a>
                            </div>
                            <h5 className="blog-feed-link">
                              <Link href={post.href}>{post.title}</Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="page-pagination text-center" data-aos="fade-up" data-aos-delay="0">
                  <ul>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Previous
                      </a>
                    </li>
                    <li>
                      <a className="active" href="#" onClick={(e) => e.preventDefault()}>
                        1
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        2
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        3
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
