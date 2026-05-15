"use client";

import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UIDrawersProvider } from "@/context/ui-drawers-context";
import { LanguageProvider } from "@/context/language-context";
import { StaticContentProvider } from "@/context/static-content-context";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

const LANG_SWITCH_LOADER_UNTIL_KEY = "oem_lang_loader_until";

function LanguageSwitchLoader() {
  const { staticContent } = useInitial();
  const [visibleUntil, setVisibleUntil] = useState(0);

  useEffect(() => {
    const now = Date.now();
    const storedRaw = typeof window !== "undefined" ? window.localStorage?.getItem(LANG_SWITCH_LOADER_UNTIL_KEY) : null;
    const storedUntil = Number(storedRaw || 0);
    if (Number.isFinite(storedUntil) && storedUntil > now) setVisibleUntil(storedUntil);

    const onEvent = (e) => {
      const nextUntil = Number(e?.detail?.until || 0);
      if (Number.isFinite(nextUntil) && nextUntil > Date.now()) setVisibleUntil(nextUntil);
    };

    window.addEventListener("oem:lang-loader", onEvent);
    return () => window.removeEventListener("oem:lang-loader", onEvent);
  }, []);

  useEffect(() => {
    if (!visibleUntil) return;
    const now = Date.now();
    const remaining = Math.max(0, visibleUntil - now);
    if (remaining <= 0) {
      setVisibleUntil(0);
      try {
        window.localStorage?.removeItem(LANG_SWITCH_LOADER_UNTIL_KEY);
      } catch {}
      return;
    }

    const t = window.setTimeout(() => {
      setVisibleUntil(0);
      try {
        window.localStorage?.removeItem(LANG_SWITCH_LOADER_UNTIL_KEY);
      } catch {}
    }, remaining);

    return () => window.clearTimeout(t);
  }, [visibleUntil]);

  const isVisible = visibleUntil > Date.now();
  const label = useMemo(
    () =>
      HelperTranslate({
        defaultText: "Loading...",
        translateText: staticContent?.common__loading,
      }),
    [staticContent]
  );

  if (!isVisible) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div className="oem-lang-loader-spinner" />
          <div style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>{label}</div>
        </div>
      </div>
      <style jsx global>{`
        .oem-lang-loader-spinner {
          width: 44px;
          height: 44px;
          border: 4px solid rgba(0, 0, 0, 0.15);
          border-top-color: rgba(0, 0, 0, 0.65);
          border-radius: 50%;
          animation: oemLangLoaderSpin 0.9s linear infinite;
        }
        @keyframes oemLangLoaderSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}

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
            <LanguageSwitchLoader />
            <ToastContainer position="top-right" autoClose={5000} closeOnClick pauseOnHover newestOnTop />
          </UIDrawersProvider>
        </StaticContentProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}
