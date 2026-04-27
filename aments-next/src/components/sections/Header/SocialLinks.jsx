"use client";

import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import styles from "./SocialLinks.module.scss";

export default function SocialLinks({ className }) {
  return (
    <div className={cn(styles.scope, className)}>
      <ul className="header-social-link">
        <li>
          <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
            <Icon name="FaFacebookF" size={16} />
          </a>
        </li>
        <li>
          <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
            <Icon name="FaTwitter" size={16} />
          </a>
        </li>
        <li>
          <a href="#" aria-label="YouTube" onClick={(e) => e.preventDefault()}>
            <Icon name="FaYoutube" size={16} />
          </a>
        </li>
        <li>
          <a href="#" aria-label="Pinterest" onClick={(e) => e.preventDefault()}>
            <Icon name="FaPinterestP" size={16} />
          </a>
        </li>
        <li>
          <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
            <Icon name="FaInstagram" size={16} />
          </a>
        </li>
      </ul>
    </div>
  );
}

