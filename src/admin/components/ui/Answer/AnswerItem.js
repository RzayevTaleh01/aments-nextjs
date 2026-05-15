import {SgCheckbox, SgInput} from "@/admin/components/ui/Form";
import {SgButton} from "@/admin/components/ui/Button";
import FilePreview from "@/admin/components/templates/FilePreview";
import {
    sortableHandle
} from "react-sortable-hoc";
import styles from "@/admin/components/ui/Answer/Answer.module.scss"
import { FaGripVertical, FaRegCheckSquare, FaRegDotCircle, FaTimes, FaUpload } from "react-icons/fa";

const DragHandle = sortableHandle(() => (
    <div className='answer-item-head--dragging'>
        <FaGripVertical />
    </div>
));

export default function AnswerItem(props) {
    const {data, index, dataLength, valueErrors, handleRemoveFile, inputAnswerFileRef, handleAddFileClick, questionIndex, type, readOnly, handleChange, handleRemoveRow, variant, onClick, onClickOther} = props;
    return (
        <div className={styles['answer-item']}>
            <div className={styles['answer-item-head']}>
                <SgCheckbox
                    name='isCorrect'
                    id={`isCorrect--${questionIndex}--variants--${index}`}
                    data_key={`questions.${questionIndex}.variants.${index}`}
                    onChange={handleChange}
                    label='Correct'
                    checked={data?.isCorrect}
                    value=''
                    disabled={variant?.new}
                    // value=''
                />
            </div>
            <div className={styles['answer-item-body']}>
                {variant?.new ?
                    <SgInput
                        id={`text--${index}`}
                        name={`text`}
                        onClick={onClick}
                        label={''}
                        labelHidden={true}
                        placeholder={`Variant ${index + 1} əlavə et`}
                        disabled={readOnly || data?.other}
                        onChange={handleChange}
                        data_key={`questions.${questionIndex}.variants.${index}`}
                        wrapperClassName={styles['input-wrapper--answer']}
                        isInvalid={valueErrors?.text}
                        value={data.text || ''}
                        prefix={<div className={styles['answer-item-head']}>
                            <DragHandle />
                            {type === 3 ?
                                <h6 className={styles['answer-item-head--header']}>{index + 1}.</h6>
                                : ''
                            }
                            {type === 2 ?
                                <h6 className={styles['answer-item-head--icon']}>
                                    <FaRegCheckSquare />
                                </h6>
                                : ''
                            }
                            {type === 1 ?
                                <h6 className={styles['answer-item-head--icon']}>
                                    <FaRegDotCircle />
                                </h6>
                                : ''
                            }
                        </div>}
                    />
                    :
                    <>
                        <SgInput
                            id={`text--${index}`}
                            name={`text`}
                            label={''}
                            labelHidden={true}
                            variant='editor'
                            placeholder={`Variant ${index + 1}`}
                            disabled={readOnly || data?.other}
                            onChange={handleChange}
                            data_key={`questions.${questionIndex}.variants.${index}`}
                            wrapperClassName={'input-wrapper--answer'}
                            isInvalid={valueErrors?.text}
                            value={data.text || ''}
                            prefix={<div className={styles['answer-item-head']}>
                                <DragHandle />
                                {type === 3 ?
                                    <h6 className={styles['answer-item-head--header']}>{index + 1}.</h6>
                                    : ''
                                }
                                {type === 2 ?
                                    <h6 className={styles['answer-item-head--icon']}>
                                        <FaRegCheckSquare />
                                    </h6>
                                    : ''
                                }
                                {type === 1 ?
                                    <h6 className={styles['answer-item-head--icon']}>
                                        <FaRegDotCircle />
                                    </h6>
                                    : ''
                                }
                            </div>}
                        />
                        <FilePreview
                            data={data?.token}
                            handleRemoveFile={() => {
                                handleRemoveFile({
                                    target: {
                                        id: 'token',
                                        name: 'token',
                                        type: 'text',
                                        checked: false,
                                        value: '',
                                        dataset: {
                                            key: `questions.${questionIndex}.variants.${index}`
                                        }
                                    }
                                });
                                inputAnswerFileRef.current.value = "";
                            }}
                            handleAddFile={() => {
                                handleAddFileClick(`questions.${questionIndex}.variants.${index}`)
                            }}
                            preview={true}
                        />
                    </>
                }
            </div>
            {!variant?.new ?
                <div className={styles['answer-item-footer']}>
                    <div className={styles['answer-item-footer-item']}>
                        <SgButton
                            withOutBlock={true}
                            onlyIcon={true}
                            padding={0}
                            size='xs'
                            icon={FaTimes}
                            color='secondary-outline'
                            onClick={(e) => {
                                // if (dataLength > 1) {
                                    handleRemoveRow(`questions.${questionIndex}.variants`, index)
                                // }
                                if (data?.other) {
                                    handleRemoveRow(`questions.${questionIndex}.variants`, index)
                                    onClickOther(e, questionIndex, data?.other)
                                }
                            }}
                        >
                            Delete
                        </SgButton>
                    </div>
                    <div className={styles['answer-item-footer-item']}>
                        <SgButton
                            withOutBlock={true}
                            onlyIcon={true}
                            padding={0}
                            size='xs'
                            icon={FaUpload}
                            color='secondary-outline'
                            onClick={() => {
                                handleAddFileClick(`questions.${questionIndex}.variants.${index}`)
                            }}
                        >
                            File
                        </SgButton>
                    </div>
                </div>
                : ''
            }
        </div>
    )
}
