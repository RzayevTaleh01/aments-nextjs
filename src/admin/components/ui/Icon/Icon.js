import { cloneElement, isValidElement } from "react";

export default function SgIcon(props) {
    const { icon, size, className } = props;

    const normalizedSize = typeof size === "string" ? Number(size) : size;
    const resolvedSize = Number.isFinite(normalizedSize) ? normalizedSize : 18;

    if (!icon) return null;

    if (typeof icon === "function") {
        const Comp = icon;
        return <Comp size={resolvedSize} className={className} />;
    }

    if (isValidElement(icon)) {
        return cloneElement(icon, { size: resolvedSize, className });
    }
    return null;
}
