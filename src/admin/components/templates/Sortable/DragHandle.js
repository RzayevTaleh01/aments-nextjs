import {sortableHandle} from "react-sortable-hoc";
import {SgButton} from "@/admin/components/ui/Button";
import styles from "@/admin/components/templates/Sortable/Sortable.module.scss";
import { FaBars } from "react-icons/fa";

export const DragHandle = sortableHandle(({index, handleRemove}) => (
    <div className={[styles['sg--widgetItem--key']].join(' ').trim()}>
        <FaBars size={20} />
        {index + 1}
        <SgButton
            className='ms-auto'
            size='sm'
            color='error-outline'
            onClick={() => handleRemove(index)}
            withOutBlock={true}
        >
            DELETE
        </SgButton>
    </div>
));
