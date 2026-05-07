import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageFooter, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import {useEffect, useState} from "react";
import {SgFile, SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import {CREATE_TASKS_BY_LESSON_ID_ROUTE, GET_TASKS_BY_LESSON_ID_ROUTE} from "@/admin/configs/apiRoutes";
import {validate} from "@/admin/utils/validate";
import {validationConstraints} from "@/admin/constants/constants";
import {useRouter} from "next/router";
import {GetMaxId} from "@/admin/utils/getMaxId";
import SortableList from "@/admin/components/templates/Sortable/SortableList";
import {arrayMoveImmutable} from "array-move";
import SortableItem from "@/admin/components/templates/Sortable/SortableItem";
import WidgetItem from "@/admin/components/ui/WidgetItem";
import {callBackChangeDataFile} from "@/admin/utils/changeDataFile";


export default function Index() {
    const [data, setData] = useState({
        tasks: []
    });
    const [valueErrors, setValueErrors] = useState({});
    const [filesProgress, setFilesProgress] = useState(null)
    const router = useRouter();
    const {query: {topic_id, lesson_id, subject_id}} = router;

    function handleChange(e) {
        changeData(e, data, setData, valueErrors, setValueErrors, e.target.name === 'slug' ? slugify(e.target.value) : null);
    }

    function handleFileChange(e) {
        callBackChangeDataFile(e, data, setData, valueErrors, setValueErrors, null, filesProgress, setFilesProgress);
    }

    function handleAddTask() {
        setData({...data, tasks: [
                ...data.tasks,
                {
                    row: GetMaxId(data?.tasks, 'row') + 1,
                    text: '',
                    token: ''
                },
            ]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errors = validate(data, 'taskCreate', validationConstraints);


        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.post(`${CREATE_TASKS_BY_LESSON_ID_ROUTE}/${lesson_id}`, {data: data.tasks.map((_, index) => ({..._, row: index + 1}))}).then(async () => {
                await router.push({
                    pathname: `/content/idareedici/topics/${topic_id}/${subject_id}/lessons`
                }, undefined, { scroll: true });
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function handleRemove(index) {
        const tasks = [...data.tasks];
        tasks.splice(index, 1);
        setData({...data, tasks: tasks});
    }

    useEffect(() => {
        ApiService.get(`${GET_TASKS_BY_LESSON_ID_ROUTE}/${lesson_id}`).then(resp => {
            setData(resp.data.data);
        }).catch(error => {
            console.log(error)
        })
    }, []);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setData({...data, tasks: arrayMoveImmutable(data.tasks, oldIndex, newIndex)});
    };



    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Tasks'
                    description='Edit tasks.'
                    filter={true}
                >
                    <SgButton
                        color='primary'
                        size='sm'
                        icon='plus'
                        onClick={handleAddTask}
                    >
                        Add Task Item
                    </SgButton>
                </SgPageHead>

                <SgPageBody>
                    <SortableList
                        onSortEnd={onSortEnd}
                        pressDelay={200}
                        lockAxis={'y'}
                        helperClass={'dragging'}
                        useDragHandle={true}
                        // disableAutoscroll={false}
                        // getContainer={() => ReactDOM.findDOMNode(document.getElementById('bodyInstance'))}
                        // useWindowAsScrollContainer={true}
                    >
                        <div className='flex flex-column gap-[16px]'>
                            {(data.tasks || []).map((item, index) => {
                                return (
                                    <SortableItem
                                        key={index}
                                        index={index}
                                        value={index}
                                    >
                                        <div key={index} className='asasa'>
                                            <WidgetItem
                                                index={index}
                                                handleRemove={handleRemove}
                                            >
                                                <SgFormGroup>
                                                    <SgInput
                                                        id={`text--${index}`}
                                                        name='text'
                                                        data_key={`tasks.${index}`}
                                                        label='Text'
                                                        variant='editor'
                                                        placeholder='Text'
                                                        onChange={handleChange}
                                                        value={item.text}
                                                    />
                                                </SgFormGroup>
                                                <SgFormGroup>
                                                    <SgFile
                                                        accepts='image/jpeg, image/png, image/jpg'
                                                        label='Image'
                                                        onChange={handleFileChange}
                                                        onRemove={handleChange}
                                                        data_key={`tasks.${index}`}
                                                        value={item.token}
                                                        id={`token--${index}`}
                                                        name='token'
                                                        isInvalid={valueErrors.token}
                                                    />
                                                </SgFormGroup>
                                            </WidgetItem>
                                        </div>
                                    </SortableItem>
                                )
                            })}
                        </div>
                    </SortableList>
            </SgPageBody>

            <SgPageFooter>
                    <SgButtonGroup
                        className='mt-[72px]'
                        gap={true}
                    >
                        <SgButton
                            color='primary'
                            size='sm'
                            onClick={handleSubmit}
                        >
                            Create
                        </SgButton>
                        <SgButton
                            color='error'
                            size='sm'
                            type='link'
                            isLinked={true}
                            to={`/content/idareedici/topics/${topic_id}/${subject_id}/lessons/${lesson_id}`}
                        >
                            Ləğv et
                        </SgButton>
                    </SgButtonGroup>
                </SgPageFooter>
            </SgPage>
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout
                permission='topicsLessonsTaskEdit'
            >
                {page}
            </MainLayout>
        </>
    )
}