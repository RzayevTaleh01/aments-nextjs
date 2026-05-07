import styles from '@/admin/components/ui/Page/Page.module.scss'

export default function SgPageBody(props) {
    const {children} = props;

    return (
        <>
            <div className={styles["pages--block-body"]}>
                {children}
            </div>
        </>
    )
}