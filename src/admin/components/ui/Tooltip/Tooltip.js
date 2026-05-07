import {Tooltip as ReactTooltip} from "react-tooltip";
import  ChildrenWithProps from "@/admin/utils/childrenWithProps";

export default function SgTooltip(props) {
    const {  children  , id, content } = props;

    return (
        <>
            {ChildrenWithProps(children,{'data-tooltip-id':id})}
            <ReactTooltip
                id={id}
                place="bottom"
                content={content}
            />
        </>
    )
}