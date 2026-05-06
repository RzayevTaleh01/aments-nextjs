import styles from '@/admin/components/ui/Form/Form.module.scss';
import SgTemplateFileManagerModal from "@/admin/components/templates/FileManagerModal";
import {SgRatio} from "@/admin/components/ui/Ratio";
import React, {useState} from "react";
import {SgButton} from "@/admin/components/ui/Button";
import FilePreview from "@/admin/components/templates/FilePreview";
import Image from "next/image";

export default function SgFile(props) {
    const {label, name, externalRef, id, required, placeholder, readonly, accepts, disabled, value, loading, isInvalid, onChange, onRemove, color, data_key, multiple, fileManager = undefined} = props

    const [fileManagerModal, setFileManagerModal] = useState(false);

    function toggleFileManagerModal() {
        setFileManagerModal(!fileManagerModal)
    }

    const handleChange = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        (onChange)?.(e)
    }

    const handleRemove = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
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

    const getColor = () => {
        switch (color) {
            case 'light':
                return 'input--light'

            default:
                return ''
        }
    }

    return (
        fileManager ?
            <SgTemplateFileManagerModal
                id={id}
                name={name}
                type={fileManager?.type}
                multiple={fileManager?.multiple}
                toggleFileManagerModal={toggleFileManagerModal}
                fileManagerModal={fileManagerModal}
                data={fileManager?.data}
                setData={fileManager?.setData}
                errors={fileManager?.errors}
                setErrors={fileManager?.setErrors}
                data_key={data_key}
            >
                <div className={[styles['input-container'], 'mb-1', getColor()].join(' ').trim()}>
                    <label className={styles["label"]} htmlFor={fileManager ? '' : id}>{label}</label>
                    <div className={[styles["input-wrapper"], styles["input-wrapper--file"], isInvalid && styles['input-wrapper--error'], fileManager && styles['input-wrapper--fakeFiles']].join(' ').trim()}>
                        <input className={styles["file"]} type="file" name={name} ref={externalRef} data-key={data_key}
                               id={id} onChange={handleChange} disabled={disabled} multiple={multiple}
                               readOnly={readonly} required={required}/>
                        <label className={[styles["label"], styles["label--file"]].join(' ').trim()} htmlFor={fileManager ? '' : id} onClick={fileManager ? toggleFileManagerModal : undefined}>
                            Fayl seçin
                        </label>
                    </div>
                    <div className={['input--fileList'].join(' ').trim()}>
                        <div className='row'>
                            {value ?
                                (value.split(',') && Array.isArray(value.split(','))) ?
                                        (value.split(',') || []).map((file, index) => (
                                            <div key={index} className='col-lg-2'>
                                                <div className={['input--fileList-item'].join(' ').trim()}>
                                                    <SgRatio>
                                                        {['mp4'].includes(file.split('.')[file.split('.').length - 1]) ?
                                                            <>
                                                                <video className='fm_item_image--img'>
                                                                    <source src={file || ''} type="video/mp4"/>
                                                                </video>
                                                            </>
                                                            :
                                                            (
                                                                ['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(file.split('.')[file.split('.').length - 1]) ?
                                                                    <Image height={1000} width={1000} src={file ? file : ''} className='fm_item_image--img'
                                                                         alt={file || ''}/>
                                                                    :
                                                                    <span>{file}</span>
                                                            )
                                                        }
                                                    </SgRatio>
                                                    <SgButton
                                                        color='error-outline'
                                                        size='sm'
                                                    >
                                                        Sil
                                                    </SgButton>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <div className='col-lg-3'>
                                            <div className={['input--fileList-item'].join(' ').trim()}>
                                                <SgRatio>
                                                    {['mp4'].includes(value.split('.')[value.split('.').length - 1]) ?
                                                        <>
                                                            <video className='fm_item_image--img'>
                                                                <source src={value} type="video/mp4"/>
                                                            </video>
                                                        </>
                                                        :
                                                        (
                                                            ['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(value.split('.')[value.split('.').length - 1]) ?
                                                                <Image width={1000} height={1000} src={value} className='fm_item_image--img'
                                                                     alt={value}/>
                                                                :
                                                                <span>{value}</span>
                                                        )
                                                    }
                                                </SgRatio>
                                                <SgButton
                                                    color='error-outline'
                                                    size='sm'
                                                >
                                                    Sil
                                                </SgButton>
                                            </div>
                                        </div>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </SgTemplateFileManagerModal>
            :
            <div className={[styles['input-container'], 'mb-1', getColor()].join(' ').trim()}
                 onClick={fileManager ? onChange : undefined}>
                <label className={styles["label"]} htmlFor={id}>{label}</label>
                <div
                    className={[styles["input-wrapper"], styles["input-wrapper--file"], isInvalid && styles['input-wrapper--error'], fileManager && styles['input-wrapper--fakeFile']].join(' ').trim()}>
                    <input accept={accepts} className={styles["file"]} type="file" name={name} ref={externalRef} data-key={data_key}
                           id={id} onChange={handleChange} disabled={disabled} multiple={multiple}
                           readOnly={readonly} required={required}/>
                    <label className={[styles["label"], styles["label--file"]].join(' ').trim()} htmlFor={id}>
                        {placeholder ? placeholder : 'Fayl seçin'}
                    </label>
                </div>
                <FilePreview
                    data={value}
                    handleRemoveFile={handleRemove}
                    // preview={true}
                />
            </div>
    )
}