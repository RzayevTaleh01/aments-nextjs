import {SgFormGroup, SgInput, SgSwitch} from "@/admin/components/ui/Form";
import {SgButton} from "@/admin/components/ui/Button";
import Answer from "@/admin/components/ui/Answer";
import { sortableHandle } from "react-sortable-hoc";
import FilePreview from "@/admin/components/templates/FilePreview";
import SgTooltip from "../Tooltip";
import styles from '@/admin/components/ui/Question/Question.module.scss'
import { FaBars, FaRegCalendarAlt, FaRegCircle, FaRegClock, FaRegDotCircle, FaTrash } from "react-icons/fa";

const DragHandle = sortableHandle(() => (
    <div className={styles["question_head--center"]}>
        <FaBars />
    </div>
));

export default function Question(props) {
    const {onSortEndAnswer, focusQuestion, data, variant, handleAddFileThisAnswerChange, inputAnswerFileRef, handleAddFileClick, handleRemoveFile, answersLinked, questionTemplate, handleSelectQuestionWithTemplate, linkedAnswer, linkedVariant, linked = false, questionLinked, questions, index, fakeIndex, valueErrors, questionType, handleChange, handleRemoveQuestionRow, handleAddAnswerRow, handleRemoveAnswerRow, onClickOther, selected, current, answerItemAddLinked} = props;

    const renderQuestion = (
        <>
            <div className={styles['question_head']}>
                <div className={styles["question_head--left"]}>
                    <div className={styles['question_head--header']}>
                        {((linked && linkedAnswer.questionIndex !== index) || questionTemplate) ?
                            ((answersLinked || []).includes(data.id) ? <FaRegDotCircle /> : <FaRegCircle />)
                            : ''
                        }
                    </div>
                    <h6 className={styles['question_head--header']}>
                        №{fakeIndex}
                    </h6>
                </div>
                <DragHandle />
                <div className={styles['question_head--right']}></div>
            </div>
            <div className={styles['question_body']}>
                <FilePreview
                    data={data?.token}
                    handleRemoveFile={() => handleRemoveFile({
                        target: {
                            id: 'token',
                            name: 'token',
                            type: 'text',
                            checked: false,
                            value: '',
                            dataset: {
                                key: `questions.${index}`
                            }
                        }
                    })}
                    handleAddFile={() => {
                        handleAddFileClick(`questions.${index}`)
                    }}
                />
                <div className='row'>
                    <div className='col-lg-12 opacity-0 visually-hidden'>
                        <SgFormGroup>
                            <SgInput
                                id={`type--${index}--${data.id}`}
                                name='typeId'
                                label='Sualın tipi:'
                                onChange={handleChange}
                                value={data.typeId || ''}
                                type='select'
                                variant='select'
                                options={questionType}
                                isInvalid={valueErrors?.typeId}
                                data_key={`questions.${index}`}
                                // disabled={true}
                            />
                        </SgFormGroup>
                    </div>
                    <div className='col-lg-12'>
                        <SgFormGroup>
                            <SgInput
                                id={`questionText--${index}--${data.id}`}
                                name='questionText'
                                label='Sualın mətni:'
                                onChange={handleChange}
                                value={data.questionText || ''}
                                variant='editor'
                                type='text'
                                isInvalid={valueErrors?.questionText}
                                data_key={`questions.${index}`}
                            />
                        </SgFormGroup>
                    </div>
                </div>
                <div className='row'>
                    {data?.typeId === 4 &&
                        <div className='col-lg-6'>
                            <SgFormGroup>
                                <SgInput
                                    placeholder='Qısa cavab teksti'
                                    onChange={handleChange}
                                    type='text'
                                    labelHidden={true}
                                    disabled={true}
                                />
                            </SgFormGroup>
                        </div>
                    }
                    {data?.typeId === 5 &&
                        <div className='col-lg-6'>
                            <SgFormGroup>
                                <SgInput
                                    placeholder='Uzun cavab teksti'
                                    onChange={handleChange}
                                    type='text'
                                    variant='textarea'
                                    labelHidden={true}
                                    disabled={true}
                                />
                            </SgFormGroup>
                        </div>
                    }
                    {data?.typeId === 'time' &&
                        <div className='col-lg-6'>
                            <SgFormGroup>
                                <SgInput
                                    placeholder='Saat'
                                    onChange={handleChange}
                                    type='text'
                                    suffix={<FaRegClock />}
                                    labelHidden={true}
                                    disabled={true}
                                />
                            </SgFormGroup>
                        </div>
                    }
                    {data?.typeId === 'date' &&
                        <div className='col-lg-6'>
                            <SgFormGroup>
                                <SgInput
                                    placeholder='Tarix'
                                    onChange={handleChange}
                                    type='text'
                                    suffix={<FaRegCalendarAlt />}
                                    labelHidden={true}
                                    disabled={true}
                                />
                            </SgFormGroup>
                        </div>
                    }
                    {[1, 2, 3].includes(data?.typeId) &&
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <Answer
                                    onSortEndAnswer={onSortEndAnswer}
                                    questionIndex={index}
                                    valueErrors={valueErrors?.answers}
                                    data={data}
                                    type={data?.typeId}
                                    handleChange={handleChange}
                                    handleAddRow={handleAddAnswerRow}
                                    handleRemoveRow={handleRemoveAnswerRow}
                                    onClickOther={onClickOther}
                                    answerItemAddLinked={answerItemAddLinked}
                                    fakeIndex={fakeIndex}
                                    handleAddFileThisAnswerChange={handleAddFileThisAnswerChange}
                                    inputAnswerFileRef={inputAnswerFileRef}
                                    handleAddFileClick={handleAddFileClick}
                                    handleRemoveFile={handleRemoveFile}
                                />
                            </SgFormGroup>
                        </div>
                    }
                </div>

                {data.info ?
                    <div className='row'>
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <SgInput
                                    id={`info_message--${index}--${data.id}`}
                                    name='info_message'
                                    label='Sualın təhsfiri (info ikon):'
                                    onChange={handleChange}
                                    value={data.info_message}
                                    type='textarea'
                                    variant='textarea'
                                    isInvalid={valueErrors?.info_message}
                                    data_key={`questions.${index}`}
                                />
                            </SgFormGroup>
                        </div>
                    </div>
                    : ''
                }
            </div>
            <div className={styles['question_footer']}>
                <div className={styles['question_footer_item']}>
                    <SgSwitch
                        id={`required--${index}--${data.id}`}
                        name='required'
                        label='Vacib:'
                        placeholder=''
                        value=''
                        checked={data.required === 1}
                        isInvalid={valueErrors?.required}
                        onChange={handleChange}
                        data_key={`questions.${index}`}
                        reverse={true}
                    />
                </div>
                <div className={styles['question_footer_item']}>

                    <SgTooltip
                        id={`questionInner--DeleteQuestion`}
                        content={'Silmək'}
                    >
                        <SgButton
                            withOutBlock={true}
                            onlyIcon={true}
                            padding={0}
                            size='extraBig'
                            icon={FaTrash}
                            color='secondary-outline'
                            onClick={(e) => {
                                // if (questions.length > 1) {
                                    handleRemoveQuestionRow(e, `questions`, index)
                                // }
                            }}
                        >
                            Delete
                        </SgButton>
                    </SgTooltip>
                </div>
            </div>
        </>
    )

    const getVariant = () => {
        switch (variant) {
            case ('question'):
                return renderQuestion;

            default:
                return renderQuestion;
        }
    }



    return (
        <div className={[styles['question'], linkedVariant === 'linkedSee' ? (selected ? styles['selected'] : styles['unSelected']) : '', current ? styles['current'] : ''].join(' ').trim()} onClick={() => {
            if (linked && linkedAnswer.questionIndex !== index) {
                questionLinked(data.id)
            }
            if (questionTemplate) {
                handleSelectQuestionWithTemplate(data.id)
            }
            focusQuestion(index)
        }}>
            {getVariant()}
            {((linkedVariant && !selected) || questionTemplate) ? <div className={styles['question--overlay']}></div> : ''}
        </div>
    )
}
