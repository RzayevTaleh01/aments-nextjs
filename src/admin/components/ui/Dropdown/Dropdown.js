import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function SgDropdown(props) {
    const {toggleHeader, direction, className, toggleClassName, menuClassName, itemClassName, children, list, caret = false, ...args} = props;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = useCallback(() => setDropdownOpen((prevState) => !prevState), []);
    const rootRef = useRef(null);

    const directionClass = useMemo(() => {
        switch (direction) {
            case "right":
                return "dropend";
            case "left":
                return "dropstart";
            case "up":
                return "dropup";
            default:
                return "dropdown";
        }
    }, [direction]);

    useEffect(() => {
        function onDocumentMouseDown(e) {
            if (!dropdownOpen) return;
            if (!rootRef.current) return;
            if (rootRef.current.contains(e.target)) return;
            setDropdownOpen(false);
        }

        function onDocumentKeyDown(e) {
            if (!dropdownOpen) return;
            if (e.key === "Escape") setDropdownOpen(false);
        }

        document.addEventListener("mousedown", onDocumentMouseDown);
        document.addEventListener("keydown", onDocumentKeyDown);
        return () => {
            document.removeEventListener("mousedown", onDocumentMouseDown);
            document.removeEventListener("keydown", onDocumentKeyDown);
        };
    }, [dropdownOpen]);

    return (
        <>
            <div ref={rootRef} className={[directionClass, className].filter(Boolean).join(" ").trim()} {...args}>
                <span
                    className={[toggleClassName, "dropdown-toggle--l"].filter(Boolean).join(" ").trim()}
                    role="button"
                    tabIndex={0}
                    aria-expanded={dropdownOpen ? "true" : "false"}
                    onClick={toggle}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggle();
                        }
                    }}
                >
                    {toggleHeader}
                    {caret ? <span className="ms-1 dropdown-toggle" /> : null}
                </span>
                <div className={["dropdown-menu", dropdownOpen ? "show" : "", "py-1", menuClassName].filter(Boolean).join(" ").trim()}>
                    {children
                        ? children
                        : (list || []).map((item, index) =>
                            item?.type === "divider" ? (
                                <div key={index} className="dropdown-divider" />
                            ) : (
                                <div
                                    key={index}
                                    className={["dropdown-item", itemClassName, item?.disabled ? "disabled" : ""].filter(Boolean).join(" ").trim()}
                                    onClick={(e) => {
                                        if (item?.disabled) return;
                                        item?.onClick?.(e);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    {item?.name}
                                </div>
                            ),
                        )}
                </div>
            </div>
        </>
    )
}
