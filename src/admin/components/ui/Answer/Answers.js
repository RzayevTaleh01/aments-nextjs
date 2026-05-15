import {AnswerItem} from "@/admin/components/ui/Answer";
import {
    sortableContainer,
    sortableElement,
} from "react-sortable-hoc";
import styles from "@/admin/components/ui/Answer/Answer.module.scss"

const SortableContainer = sortableContainer(({ children }) => {
    return <div className={styles['answer']}>
        {children}
    </div>;
});
const SortableItem = sortableElement((props) => {
    const {type, answer, dataLength, value, index, fakeIndex, valueErrors, handleRemoveFile, handleAddFileThisAnswerChange, inputAnswerFileRef, handleAddFileClick, questionIndex, handleChange, handleRemoveRow, onClickOther, answerItemAddLinked} = props;
    return (
        <AnswerItem
            key={index}
            fakeIndex={fakeIndex}
            data={answer}
            index={value}
            valueErrors={valueErrors}
            questionIndex={questionIndex}
            type={type}
            handleChange={handleChange}
            handleRemoveRow={handleRemoveRow}
            onClickOther={onClickOther}
            dataLength={dataLength}
            answerItemAddLinked={answerItemAddLinked}
            handleAddFileThisAnswerChange={handleAddFileThisAnswerChange}
            inputAnswerFileRef={inputAnswerFileRef}
            handleAddFileClick={handleAddFileClick}
            handleRemoveFile={handleRemoveFile}
        />
    )
});


export default function Answers(props) {
    const {onSortEndAnswer, data, type, fakeIndex, valueErrors, handleRemoveFile, handleAddFileThisAnswerChange, inputAnswerFileRef, handleAddFileClick, questionIndex, handleChange, handleAddRow, handleRemoveRow, onClickOther, answerItemAddLinked} = props;

    return (
        <>
            <SortableContainer
                onSortEnd={(sortingData) => onSortEndAnswer({...sortingData, questionIndex})}
                pressDelay={200}
                lockAxis={'y'}
                helperClass={'dragging'}
                useDragHandle={true}
                disableAutoscroll={false}
            >
                {(data?.variants).sort((a, b) => (a.other ? 1 : 0) - (b.other ? 1 : 0)).map((answer, index) => {
                    return (
                        <SortableItem
                            key={`item-${index}`}
                            value={index}
                            answer={answer}

                            // key={index}
                            fakeIndex={fakeIndex}
                            data={answer}
                            index={index}
                            valueErrors={valueErrors?.[index]}
                            questionIndex={questionIndex}
                            type={type}
                            handleChange={handleChange}
                            handleRemoveRow={handleRemoveRow}
                            onClickOther={onClickOther}
                            dataLength={data?.variants?.filter(el => !el.other).length}
                            answerItemAddLinked={answerItemAddLinked}
                            handleAddFileThisAnswerChange={handleAddFileThisAnswerChange}
                            inputAnswerFileRef={inputAnswerFileRef}
                            handleAddFileClick={handleAddFileClick}
                            handleRemoveFile={handleRemoveFile}
                        />
                    )
                })}
                <AnswerItem
                    key={data?.variants?.length}
                    data={{}}
                    index={data?.variants?.length}
                    type={type}
                    variant={{
                        new: true,
                        other: !data?.other
                    }}
                    handleAddFileThisAnswerChange={handleAddFileThisAnswerChange}
                    inputAnswerFileRef={inputAnswerFileRef}
                    handleAddFileClick={handleAddFileClick}
                    answerItemAddLinked={answerItemAddLinked}
                    handleRemoveFile={handleRemoveFile}
                    onClick={() => handleAddRow(`questions.${questionIndex}.variants`, { isCorrect: false, token: ''}, data?.variants.length)}
                    onClickOther={(e) => {
                        onClickOther(e, questionIndex, data?.other)
                        handleAddRow(`questions.${questionIndex}.variants`, {answer: 'Digər', other: 1}, data?.variants.length)
                    }}
                />
            </SortableContainer>
        </>
    )
}