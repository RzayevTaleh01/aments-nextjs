"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const DEFAULT_LANG = "en";
const LANG_LOCAL_STORAGE_KEY = "oem_lang";
const LANG_COOKIE_KEY = "oem_lang";

function normalizeLang(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return DEFAULT_LANG;
  const base = raw.split("-")[0]?.toLowerCase();
  return base || DEFAULT_LANG;
}

function getCookieValue(name) {
  try {
    const cookie = String(document?.cookie ?? "");
    if (!cookie) return null;
    const parts = cookie.split(";").map((p) => p.trim());
    const match = parts.find((p) => p.startsWith(`${name}=`));
    if (!match) return null;
    return decodeURIComponent(match.slice(name.length + 1));
  } catch {
    return null;
  }
}

function getStoredLang() {
  try {
    const raw = window?.localStorage?.getItem(LANG_LOCAL_STORAGE_KEY);
    if (raw) return normalizeLang(raw);
  } catch {}

  const cookieLang = getCookieValue(LANG_COOKIE_KEY);
  if (cookieLang) return normalizeLang(cookieLang);

  try {
    const navLang = navigator?.language;
    if (navLang) return normalizeLang(navLang);
  } catch {}

  return DEFAULT_LANG;
}

function persistLang(lang) {
  const normalized = normalizeLang(lang);
  try {
    window?.localStorage?.setItem(LANG_LOCAL_STORAGE_KEY, normalized);
  } catch {}

  try {
    document.cookie = `${LANG_COOKIE_KEY}=${encodeURIComponent(normalized)}; path=/; max-age=31536000; samesite=lax`;
  } catch {}
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  useEffect(() => {
    const initial = getStoredLang();
    setLangState(initial);
    persistLang(initial);
  }, []);

  useEffect(() => {
    function onStorage(e) {
      if (e?.key !== LANG_LOCAL_STORAGE_KEY) return;
      const next = normalizeLang(e?.newValue);
      setLangState(next);
      persistLang(next);
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLang = useCallback((nextLang) => {
    const next = normalizeLang(nextLang);
    setLangState(next);
    persistLang(next);
  }, []);

  const value = useMemo(() => ({ lang, setLang, defaultLang: DEFAULT_LANG }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

