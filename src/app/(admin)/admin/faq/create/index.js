import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageFooter, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import {useState} from "react";
import {SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {validate} from "@/admin/utils/validate";
import {validationConstraints} from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import {
    CREATE_FAQ_ROUTE
} from "@/admin/configs/apiRoutes";
import {useRouter} from "next/router";


export default function Index() {
    const [data, setData] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const router = useRouter()


    function handleChange(e) {
        changeData(e, data, setData, valueErrors, setValueErrors);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errors = validate(data, 'faqCreate', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.post(`${CREATE_FAQ_ROUTE}`, {...data}).then(async () => {
                await router.push({
                    pathname: '/content/idareedici/faq/'
                }, undefined, { scroll: true });
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='FAQ əlavə et.'
                    filter={true}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to='/content/idareedici/faq'
                        color='primary'
                        size='md'
                    >
                        FAQ`ların siyahısı
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className={['row'].join(' ').trim()}>
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <SgInput
                                    name='question'
                                    id='question'
                                    placeholder='Sualın adını daxil edin'
                                    label='Sualın adı'
                                    value={data.question || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.question}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='row'
                                    id='row'
                                    placeholder='Sıra'
                                    label='Sıra'
                                    value={data.row || ''}
                                    min={1}
                                    type='number'
                                    onChange={handleChange}
                                    isInvalid={valueErrors.row}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='answer'
                                    id='answer'
                                    placeholder='Mətn...'
                                    label='Cavab mətni'
                                    variant='editor'
                                    value={data.answer || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.answer}
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
                            to='/content/idareedici/faq'
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
                permission='faqCreate'
            >
                {page}
            </MainLayout>
        </>
    )
}