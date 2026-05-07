import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageFooter, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import {useEffect, useState} from "react";
import {SgFormGroup, SgInput, SgSwitch} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {validate} from "@/admin/utils/validate";
import {validationConstraints} from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import {useRouter} from "next/router";
import {
    EDIT_USER_BY_ID_ROUTE,
    GET_USER_BY_ID_ROUTE, OPTIONS_ROLES_ROUTE
} from "@/admin/configs/apiRoutes";


export default function Index() {
    const [data, setData] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const [roleOptions, setRoleOptions] = useState([])
    const [readOny, setReadOnly] = useState(true)
    const router = useRouter()
    const { query: {user_id} } = router;


    function handleChange(e) {
        changeData(e, data, setData, valueErrors, setValueErrors);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errors = validate(data, 'userEdit', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.put(`${EDIT_USER_BY_ID_ROUTE}/${user_id}`, {data}).then(async () => {
                await router.push({
                    pathname: '/content/idareedici/users/'
                }, undefined, { scroll: true });
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        ApiService.get(`${GET_USER_BY_ID_ROUTE}/${user_id}`).then(resp => {
            setData(resp.data.data)
        }).catch(error => {
            console.log(error)
        })

        ApiService.get(`${OPTIONS_ROLES_ROUTE}`).then(res => {
            setRoleOptions(res?.data?.data)
        }).catch(error => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='İstifadəçilər'
                    description='İstifadəçi redaktəsi.'
                    filter={true}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to='/content/idareedici/users'
                        color='primary'
                        size='md'
                    >
                        İstifadəçilər
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className={['row'].join(' ').trim()}>
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <SgInput
                                    name='name'
                                    id='name'
                                    placeholder='Ad'
                                    label='Ad'
                                    value={data.name || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.name}
                                    disabled={readOny}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='surname'
                                    id='surname'
                                    placeholder='Soyad'
                                    label='Soyad'
                                    value={data.surname || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.surname}
                                    disabled={readOny}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='email'
                                    id='email'
                                    type='email'
                                    placeholder='E-poçt daxil et'
                                    label='E-poçt'
                                    value={data.email || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.email}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='password'
                                    id='password'
                                    type='password'
                                    placeholder='Şifrə təyin et'
                                    label='Şifrə'
                                    value={data.password || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.password}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='phone'
                                    id='phone'
                                    type='tel'
                                    placeholder='Nömrə daxil et'
                                    label='Nömrə'
                                    value={data.phone || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.phone}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='roleId'
                                    id='roleId'
                                    variant='select'
                                    placeholder='Rol seç'
                                    label='Rol'
                                    value={data.roleId || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.roleId}
                                    options={roleOptions}
                                    data_extraarraykey='isSuperAdmin,isDevelopmentStaff'
                                    data_extraarrayvalue='#,#,'
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgSwitch
                                    id='isSuperAdmin'
                                    name='isSuperAdmin'
                                    label='Super Admin'
                                    placeholder=''
                                    value=''
                                    disabled={data.roleId === 2}
                                    checked={data.isSuperAdmin}
                                    isInvalid={valueErrors?.isSuperAdmin}
                                    onChange={handleChange}
                                    reverse={true}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgSwitch
                                    id='isDevelopmentStaff'
                                    name='isDevelopmentStaff'
                                    label='Development Staff'
                                    placeholder=''
                                    value=''
                                    disabled={data.roleId === 2}
                                    checked={data.isDevelopmentStaff}
                                    isInvalid={valueErrors?.isDevelopmentStaff}
                                    onChange={handleChange}
                                    reverse={true}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgSwitch
                                    id='status'
                                    name='status'
                                    label='Status'
                                    placeholder=''
                                    value=''
                                    checked={data.status}
                                    isInvalid={valueErrors?.status}
                                    onChange={handleChange}
                                    reverse={true}
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
                            Edit
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
                permission='usersEdit'
            >
                {page}
            </MainLayout>
        </>
    )
}