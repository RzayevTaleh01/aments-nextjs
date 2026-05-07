import styles from '@/admin/components/ui/Page/Page.module.scss'

export default function SgPageFooter(props) {
    const {children} = props;

    return (
        <>
            <div className={styles["pages--block-footer"]}>
                {children}
            </div>
        </>
    )
}