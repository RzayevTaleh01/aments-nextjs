"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UIDrawersProvider } from "@/context/ui-drawers-context";
import { LanguageProvider } from "@/context/language-context";
import { StaticContentProvider } from "@/context/static-content-context";

export default function Providers({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <SessionProvider>
      <LanguageProvider>
        <StaticContentProvider>
          <UIDrawersProvider>
            {children}
            <ToastContainer position="top-right" autoClose={5000} closeOnClick pauseOnHover newestOnTop />
          </UIDrawersProvider>
        </StaticContentProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}
