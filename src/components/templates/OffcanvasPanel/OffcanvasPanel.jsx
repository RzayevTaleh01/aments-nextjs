"use client";

import { Offcanvas } from "reactstrap";
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
  const direction = className?.includes("offcanvas-rightside") ? "end" : "start";

  return (
    <Offcanvas
      id={id}
      isOpen={isOpen}
      toggle={onClose}
      direction={direction}
      backdrop
      scrollable={false}
      fade={false}
      className={`${className}${isOpen ? ` ${openClassName}` : ""}`}
    >
      <div className={headerClassName}>
        <button type="button" className={closeButtonClassName} onClick={onClose}>
          <Icon name={closeIconName} size={closeIconSize} className={closeIconClassName} />
        </button>
      </div>
      {children}
    </Offcanvas>
  );
}

