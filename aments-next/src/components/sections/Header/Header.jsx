"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStickyHeader } from "@/hooks/use-sticky-header";
import useOffcanvas from "./useOffcanvas";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import Offcanvas from "./Offcanvas";
import SocialLinks from "./SocialLinks";

export default function Header() {
  const pathname = usePathname();
  const isSticky = useStickyHeader({ offset: 100 });
  const offcanvas = useOffcanvas();

  useEffect(() => {
    offcanvas.close();
  }, [offcanvas, pathname]);

  return (
    <>
      <DesktopHeader pathname={pathname} isSticky={isSticky} onOpen={offcanvas.open} />
      <MobileHeader onOpen={offcanvas.open} />
      <Offcanvas offcanvas={offcanvas} />
      <SocialLinks className="header-social d-lg-none" />
    </>
  );
}

