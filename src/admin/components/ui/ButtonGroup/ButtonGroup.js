import styles from '@/admin/components/ui/ButtonGroup/ButtonGroup.module.scss';

export default function SgButtonGroup(props) {
    const { children, gap, className } = props;

    return (
        <>
            <div className={[styles['sg--buttonGroup'], gap ? styles['sg--buttonGroup--gap'] : '', className].join(' ').trim()}>
                {children}
            </div>
        </>
    )
}