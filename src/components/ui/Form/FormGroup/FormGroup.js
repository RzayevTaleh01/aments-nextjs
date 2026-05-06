import styles from "@/components/ui/Form/Form.module.css"

export default function SgFormGroup(props) {
    const {children, className, full, align} = props

    const getAlign = () => {
        let classes = ''

        switch (align) {
            case 'end':
                classes = styles['form-group--align-end']
                break

            default:
                classes = ''
                break
        }

        return classes
    }

    return (
        <>
            <div className={[styles['form-group'], className, getAlign(), full ? styles['form-group--full'] : ''].join(' ').trim()}>
                {children}
            </div>
        </>
    )
}