"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STATIC_CONTENT_MOCK } from "@/constants/staticContentMock";
import { useLanguage } from "@/context/language-context";

const StaticContentContext = createContext(null);
const STATIC_CONTENT_STORAGE_PREFIX = "oem_static_content:";

function normalizeLang(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "en";
  const base = raw.split("-")[0]?.toLowerCase();
  return base || "en";
}

function getStaticContentStorageKey(lang) {
  return `${STATIC_CONTENT_STORAGE_PREFIX}${normalizeLang(lang)}`;
}

function readStaticContentCache(lang) {
  try {
    const raw = window?.localStorage?.getItem(getStaticContentStorageKey(lang));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function writeStaticContentCache(lang, payload) {
  try {
    const key = getStaticContentStorageKey(lang);
    window?.localStorage?.setItem(key, JSON.stringify(payload ?? {}));
  } catch {}
  try {
    window.__oem_static_content = payload ?? {};
  } catch {}
}

async function fetchStaticContent(lang) {
  const resolvedLang = normalizeLang(lang);
  const payload = STATIC_CONTENT_MOCK[resolvedLang] ?? STATIC_CONTENT_MOCK.en ?? {};
  return payload;
}

export function StaticContentProvider({ children }) {
  const { lang } = useLanguage();
  const [staticContent, setStaticContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);

    (async () => {
      try {
        const cached = readStaticContentCache(lang);
        if (cached && isActive) setStaticContent(cached);

        const data = await fetchStaticContent(lang);
        if (!isActive) return;
        setStaticContent(data);
        writeStaticContentCache(lang, data);
      } finally {
        if (!isActive) return;
        setIsLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [lang]);

  const value = useMemo(() => ({ staticContent, isLoading }), [staticContent, isLoading]);

  return <StaticContentContext.Provider value={value}>{children}</StaticContentContext.Provider>;
}

export function useStaticContent() {
  const ctx = useContext(StaticContentContext);
  if (!ctx) throw new Error("useStaticContent must be used within StaticContentProvider");
  return ctx;
}
