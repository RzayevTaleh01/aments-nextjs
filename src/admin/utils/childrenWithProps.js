import React from "react";
const renderChildren = (children,childrenProps) => {
    return React.Children.map(children, (child) => {
        return React.cloneElement(child, childrenProps);
    });
};
export default renderChildren;