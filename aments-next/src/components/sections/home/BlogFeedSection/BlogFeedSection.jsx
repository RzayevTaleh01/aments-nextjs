import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./BlogFeedSection.module.scss";

export default function BlogFeedSection({ posts }) {
  return (
    <div className={cn(styles.scope, "blog-feed-section section-top-gap-100")}>
      <div className="section-content-gap">
        <div className="container">
          <div className="row">
            <div className="section-content">
              <h3 className="section-title">Latest News</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-feed-wrapper">
        <div className="container">
          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6 col-12">
                <div className="blog-feed-single">
                  <Link href={post.href} className="blog-feed-img-link">
                    <Image src={post.imageSrc} alt={post.title} width={410} height={320} className="blog-feed-img" />
                  </Link>
                  <div className="blog-feed-content">
                    <div className="blog-feed-post-meta">
                      <span>By:</span>
                      <span className="blog-feed-post-meta-author">{post.author}</span> -
                      <span className="blog-feed-post-meta-date">{post.date}</span>
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
      </div>
    </div>
  );
}
