import { clsx } from "clsx";

export function cn(...inputs) {
  const [maybeStyles, ...rest] = inputs;
  const hasStyles =
    maybeStyles &&
    typeof maybeStyles === "object" &&
    !Array.isArray(maybeStyles) &&
    Object.values(maybeStyles).some((v) => typeof v === "string");

  const className = clsx(hasStyles ? rest : inputs);
  if (!className) return "";

  if (!hasStyles) return className;

  return className
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => maybeStyles[token] ?? token)
    .join(" ");
}
