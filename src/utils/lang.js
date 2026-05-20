export function normalizeLang(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "en";
  const base = raw.split("-")[0]?.toLowerCase();
  return base || "en";
}

export async function getServerLang() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return normalizeLang(cookieStore?.get?.("oem_lang")?.value);
}

