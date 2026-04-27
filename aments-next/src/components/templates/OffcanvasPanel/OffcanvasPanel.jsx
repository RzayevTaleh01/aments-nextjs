"use client";

import { Icon } from "@/components/ui";

export default function OffcanvasPanel({
  id,
  className,
  isOpen,
  openClassName = "offcanvas-open",
  headerClassName,
  closeButtonClassName,
  closeIconName = "FaTimes",
  closeIconSize = 18,
  closeIconClassName,
  onClose,
  children,
}) {
  return (
    <div id={id} className={`${className}${isOpen ? ` ${openClassName}` : ""}`}>
      <div className={headerClassName}>
        <button type="button" className={closeButtonClassName} onClick={onClose}>
          <Icon name={closeIconName} size={closeIconSize} className={closeIconClassName} />
        </button>
      </div>
      {children}
    </div>
  );
}

