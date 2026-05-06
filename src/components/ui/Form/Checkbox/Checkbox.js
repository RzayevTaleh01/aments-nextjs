import styles from "@/components/ui/Form/Form.module.css";

export default function SgCheckbox(props) {
    const {label, name, id, data_key, variant, required, size, readonly, disabled, value, checked, loading, isInvalid, onChange = () => {}} = props

    const handleChange = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        (onChange)?.(e)
    }

    const getSize = () => {
        let classes = ''

        switch (size) {
            case 'xs':
                classes = styles['label--checkbox--xs']
                break

            case 'sm':
                classes = styles['label--checkbox--sm']
                break

            case 'md':
                classes = styles['label--checkbox--md']
                break

            case 'lg':
                classes = styles['label--checkbox--lg']
                break

            default:
                classes = ''
                break
        }

        return classes
    }

    return (
        <>
            <div className={[styles['input-container']].join(' ').trim()}>
                <div className={[styles["input-wrapper"], styles["input-wrapper--checkbox"], isInvalid && styles['input-wrapper--error']].join(' ').trim()}>
                    <input data-key={data_key} data-variant={variant} className={styles["checkbox"]} type="checkbox" name={name} id={id} onChange={handleChange} disabled={disabled} value={value} readOnly={readonly} required={required} checked={checked} />
                    <label className={[styles["label"], styles["label--checkbox"], getSize()].join(' ').trim()} htmlFor={id}>{label}</label>
                </div>
            </div>
        </>
    )
}