import styles from "@/admin/components/ui/Form/Form.module.css"

export default function SgFormGroup(props) {
    const {children, className, full, align} = props

    const getAlign = () => {
        switch (align) {
            case 'end':
                return styles['form-group--align-end']

            default:
                return ''
        }
    }

    return (
        <>
            <div className={[styles['form-group'], className, getAlign(), full ? styles['form-group--full'] : ''].join(' ').trim()}>
                {children}
            </div>
        </>
    )
}
