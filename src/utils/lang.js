export function normalizeLang(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "en";
  const base = raw.split("-")[0]?.toLowerCase();
  return base || "en";
}

export function getClientLang() {
  if (typeof document === "undefined") return "en";
  const raw = document.cookie
    .split(";")
    .map((x) => x.trim())
    .find((x) => x.startsWith("oem_lang="));
  const value = raw ? decodeURIComponent(raw.split("=").slice(1).join("=")) : "";
  return normalizeLang(value);
}

export async function getServerLang() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return normalizeLang(cookieStore?.get?.("oem_lang")?.value);
}

