import styles from "@/admin/components/ui/Form/Form.module.css"

export default function SgCheckboxGroup(props) {
    const {children, label, className} = props

    return (
        <>
            <div className={[styles['checkbox-group'], className].join(' ').trim()}>
                {label ?
                    <label className={styles['label']}>{label}</label>
                    : ''
                }
                <div className={styles['checkbox-group--checkboxes']}>
                    {children}
                </div>
            </div>
        </>
    )
}