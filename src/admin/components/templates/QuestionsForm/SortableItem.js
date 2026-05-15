import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import Question from "@/admin/components/ui/Question";

const SortableItem = (props) => {
    const {
        value,
        items,
        question,
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
        <Question
            onSortEndAnswer={onSortEndAnswer}
            focusQuestion={focusQuestion}
            current={items.find(el => el.current) ? question.current : (value === 0 && true)}
            data={question}
            questions={items}
            key={value}
            index={value}
            fakeIndex={items.indexOf(question) + 1}
            variant={question.variant}
            valueErrors={valueErrors?.questions?.[value]}
            questionType={questionType}
            handleChange={handleChange}
            handleRemoveQuestionRow={handleRemoveQuestionRow}
            handleAddAnswerRow={handleAddAnswerRow}
            handleRemoveAnswerRow={handleRemoveAnswerRow}
            onClickOther={onClickOther}
            answerItemAddLinked={answerItemAddLinked}
            linked={(linkedAnswer.questionIndex || linkedAnswer.questionIndex === 0) && linkedAnswer.variant === 'linked'}
            selected={(linkedAnswer.questionIndex || linkedAnswer.questionIndex === 0) && linkedAnswer.variant === 'linkedSee' && linkedQuestionItems.includes(question.id)}
            questionLinked={questionLinked}
            linkedVariant={linkedAnswer.variant}
            answersLinked={linkedQuestionItems}
            linkedAnswer={linkedAnswer}
            questionTemplate={createQuestionTemplate}
            handleSelectQuestionWithTemplate={handleSelectQuestionWithTemplate}
            handleAddFileClick={handleAddFileClick}
            handleRemoveFile={handleRemoveFile}
            handleAddFileThisAnswerChange={handleAddFileThisAnswerChange}
            inputAnswerFileRef={inputAnswerFileRef}
        />
        // <li>{props.value}</li>
    )
}

export default SortableElement(SortableItem);