import Link from "next/link";
import styles from "@/admin/components/ui/DashboardItem/DashboardItem.module.scss";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgButton} from "@/admin/components/ui/Button";

export default function SgDashboardItem(props) {
	const {header, description, path, list, length} = props;
	return (
		<div className={[styles["sg--dashboardItem"]].join(' ').trim()}>
			<div className={[styles["sg--dashboardItem-head"]].join(' ').trim()}>
				{path ?
					<Link href={path} className={[styles["sg--dashboardItem-head--header"]].join(' ').trim()}>
						{header} <b><em>{length ? `- ${length}` : ''}</em></b>
					</Link>
					:
					<div className={[styles["sg--dashboardItem-head--header"]].join(' ').trim()}>
						{header} <b><em>{length ? `- ${length}` : ''}</em></b>
					</div>
				}
				{description ?
					<p className={[styles["sg--dashboardItem-head--description"]].join(' ').trim()}>
						{description}
					</p>
					: null
				}
			</div>
			{(list || []).length > 0 ?
				<div className={[styles["sg--dashboardItem-body"]].join(' ').trim()}>
					<SgButtonGroup gap={true}>
						{(list || []).map((item, index) => {
							return (
								<SgButton
									key={index}
									color=''
									size='sm'
									type='link'
									to={item?.path}
									onClick={(e) => {item?.onClick?.(e)}}
								>
									{item?.name}
								</SgButton>
							)
						})}
					</SgButtonGroup>
				</div>
				: null
			}
		</div>
	)
}
