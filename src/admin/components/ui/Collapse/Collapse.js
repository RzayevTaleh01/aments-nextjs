import {useState} from "react";
import {Collapse} from "reactstrap";
import styles from "@/admin/components/ui/Collapse/Collapse.module.scss";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";

export default function SgCollapse(props) {
    const {toggleHeader, id, className, toggleClassName, menuClassName, children, ...args} = props;

    const [collapseOpen, setCollapseOpen] = useState(false);
    const toggle = () => setCollapseOpen((prevState) => !prevState);

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
