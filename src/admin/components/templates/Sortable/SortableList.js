import { SortableContainer } from 'react-sortable-hoc';

const SortableList = (props) => {
    const {
        children
    } = props

    return (
        <div>
            {children}
        </div>
    );
}

export default SortableContainer(SortableList);