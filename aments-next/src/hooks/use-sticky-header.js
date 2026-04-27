"use client";

import { useEffect, useState } from "react";

export function useStickyHeader({ offset = 100 } = {}) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsSticky(window.scrollY >= offset);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return isSticky;
}

