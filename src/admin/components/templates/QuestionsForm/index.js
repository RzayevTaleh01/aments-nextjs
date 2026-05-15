import {useEffect, useRef, useState} from "react";
import {Section} from "@/components/ui/Section";
import {changeData} from "@/admin/utils/changeData";
import SgIcon from "@/admin/components/ui/Icon";
import {addRow} from "@/admin/utils/addRow";
import {removeRow} from "@/admin/utils/removeRow";
import {findMaxID} from "@/admin/utils/findMaxId";
import QuestionAssistant from "@/admin/components/ui/QuestionAssistant";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgButton} from "@/admin/components/ui/Button";
import ApiService from "@/admin/services/ApiService";
import validationConstraints from "./constants";
import {globalValidate} from "@/admin/utils/validate";
import {callBackChangeDataFile, changeDataFile} from "@/admin/utils/changeDataFile";
import {arrayMoveImmutable} from "array-move";
import SortableList from "./SortableList";



export default function QuestionsForm(props) {
    const { router, submitUrl, getUrl, redirectUrl } = props;
    const {query: {topic_id, subject_id}} = router;
    const inputRef = useRef(null);
    const inputFileRef = useRef(null);
    const inputAnswerFileRef = useRef(null);

    const [formData, setFormData] = useState({
        questions: [
            {
                id: 1,
                typeId: 1,
                textCorrect: '',
                token: '',
                variants: [
                    {
                        id: 1,
                        isCorrect: false,
                        token: '',
                    }
                ]
            }
        ]
    })
    const [valueErrors, setValueErrors] = useState({})

    const [selectedQuestion, setSelectedQuestion] = useState(0)
    const [selectedItemKey, setSelectedItemKey] = useState('')

    const [linkedQuestionItems, setLinkedQuestionItems] = useState([])
    const [linkedAnswer, setLinkedAnswer] = useState({})

    const [questionType, setQuestionType] = useState([
        {
            name:
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <SgIcon icon='short_text' />
                    <span>Qısa tekst</span>
                </div>,
            value: 4,
            id: 4,
        },
        {
            name:
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <SgIcon icon='long_text' />
                    <span>Uzun tekst</span>
                </div>,
            value: 5,
            id: 5,
        },
        {
            name:
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <SgIcon icon='radio' />
                    <span>Bullet point</span>
                </div>,
            value: 1,
            id: 1,
        },
        {
            name:
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <SgIcon icon='checkbox' />
                    <span>Checkbox</span>
                </div>,
            value: 2,
            id: 2,
        },
        {
            name:
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <SgIcon icon='chevron_down_circle_outline' />
                    <span>Dropdown</span>
                </div>,
            value: 3,
            id: 3,
        },
        {
            name:
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <SgIcon icon='date' />
                    <span>Tarix</span>
                </div>,
            value: 'date',
            id: 'date',
        },
        {
            name:
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <SgIcon icon='time' />
                    <span>Saat</span>
                </div>,
            value: 'time',
            id: 'time',
        },
        {
            name:
                <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    <SgIcon icon='upload' />
                    <span>File yükləmək</span>
                </div>,
            value: 'file',
            id: 'file',
        }
    ])

    const [createQuestionTemplate, setCreateQuestionTemplate] = useState(false)
    const [createQuestionTemplateModal, setCreateQuestionTemplateModal] = useState(false)

    const [selectedQuestionTemplateModal, setSelectedQuestionTemplateModal] = useState(false)
    const [questionTemplates, setQuestionTemplates] = useState([])

    const [questionExcelModal, setQuestionExcelModal] = useState(false)

    function handleSubmit() {
        let errors = validate('submit');
        if (Object.keys(errors).length > 0) {
            setValueErrors(errors);
        }
        else {
            ApiService.post(submitUrl, {data: formData?.questions}).then(async () => {
                await router.push({
                    pathname: redirectUrl || `/content/idareedici/topics/${topic_id}/${subject_id}/lessons`
                })

            }).catch(error => {
                console.log(error)
            })
        }
    }

    const validate = (type, data) => {
        const constraints = validationConstraints(type, data ? data : formData);
        const { errors } = globalValidate(data ? data : formData, constraints);
        return errors || {};
    }

    function handleChange(e) {
        changeData(e, formData, setFormData, valueErrors, setValueErrors)
    }

    function handleRemoveQuestionRow(e, key, index) {
        e.preventDefault();
        e.stopPropagation();

        focusQuestion(index === 0 ? 0 : index - 1)
        removeRow(formData, setFormData, valueErrors, setValueErrors, key, index)
    }

    function handleAddAnswerRow(key, data, index) {
        addRow(formData, setFormData, valueErrors, setValueErrors, key, data, index)
    }

    function handleRemoveAnswerRow(key, index) {
        removeRow(formData, setFormData, valueErrors, setValueErrors, key, index)
    }

    function onClickOther(e, index, other) {
        e.preventDefault();
        e.stopPropagation();

        let questions = formData.questions
        questions[index].other = !other;
        setFormData({...formData, questions: questions})
    }

    function focusQuestion(index) {
        setSelectedQuestion(index)
        let questions = formData.questions
        questions.map(el => el.current = false)
        questions[index].current = true;
        setFormData({...formData, questions: questions})
    }

    function handleNewQuestion() {
        addRow(formData, setFormData, valueErrors, setValueErrors, 'questions', {textCorrect: '', token: '', typeId: 1, variants: [{isCorrect: false, token: ''}]}, selectedQuestion + 1)
        focusQuestion(selectedQuestion + 1)
    }

    function handleAddSectionThisQuestion() {
        addRow(formData, setFormData, valueErrors, setValueErrors, 'questions', {id: findMaxID(formData?.questions,'id'), variant: 'section'}, selectedQuestion + 1)
        focusQuestion(selectedQuestion + 1)
    }

    function handleAddInfoThisQuestion() {
        let questions = formData.questions
        if (questions[selectedQuestion].variant !== 'section') questions[selectedQuestion].info = true;
        setFormData({...formData, questions: questions})
    }

    function handleAddAnswersThisQuestion() {
        inputRef.current.click();
    }


    function answerItemAddLinked(questionIndex, fakeIndex, index, variant) {
        setLinkedAnswer({
            questionIndex, index, questionFakeIndex: fakeIndex, variant
        })

        const datas = formData.questions[questionIndex].answers[index].linkedQuestionId
        setLinkedQuestionItems(datas || [])
    }

    function questionLinked(questionId) {
        let qq = Object.assign([],linkedQuestionItems);
        qq.includes(questionId) ? qq.splice(qq.indexOf(questionId), 1) : qq.push(questionId)
        setLinkedQuestionItems(qq)
    }

    function handleCreateNewQuestionTemplate() {
        let errors = validate('templateModal');
        if (Object.keys(errors).length > 0) {
            setValueErrors(errors);
        }
        else {
            setCreateQuestionTemplate(!createQuestionTemplate)
            setCreateQuestionTemplateModal(false)
            setLinkedQuestionItems([])
            setFormData({...formData, question_template_name: ''})
        }
    }
    function handleSelectQuestionWithTemplate(questionId) {
        let qq = Object.assign([], linkedQuestionItems);
        qq.includes(questionId) ? qq.splice(qq.indexOf(questionId), 1) : qq.push(questionId)
        setLinkedQuestionItems(qq)
    }

    function handleUseExistQuestionTemplate() {
        setSelectedQuestionTemplateModal(!selectedQuestionTemplateModal)
        setFormData({...formData, question_template_id: []})
    }

    function handleExcelImport() {
        setQuestionExcelModal(!questionExcelModal)
        setFormData({...formData, question_excel: []})
    }

    function handleAddFileClick(key) {
        setSelectedItemKey(key)
        inputFileRef.current.click();
    }
    function handleAddFile(e) {
        callBackChangeDataFile(e, formData, setFormData, valueErrors, setValueErrors, selectedItemKey);
    }

    function handleAddFileThisAnswerChange(e) {
        changeDataFile(e, formData, setFormData, valueErrors, setValueErrors)
    }

    function handleRemoveFile(e) {
        inputFileRef.current.value = "";
        changeData(e, formData, setFormData, valueErrors, setValueErrors)
    }


    useEffect(() => {
        if (selectedQuestionTemplateModal) {
            ApiService.get('/admin/template/list').then(response => {
                setQuestionTemplates(response.data)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [selectedQuestionTemplateModal]);

    useEffect(() => {
        if (getUrl) {
            ApiService.get(getUrl).then(response => {
                setFormData(response.data.data?.questions?.length > 0 ? response.data.data : formData);
            }).catch(error => {
                console.log(error)
                // router.navigate(redirectUrl)
            })
        }
    }, [router.query.id, getUrl]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setFormData({...formData, questions: arrayMoveImmutable(formData.questions, oldIndex, newIndex)});
    };
    const onSortEndAnswer = ({ oldIndex, newIndex, questionIndex}) => {
        let questions = [...formData.questions];
        questions[questionIndex].answers = arrayMoveImmutable(questions[questionIndex].answers, oldIndex, newIndex)
        setFormData({...formData, questions: questions});
    };

    return (
        <>
            <div className='row'>
                <div className='col-lg-10'>
                    <Section
                        inner={true}
                        blockStyle={{gap: '15px'}}
                    >
                        <SortableList
                            items={formData.questions}
                            onSortEnd={onSortEnd}
                            pressDelay={200}
                            lockAxis={'y'}
                            helperClass={'dragging'}
                            useDragHandle={true}

                            onSortEndAnswer={onSortEndAnswer}
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
                        />
                    </Section>
                </div>
                <div className='col-lg-2'>
                    <QuestionAssistant
                        handleNewQuestion={handleNewQuestion}
                        handleAddSectionThisQuestion={handleAddSectionThisQuestion}
                        handleAddInfoThisQuestion={handleAddInfoThisQuestion}
                        handleAddAnswersThisQuestion={handleAddAnswersThisQuestion}
                        inputRef={inputRef}
                        questions={formData.questions}
                        selectedQuestion={selectedQuestion}
                        handleCreateNewQuestionTemplate={handleCreateNewQuestionTemplate}
                        handleUseExistQuestionTemplate={handleUseExistQuestionTemplate}
                        handleExcelImport={handleExcelImport}
                        handleAddFile={handleAddFile}
                        handleAddFileClick={handleAddFileClick}
                        inputFileRef={inputFileRef}
                    />
                </div>
                <div className='col-lg-12 mt-4'>
                    <SgButtonGroup>
                        <SgButton
                            color='dark'
                            onClick={handleSubmit}
                        >
                            YADDA SAXLA
                        </SgButton>
                    </SgButtonGroup>
                </div>
            </div>
        </>
    )
}