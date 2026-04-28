"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import styles from "./ScrollTop.module.scss";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY >= 300);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(styles.button, visible && styles.visible)}
      aria-label="Scroll to top"
    />
  );
}

