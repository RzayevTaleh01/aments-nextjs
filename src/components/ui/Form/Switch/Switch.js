import styles from "@/components/ui/Form/Form.module.css"

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
        let classes = ''

        switch (color) {
            case 'minor':
                classes = styles['label--switch--minor']
                break
            case 'major':
                classes = styles['label--switch--major']
                break

            default:
                classes = ''
                break
        }

        return classes
    }

    const getSize = () => {
        let classes = ''

        switch (size) {
            case 'sm':
                classes = styles['label--switch--sm']
                break

            case 'md':
                classes = styles['label--switch--md']
                break

            case 'lg':
                classes = styles['label--switch--lg']
                break

            default:
                classes = ''
                break
        }

        return classes
    }

    return (
        <>
            <div className={[styles['input-container'], getColor()].join(' ').trim()}>
                <div className={[styles["input-wrapper"], styles["input-wrapper--checkbox"], isInvalid && styles['input-wrapper--error'], reverse && styles['input-wrapper--reverse']].join(' ').trim()}>
                    <input data-key={data_key} className={styles["checkbox"]} type="checkbox" name={name} id={id} onChange={handleChange} disabled={disabled} value={value} readOnly={readonly} required={required} checked={checked} />
                    <label className={[styles["label"], styles["label--switch"], getColor(), getSize()].join(' ').trim()} htmlFor={id}>{label}</label>
                </div>
            </div>
        </>
    )
}