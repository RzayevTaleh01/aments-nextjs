import { clsx } from "clsx";

export function createCx(styles) {
  return (...inputs) => {
    const className = clsx(inputs);
    if (!className) return "";
    if (!styles) return className;

    return className
      .split(/\s+/)
      .filter(Boolean)
      .map((token) => styles[token] ?? token)
      .join(" ");
  };
}

