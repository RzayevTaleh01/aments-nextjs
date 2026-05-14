import {useEffect, useState} from "react";
import {Collapse} from "reactstrap";
import styles from "@/admin/components/ui/Collapse/Collapse.module.scss";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";

export default function SgCollapse(props) {
    const {toggleHeader, id, className, toggleClassName, menuClassName, children, defaultOpen = false, openOn = false, ...args} = props;

    const [collapseOpen, setCollapseOpen] = useState(Boolean(defaultOpen || openOn));
    const toggle = () => setCollapseOpen((prevState) => !prevState);

    useEffect(() => {
        if (openOn) setCollapseOpen(true);
    }, [openOn]);

    return (
        <>
            <div className={[styles['sg--collapse'], className].join(' ').trim()}>
                <div
                    className={[styles['sg--collapse-toggle'], toggleClassName].join(' ').trim()}
                    id={id}
                    onClick={toggle}
                >
                    {toggleHeader}
                    <Icon name={collapseOpen ? "FaChevronUp" : "FaChevronDown"} size={14} />
                </div>
                <Collapse
                    className={[styles['sg--collapse-body'], menuClassName].join(' ').trim()}
                    toggler={id}
                    isOpen={collapseOpen}
                    {...args}
                >
                    {children}
                </Collapse>
            </div>
        </>
    )
}
