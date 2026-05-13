import styles from '@/admin/components/ui/Form/Form.module.css';
import React, {useState} from "react";
import FilePreview from "@/admin/components/templates/FilePreview";

export default function SgFile(props) {
    const {label, name, externalRef, id, required, placeholder, readonly, accepts, disabled, value, loading, isInvalid, onChange, onRemove, color, data_key, multiple, fileManager = undefined} = props

    const [fileManagerModal, setFileManagerModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const inputRef = React.createRef(externalRef ? externalRef : null);

    function toggleFileManagerModal() {
        setFileManagerModal(!fileManagerModal)
    }

    const handleChange = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        e.editIndex = editIndex;
        (onChange)?.(e)
        
        setEditIndex(null);
        inputRef.current.value = "";
    }

    const handleRemove = (eOrIndex) => {
        if (disabled || readonly || loading) {
            if (eOrIndex?.preventDefault) eOrIndex.preventDefault()
            return
        }
        inputRef.current.value = "";
        if (typeof eOrIndex === 'number') {
            (onRemove)?.({
                target: {
                    id: id,
                    name: name,
                    value: value,
                    dataset: {
                        key: data_key
                    }
                },
                removeIndex: eOrIndex
            })
        }
        else {
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
    }

    const handleAdd = (e) => {
        setEditIndex(null);
        inputRef.current.click();
    }

    const handleEdit = (index) => {
        setEditIndex(index);
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
                data={Array.isArray(value) ? value : (value ? [value] : [])}
                handleRemoveFile={handleRemove}
                handleAddFile={multiple ? handleAdd : undefined}
                handleEditFile={handleEdit}
                // preview={true}
            />
        </div>
    )
}
