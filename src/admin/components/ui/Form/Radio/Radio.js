import styles from "@/admin/components/ui/Form/Form.module.css";

export default function SgRadio(props) {
    const {label, name, id, required, readonly, data_key, data_index, disabled, value, checked, loading, isInvalid, onChange = (e) => {e.preventDefault()}} = props

    const handleChange = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        (onChange)?.(e)
    }

    return (
        <>
            <div className={[styles['input-container']].join(' ').trim()}>
                <div className={[styles["input-wrapper"], styles["input-wrapper--checkbox"], isInvalid && styles['input-wrapper--error']].join(' ').trim()}>
                    <input className={styles["radio"]} type="radio" data-key={data_key} data-index={data_index} name={name} id={id} onChange={handleChange} disabled={disabled} value={value} readOnly={readonly} required={required} checked={checked} />
                    <label className={[styles["label"], styles["label--checkbox"]].join(' ').trim()} htmlFor={id}>{label}</label>
                </div>
            </div>
        </>
    )
}