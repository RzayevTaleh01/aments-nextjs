export function toText(value) {
  if (value === undefined || value === null) return "";
  if (Array.isArray(value)) return value.length ? toText(value[0]) : "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object") {
    const translations = Array.isArray(value?.translations) ? value.translations : null;
    if (translations?.length) {
      const candidate = translations.find((t) => t?.name || t?.title || t?.label) || translations[0];
      const t = toText(candidate);
      if (t.trim() !== "") return t;
    }

    const v = value?.name ?? value?.title ?? value?.label ?? value?.slug ?? value?.code ?? value?.id;
    return v === undefined || v === null ? "" : String(v);
  }
  return String(value);
}

export function pickText(row, keys, fallback = "-") {
  for (const key of keys) {
    const raw = row?.[key];
    const value = toText(raw);
    if (value.trim() !== "") return value;
  }
  return fallback;
}
