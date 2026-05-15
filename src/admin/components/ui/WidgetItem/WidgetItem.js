import styles from '@/admin/components/ui/WidgetItem/WidgetItem.module.scss';
import { sortableHandle } from "react-sortable-hoc";
import {SgButton} from "@/components/ui/Button";
import { FaBars } from "react-icons/fa";

const DragHandle = sortableHandle(({index, handleRemove}) => (
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

export default function SgWidgetItem(props) {
	const {
		children,
		index,
		handleRemove,
	} = props;
	return (
		<>
			<div className={[styles['sg--widgetItem']].join(' ').trim()}>
				<DragHandle
					handleRemove={handleRemove}
					index={index}
				/>
				<div className={[styles['sg--widgetItem-body']].join(' ').trim()}>
					{children}
				</div>
			</div>
		</>
	)
}
