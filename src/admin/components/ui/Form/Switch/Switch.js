import styles from "@/admin/components/ui/Form/Form.module.css"

export default function SgSwitch(props) {
    const {label, name, data_key, id, required, readonly, disabled, value, color, size, checked, loading, isInvalid, reverse, onChange} = props

    const handleChange = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        (onChange)?.(e)
    }

    const getColor = () => {
        switch (color) {
            case 'minor':
                return 'label--switch--minor'

            default:
                return ''
        }
    }

    const getSize = () => {
        switch (size) {
            case 'sm':
                return styles['label--switch--sm']

            case 'md':
                return styles['label--switch--md']

            case 'lg':
                return styles['label--switch--lg']

            default:
                return ''
        }
    }

    return (
        <>
            <div className={[styles['input-container'], getColor()].join(' ').trim()}>
                <div className={[styles["input-wrapper"], styles["input-wrapper--checkbox"], isInvalid && styles['input-wrapper--error'], reverse && styles['input-wrapper--reverse']].join(' ').trim()}>
                    <input data-key={data_key} className={styles["checkbox"]} type="checkbox" name={name} id={id} onChange={handleChange} disabled={disabled} value={value} readOnly={readonly} required={required} checked={checked} />
                    <label className={[styles["label"], styles["label--switch"], getSize()].join(' ').trim()} htmlFor={id}>{label}</label>
                </div>
            </div>
        </>
    )
}