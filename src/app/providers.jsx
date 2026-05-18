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
import UiLoader from "@/components/ui/Loader/Loader";

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

  return <UiLoader fullscreen={true} label={label} />;
}

export default function Providers({ children, initialLang }) {
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
      <LanguageProvider initialLang={initialLang}>
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
