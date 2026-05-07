import {sortableHandle} from "react-sortable-hoc";
import SgIcon from "@/admin/components/ui/Icon";
import {SgButton} from "@/admin/components/ui/Button";
import styles from "@/admin/components/templates/Sortable/Sortable.module.scss";

export const DragHandle = sortableHandle(({index, handleRemove}) => (
    <div className={[styles['sg--widgetItem--key']].join(' ').trim()}>
        <SgIcon icon='menu' size={20} />
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