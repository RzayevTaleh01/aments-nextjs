import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import {useEffect, useState} from "react";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import {useRouter} from "next/router";
import {supportsData} from "@/admin/configs/supports";
const REQUEST_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_ADMIN_BASE_URL;

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });
import ApiService from "@/admin/services/ApiService";
import dynamic from "next/dynamic";
import moment from "moment";

export default function Index() {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [selected, setSelected] = useState({});
    const [responseData, setResponseData] = useState(null);
    const router = useRouter();
    const {query: {supportType}} = router;


    function handleChange(e) {
        console.log(e, 'salammm')
        changeData(e, data, setData, errors, setErrors);
    }

    function handleSubmit(e) {
        ApiService({
            method: `${selected?.api?.method || "POST"}`,
            url: `${selected?.api?.url}`,
            data: data
        }).then(res => {
            setResponseData(res?.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        setSelected(supportsData?.find(el => el.key === supportType));
    }, [supportType]);


    return (
        <>
            <SgPage>
                <SgPageHead
                    header={selected?.name}
                    description={`${selected?.description}`}
                    filter={false}
                />
                <SgPageBody>
                    <div>
                        <div className='row align-items-end gap-y-[16px] mb-[58px]'>
                            <div className='col-lg-12'>
                                <SgInput
                                    id='URL'
                                    name='URL'
                                    type='text'
                                    value={`${REQUEST_ADMIN_BASE_URL}${selected?.api?.url}` || ''}
                                    onChange={handleChange}
                                    label='URL'
                                    prefix={selected?.api?.method}
                                    placeholder='URL'
                                    disabled={true}
                                />
                            </div>

                            {(selected?.api?.data || []).map((item, index) => {
                                if (item?.type === 'date') {
                                    return (
                                        <div key={index} className='col-lg-4'>
                                            <SgInput
                                                id={item?.key}
                                                name={item?.key}
                                                value={data?.[item?.key] || ''}
                                                onChange={(e) => handleChange({...e, target: {...e.target, value: e.target.value ? moment(e.target.value).format('YYYY-MM-DD') : ''}})}
                                                label={item?.name}
                                                placeholder={item?.name}
                                                variant='date'
                                                type='date'
                                                dateFormat='DD.MM.YYYY'
                                            />
                                        </div>
                                    )
                                }
                                else if (item?.type === 'text') {
                                    return (
                                        <div key={index} className='col-lg-4'>
                                            <SgInput
                                                id={item?.key}
                                                name={item?.key}
                                                type='text'
                                                value={data?.[item?.key] || ''}
                                                onChange={handleChange}
                                                label={item?.name}
                                                placeholder={item?.name}
                                            />
                                        </div>
                                    )
                                }
                            })}

                            <div className='col-lg-12 pt-[36px]'>
                                <SgButton
                                    color='primary'
                                    block
                                    onClick={handleSubmit}
                                >
                                    Göndər
                                </SgButton>
                            </div>
                        </div>

                        <div className='aalalalala'>
                        {responseData ?
                                <ReactJson src={responseData} />
                            : ''
                        }
                        </div>
                    </div>
                </SgPageBody>
            </SgPage>
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout
                permission='supportIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}