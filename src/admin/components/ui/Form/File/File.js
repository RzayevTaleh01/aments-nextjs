import styles from '@/components/ui/Form/Form.module.scss';
import React, {useState} from "react";
import FilePreview from "@/admin/components/templates/FilePreview";

export default function SgFile(props) {
    const {label, name, externalRef, id, required, placeholder, readonly, accepts, disabled, value, loading, isInvalid, onChange, onRemove, color, data_key, multiple, fileManager = undefined} = props

    const [fileManagerModal, setFileManagerModal] = useState(false);
    const inputRef = React.createRef(externalRef ? externalRef : null);

    function toggleFileManagerModal() {
        setFileManagerModal(!fileManagerModal)
    }

    const handleChange = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        (onChange)?.(e)

        inputRef.current.value = "";
    }

    const handleRemove = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        inputRef.current.value = "";
        (onRemove)?.({
            target: {
                id: id,
                name: name,
                value: "",
                dataset: {
                    key: data_key
                }
            }
        })
    }

    const handleAdd = (e) => {
        inputRef.current.click();
    }

    const getColor = () => {
        switch (color) {
            case 'light':
                return 'input--light'

            default:
                return ''
        }
    }

    return (
        <div className={[styles['input-container'], 'mb-1', getColor()].join(' ').trim()}
             onClick={fileManager ? onChange : undefined}>
            <label className={styles["label"]} htmlFor={id}>{label}</label>
            <div
                className={[styles["input-wrapper"], styles["input-wrapper--file"], isInvalid && styles['input-wrapper--error'], fileManager && styles['input-wrapper--fakeFile']].join(' ').trim()}>
                <input accept={accepts} className={styles["file"]} type="file" name={name} ref={inputRef} data-key={data_key}
                       id={id} onChange={handleChange} disabled={disabled} multiple={multiple}
                       readOnly={readonly} required={required}/>
                <label className={[styles["label"], styles["label--file"]].join(' ').trim()} htmlFor={id}>
                    {placeholder ? placeholder : 'Fayl seçin'}
                </label>
            </div>
            <FilePreview
                data={value}
                handleRemoveFile={handleRemove}
                handleAddFile={handleAdd}
                // preview={true}
            />
        </div>
    )
}