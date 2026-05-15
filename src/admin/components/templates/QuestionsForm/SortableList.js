import React from 'react';
import SortableItem from './SortableItem';
import { SortableContainer } from 'react-sortable-hoc';
import styles from '@/admin/components/ui/Question/Question.module.scss'

const SortableList = (props) => {
    const {
        focusQuestion,
        valueErrors,
        questionType,
        handleChange,
        handleRemoveQuestionRow,
        handleAddAnswerRow,
        handleRemoveAnswerRow,
        onClickOther,
        answerItemAddLinked,
        linkedAnswer,
        linkedQuestionItems,
        questionLinked,
        createQuestionTemplate,
        handleSelectQuestionWithTemplate,
        handleAddFileClick,
        handleRemoveFile,
        handleAddFileThisAnswerChange,
        inputAnswerFileRef,
        onSortEndAnswer
    } = props

    return (
        <div className={styles['questions']}>
            {props.items.map((value, index) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    value={index}
                    onSortEndAnswer={onSortEndAnswer}
                    items={props.items}
                    question={value}
                    focusQuestion={focusQuestion}
                    valueErrors={valueErrors}
                    questionType={questionType}
                    handleChange={handleChange}
                    handleRemoveQuestionRow={handleRemoveQuestionRow}
                    handleAddAnswerRow={handleAddAnswerRow}
                    handleRemoveAnswerRow={handleRemoveAnswerRow}
                    onClickOther={onClickOther}
                    answerItemAddLinked={answerItemAddLinked}
                    linkedAnswer={linkedAnswer}
                    linkedQuestionItems={linkedQuestionItems}
                    questionLinked={questionLinked}
                    createQuestionTemplate={createQuestionTemplate}
                    handleSelectQuestionWithTemplate={handleSelectQuestionWithTemplate}
                    handleAddFileClick={handleAddFileClick}
                    handleRemoveFile={handleRemoveFile}
                    handleAddFileThisAnswerChange={handleAddFileThisAnswerChange}
                    inputAnswerFileRef={inputAnswerFileRef}
                    qindex={index}
                />
            ))}
        </div>
    );
}

export default SortableContainer(SortableList);