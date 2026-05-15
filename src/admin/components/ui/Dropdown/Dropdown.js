import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {useState} from "react";

export default function SgDropdown(props) {
    const {toggleHeader, direction, className, toggleClassName, menuClassName, itemClassName, children, list, caret = false, ...args} = props;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <>
            <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} className={className}>
                {caret ?
                    <DropdownToggle
                        className={[toggleClassName, 'dropdown-toggle--l'].join(' ').trim()}
                        data-toggle="dropdown"
                        tag="span"
                        caret
                    >
                        {toggleHeader}
                    </DropdownToggle>
                    :
                    <DropdownToggle
                        className={[toggleClassName, 'dropdown-toggle--l'].join(' ').trim()}
                        data-toggle="dropdown"
                        tag="span"
                    >
                        {toggleHeader}
                    </DropdownToggle>
                }
                <DropdownMenu
                    updateOnSelect={false}
                    {...args}
                    className={[menuClassName, 'py-1'].join(' ').trim()}
                >
                    {children ?
                        children
                        :
                        <>
                            {(list || []).map((item, index) =>
                                item.type === 'divider' ?
                                    <DropdownItem onClick={(e) => item?.onClick?.(e)} className={itemClassName} key={index} divider />
                                    :
                                    <DropdownItem onClick={(e) => item?.onClick?.(e)} className={itemClassName} key={index} disabled={item.disabled}>{item.name}</DropdownItem>
                            )}
                        </>
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        </>
    )
}