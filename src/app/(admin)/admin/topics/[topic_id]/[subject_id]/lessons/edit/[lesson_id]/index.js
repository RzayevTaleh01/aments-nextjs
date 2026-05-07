import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageFooter, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import {useEffect, useState} from "react";
import {SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {validate} from "@/admin/utils/validate";
import {validationConstraints} from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import {
    EDIT_LESSON_ROUTE,
    GET_LESSON_BY_LESSON_ID_ROUTE,
    GET_TEXTBOOKS_BY_SUBJECT_ID_ROUTE,
} from "@/admin/configs/apiRoutes";
import {useRouter} from "next/router";
import moment from "moment";


export default function Index() {
    const [data, setData] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const router = useRouter()
    const { query: {topic_id, lesson_id, subject_id} } = router;
    const [textBooks, setTextBooks] = useState([]);


    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        changeData(e, data, setData, valueErrors, setValueErrors, null, null, name === 'endDate' ? moment(value).add(7, 'days').format() : '', name === 'endDate' ? 'taskVideoDate' : '');
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errors = validate(data, 'lessonCreate', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.put(`${EDIT_LESSON_ROUTE}/${lesson_id}`, {
                parentId: Number(topic_id),
                ...data
            }).then(async () => {
                await router.push({
                    pathname: `/content/idareedici/topics/${topic_id}/${subject_id}/lessons`
                }, undefined, { scroll: true });
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        ApiService.get(`${GET_LESSON_BY_LESSON_ID_ROUTE}/${lesson_id}`).then(resp => {
            setData(resp.data.data)
        }).catch(error => {
            console.log(error)
        })

        ApiService.get(`${GET_TEXTBOOKS_BY_SUBJECT_ID_ROUTE}/${subject_id}`).then(response => {
            setTextBooks((response.data.data || []).map(el => ({...el, name: el.title})));
        }).catch(error => {
            console.log(error);
        })
    }, []);


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Dərslər'
                    filter={true}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to='/content/idareedici/topics'
                        color='primary'
                        size='md'
                        icon='plus'
                    >
                        Mövzular
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className={['row'].join(' ').trim()}>
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <SgInput
                                    name='name'
                                    id='name'
                                    placeholder='Dərsin adını daxil et'
                                    label='Dərsin adı'
                                    value={data.name || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.name}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='summary'
                                    id='summary'
                                    placeholder='Mətn...'
                                    label='İcmal'
                                    variant='editor'
                                    value={data.summary || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.summary}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='videoUrl'
                                    id='videoUrl'
                                    placeholder='URL əlavə et'
                                    label='Dərsin videosu'
                                    value={data.videoUrl || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.videoUrl}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='endDate'
                                    id='endDate'
                                    placeholder='Tarix seç'
                                    label='Dərsin bitmə tarixi'
                                    variant='date'
                                    type='date'
                                    dateFormat='YYYY-MM-DD'
                                    value={data.endDate  || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.endDate}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='epubId'
                                    id='epubId'
                                    placeholder='E-pub-ı seçin'
                                    label='E-pub'
                                    variant='select'
                                    options={textBooks}
                                    value={data.epubId || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.epubId}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='epubPage'
                                    id='epubPage'
                                    placeholder='E-pub-dakı səhifəni qeyd et'
                                    label='E-pub səhifəsi'
                                    value={data.epubPage || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.epubPage}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='taskVideoUrl'
                                    id='taskVideoUrl'
                                    placeholder='URL əlavə et'
                                    label='Ev tapşırığının videosu'
                                    value={data.taskVideoUrl || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.taskVideoUrl}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='taskVideoDate'
                                    id='taskVideoDate'
                                    placeholder='Tarix seç'
                                    label='Ev tapşırığı videosunun tarixi'
                                    variant='date'
                                    type='date'
                                    minDate={data.endDate || ''}
                                    dateFormat='YYYY-MM-DD'
                                    value={data.taskVideoDate  || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.taskVideoDate}
                                />
                            </SgFormGroup>
                        </div>
                    </div>
                </SgPageBody>
                <SgPageFooter>
                    <SgButtonGroup
                        gap={true}
                    >
                        <SgButton
                            color='primary'
                            size='sm'
                            onClick={handleSubmit}
                        >
                            Yadda saxla
                        </SgButton>
                        <SgButton
                            color='error'
                            size='sm'
                            type='link'
                            to={`/content/idareedici/topics/${topic_id}/${subject_id}/lessons`}
                        >
                            Ləğv et
                        </SgButton>
                    </SgButtonGroup>
                </SgPageFooter>
            </SgPage>
        </>
    );
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout
                permission='topicsLessonsEdit'
            >
                {page}
            </MainLayout>
        </>
    )
}