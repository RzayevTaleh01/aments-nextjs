import styles from '@/admin/components/ui/WidgetsFilter/WidgetsFilter.module.scss';
import Image from "next/image";

export default function SgWidgetsFilter(props) {
	const { data = {}, handleAddWidget } = props;
	const { list = [] } = data;

	return (
		<>
			<div className={[styles['sg--widgetsFilter']].join(' ').trim()}>
				<div className={[styles['sg--widgetsFilter-head']].join(' ').trim()}>
					<h5 className={[styles['sg--widgetsFilter-head--header']].join(' ').trim()}>
						Widgets
					</h5>
				</div>

				<div className={[styles['sg--widgetsFilter-body']].join(' ').trim()}>
					{(list || []).map((item, index) => {
						const { id, image, name, description } = item;

						return (
							<div key={index} className={[styles['sg--widgetsFilter-body-item']].join(' ').trim()} onClick={() => handleAddWidget(id)}>
								<div className={[styles['sg--widgetsFilter-body-item-image']].join(' ').trim()}>
									<Image width='1000' height='1000'
										className={[styles['sg--widgetsFilter-body-item-image--img']].join(' ').trim()}
										src={encodeURI(image)}
										alt={name || description || 'Alternative'}
									/>
								</div>
								<div className={[styles['sg--widgetsFilter-body-item-body']].join(' ').trim()}>
									<h6 className={[styles['sg--widgetsFilter-body-item-body--header']].join(' ').trim()}>
										{name}
									</h6>
									<p className={[styles['sg--widgetsFilter-body-item-body--description']].join(' ').trim()}>
										{description}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}