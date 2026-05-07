import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import {useEffect, useState} from "react";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import {useRouter} from "next/router";
const REQUEST_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_ADMIN_BASE_URL;
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });
import ApiService from "@/admin/services/ApiService";
import dynamic from "next/dynamic";
import {SgFormGroup} from "@/components/ui/Form";
import DashboardItem from "@/admin/components/ui/DashboardItem";
import {useSession} from "next-auth/react";
import {hasPermission} from "@/utils/permissions";

export default function Index() {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [selected, setSelected] = useState({});
    const [responseData, setResponseData] = useState(null);
    const [userTypes, setUserTypes] = useState([
        {
            id: 'pupil',
            value: 'pupil',
            name: 'Pupil',
        },
        {
            id: 'director',
            value: 'director',
            name: 'Director',
        },
        {
            id: 'teacher',
            value: 'teacher',
            name: 'Teacher',
        },
        {
            id: 'parent',
            value: 'parent',
            name: 'Parent',
        }
    ])
    const [grades, setGrades] = useState([
        {
            id: 1,
            value: 1,
            name: '1ci sinif',
        },
        {
            id: 2,
            value: 2,
            name: '2ci sinif',
        },
        {
            id: 3,
            value: 3,
            name: '3cü sinif',
        },
        {
            id: 4,
            value: 4,
            name: '4cü sinif',
        },
        {
            id: 5,
            value: 5,
            name: '5ci sinif',
        },
        {
            id: 6,
            value: 6,
            name: '6cı sinif',
        },
        {
            id: 7,
            value: 7,
            name: '7ci sinif',
        },
        {
            id: 8,
            value: 8,
            name: '8ci sinif',
        },
        {
            id: 9,
            value: 9,
            name: '9cu sinif',
        },
        {
            id: 10,
            value: 10,
            name: '10cu sinif',
        },
        {
            id: 11,
            value: 11,
            name: '11ci sinif',
        }
    ])
    const router = useRouter();
    const { data: session, update } = useSession();


    function handleChange(e) {
        changeData(e, data, setData, errors, setErrors);
    }

    function handleSubmit(e) {
        ApiService.post(`/admin/cabinet/${data?.type}`, data).then(res => {
            setResponseData(res?.data?.data)
        }).catch(err => {
            console.log(err)
        })
    }

    async function handleChangeCabinet(e) {
        e.preventDefault();
        e.stopPropagation();

        await update(responseData)
        await router.push('/cabinet')
    }

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Admin'
                    description=''
                    filter={false}
                />
                <SgPageBody>
                    <div>
                        <div className='row align-items-end gap-y-[16px] mb-[58px]'>
                            <div className='col-lg-4'>
                                <SgFormGroup>
                                    <SgInput
                                        label='İstifadəçi tipi'
                                        placeholder='İstifadəçi tipi'
                                        id='type'
                                        name='type'
                                        type='type'
                                        onChange={handleChange}
                                        isInvalid={errors?.type}
                                        value={data?.type}
                                        variant='select'
                                        options={userTypes}
                                    />
                                </SgFormGroup>
                            </div>
                            {data?.type === 'pupil' ?
                                <>
                                    <div className='col-lg-4'>
                                        <SgFormGroup>
                                            <SgInput
                                                label='Grade'
                                                placeholder='Grade'
                                                id='gradeId'
                                                name='gradeId'
                                                type='text'
                                                onChange={handleChange}
                                                isInvalid={errors?.gradeId}
                                                value={data?.gradeId}
                                                variant='select'
                                                options={grades}
                                            />
                                        </SgFormGroup>
                                    </div>
                                    <div className='col-lg-4'>
                                        <SgFormGroup>
                                            <SgInput
                                                label='UTIS code'
                                                placeholder='UTIS code'
                                                id='utisCode'
                                                name='utisCode'
                                                type='text'
                                                onChange={handleChange}
                                                isInvalid={errors?.utisCode}
                                                value={data?.utisCode}
                                            />
                                        </SgFormGroup>
                                    </div>
                                </>
                                : null
                            }
                            {data?.type === 'parent' ?
                                <>
                                    <div className='col-lg-4'>
                                        <SgFormGroup>
                                            <SgInput
                                                label='Grade'
                                                placeholder='Grade'
                                                id='gradeId'
                                                name='gradeId'
                                                type='text'
                                                onChange={handleChange}
                                                isInvalid={errors?.gradeId}
                                                value={data?.gradeId}
                                                variant='select'
                                                options={grades}
                                            />
                                        </SgFormGroup>
                                    </div>
                                    <div className='col-lg-4'>
                                        <SgFormGroup>
                                            <SgInput
                                                label='FİN'
                                                placeholder='FİN'
                                                id='fin'
                                                name='fin'
                                                type='text'
                                                onChange={handleChange}
                                                isInvalid={errors?.fin}
                                                value={data?.fin}
                                            />
                                        </SgFormGroup>
                                    </div>
                                </>
                                : null
                            }
                            {data?.type === 'teacher' ?
                                <>
                                    <div className='col-lg-4'>
                                        <SgFormGroup>
                                            <SgInput
                                                label='School Utis Code'
                                                placeholder='School Utis Code'
                                                id='schoolUtisCode'
                                                name='schoolUtisCode'
                                                type='text'
                                                onChange={handleChange}
                                                isInvalid={errors?.schoolUtisCode}
                                                value={data?.schoolUtisCode}
                                            />
                                        </SgFormGroup>
                                    </div>
                                    <div className='col-lg-4'>
                                        <SgFormGroup>
                                            <SgInput
                                                label='FİN'
                                                placeholder='FİN'
                                                id='fin'
                                                name='fin'
                                                type='text'
                                                onChange={handleChange}
                                                isInvalid={errors?.fin}
                                                value={data?.fin}
                                            />
                                        </SgFormGroup>
                                    </div>
                                </>
                                : null
                            }
                            {data?.type === 'director' ?
                                <>
                                    <div className='col-lg-4'>
                                        <SgFormGroup>
                                            <SgInput
                                                label='School Utis Code'
                                                placeholder='School Utis Code'
                                                id='schoolUtisCode'
                                                name='schoolUtisCode'
                                                type='text'
                                                onChange={handleChange}
                                                isInvalid={errors?.schoolUtisCode}
                                                value={data?.schoolUtisCode}
                                            />
                                        </SgFormGroup>
                                    </div>
                                    <div className='col-lg-4'>
                                        <SgFormGroup>
                                            <SgInput
                                                label='FİN'
                                                placeholder='FİN'
                                                id='fin'
                                                name='fin'
                                                type='text'
                                                onChange={handleChange}
                                                isInvalid={errors?.fin}
                                                value={data?.fin}
                                            />
                                        </SgFormGroup>
                                    </div>
                                </>
                                : null
                            }


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

                        {responseData ?
                            <div className='row'>
                                <div className='col-lg-4'>
                                    <DashboardItem
                                        header={`${responseData?.user?.person?.name} ${responseData?.user?.person?.surname}`}
                                        description={<ul>
                                            <li><b>Type:</b> {responseData?.user?.type?.name}</li>
                                            <li><b>ID:</b> {responseData?.user?.id}</li>
                                            <li><b>Person ID:</b> {responseData?.user?.personId}</li>
                                        </ul>}
                                        path={`/content/idareedici/support/${responseData.key}`}
                                        length={responseData?.user?.person?.finCode}
                                        list={[
                                            {
                                                path: '/',
                                                name: 'Kabinetə daxil ol',
                                                onClick: handleChangeCabinet,
                                                permission: 'adminRedirect',
                                            }
                                        ].filter(el => !(el?.permission && !hasPermission(session?.permissions, el?.permission)))}
                                    />
                                </div>
                            </div>
                            : ''
                        }
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
                permission='adminIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}