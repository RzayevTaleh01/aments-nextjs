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
import {EDIT_USEFUL_LINK_BY_ID_ROUTE, GET_USEFUL_LINK_BY_ID_ROUTE} from "@/admin/configs/apiRoutes";
import {callBackChangeDataFile} from "@/admin/utils/changeDataFile";


export default function Index() {
    const [data, setData] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const [filesProgress, setFilesProgress] = useState(null)
    const router = useRouter()
    const { query: {useful_link_id} } = router;


    function handleChange(e) {
        changeData(e, data, setData, valueErrors, setValueErrors);
    }

    function handleFileChange(e) {
        callBackChangeDataFile(e, data, setData, valueErrors, setValueErrors, null, filesProgress, setFilesProgress);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errors = validate(data, 'usefulLinkCreate', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.put(`${EDIT_USEFUL_LINK_BY_ID_ROUTE}/${useful_link_id}`, {...data}).then(async () => {
                await router.push({
                    pathname: '/content/idareedici/useful-links/'
                }, undefined, { scroll: true });
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        ApiService.get(`${GET_USEFUL_LINK_BY_ID_ROUTE}/${useful_link_id}`).then(resp => {
            setData(resp.data.data)
        }).catch(error => {
            console.log(error)
        })
    }, [useful_link_id]);

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Elanlar'
                    filter={true}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to='/content/idareedici/useful-links'
                        color='primary'
                        size='md'
                    >
                        Useful links
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className={['row'].join(' ').trim()}>
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <SgInput
                                    name='name'
                                    id='name'
                                    placeholder='Keçidin adını daxil edin'
                                    label='Keçidin adı'
                                    value={data.name || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.name}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='url'
                                    id='url'
                                    type='url'
                                    placeholder='Keçid linkini daxil edin'
                                    label='Keçid linkini'
                                    value={data.url || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.url}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='row'
                                    id='row'
                                    type='number'
                                    placeholder='Keçidin sırasını daxil edin'
                                    label='Keçidin sırası'
                                    value={data.row || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.row}
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
                            to='/content/idareedici/topics'
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
                permission='announcementsEdit'
            >
                {page}
            </MainLayout>
        </>
    )
}