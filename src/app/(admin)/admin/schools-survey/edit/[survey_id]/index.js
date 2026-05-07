import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageFooter, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import {useEffect, useState} from "react";
import {SgFile, SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {validate} from "@/admin/utils/validate";
import {validationConstraints} from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import {useRouter} from "next/router";
import {
    EDIT_SCHOOL_SURVEY_ROUTE,
    GET_SCHOOL_SURVEY_BY_ID_ROUTE
} from "@/admin/configs/apiRoutes";
import {callBackChangeDataFile} from "@/admin/utils/changeDataFile";
import moment from "moment";


export default function Index() {
    const [data, setData] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const [filesProgress, setFilesProgress] = useState(null)
    const [contactTypes, setContactTypes] = useState([]);

    const router = useRouter()
    const { query: {survey_id} } = router;


    function handleChange(e) {
        changeData(e, data, setData, valueErrors, setValueErrors);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errors = validate(data, 'schoolCreate', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.put(`${EDIT_SCHOOL_SURVEY_ROUTE}/${survey_id}`, {
                data: {
                    ...data
                },
            }).then(async () => {
                await router.push({
                    pathname: '/content/idareedici/schools-survey'
                }, undefined, { scroll: true });
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        ApiService.get(`${GET_SCHOOL_SURVEY_BY_ID_ROUTE}/${survey_id}`).then(resp => {
            setData({
                ...resp.data.data,
            })
        }).catch(error => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Məktəb Sorğusu'
                    filter={true}
                >
                    {/*<SgButton*/}
                    {/*    type='link'*/}
                    {/*    isLinked={true}*/}
                    {/*    to='/content/idareedici/schools'*/}
                    {/*    color='primary'*/}
                    {/*    size='md'*/}
                    {/*    icon='plus'*/}
                    {/*>*/}
                    {/*    Məktəblər*/}
                    {/*</SgButton>*/}
                </SgPageHead>
                <SgPageBody>
                    <div className={['row'].join(' ').trim()}>
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <SgInput
                                    name='name'
                                    id='name'
                                    placeholder='Sorğu adı'
                                    label='Sorğu adı'
                                    value={data.name || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.name}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='description'
                                    id='description'
                                    placeholder='Sorğu təsviri'
                                    label='Sorğu təsviri'
                                    value={data.description || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.description}
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
                            to='/content/idareedici/schools-survey'
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
                permission='schoolsEdit'
            >
                {page}
            </MainLayout>
        </>
    )
}