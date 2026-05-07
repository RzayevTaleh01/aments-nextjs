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
    CREATE_USER_ROUTE, GET_USER_DATA_BY_PIN_ROUTE, OPTIONS_ROLES_ROUTE,
} from "@/admin/configs/apiRoutes";
import moment from "moment";


export default function Index() {
    const [personData, setPersonData] = useState({})
    const [roleOptions, setRoleOptions] = useState([])
    const [data, setData] = useState({
        pinCheck: true
    });
    const [valueErrors, setValueErrors] = useState({});
    const [readOny, setReadOnly] = useState(true)
    const router = useRouter()

    function handleChange(e) {
        changeData(e, personData, setPersonData, valueErrors, setValueErrors);
    }

    function handleChangePinCheck(e) {
        changeData(e, data, setData, valueErrors, setValueErrors);
        setPersonData({})
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errors = validate({...data, ...personData}, 'userCreate', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.post(`${CREATE_USER_ROUTE}`, {data: {
                    ...data,
                    ...personData
                }}).then(async () => {
                await router.push({
                    pathname: '/content/idareedici/users/'
                }, undefined, { scroll: true });
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function handleCheck(e) {
        e.preventDefault();

        let errors = validate(data, 'finCheck', validationConstraints);

        console.log(errors, 'create errors')

        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.post(`${GET_USER_DATA_BY_PIN_ROUTE}`, {
                ...data,
                birthDate: moment(data.birthDate).format('DD.MM.YYYY'),
            }).then(resp => {
                setData({...data, pinCheck: true})
                setPersonData({
                    ...personData,
                    name: resp.data.data.name,
                    surname: resp.data.data.surname,
                    personId: resp.data.data.id,
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        ApiService.get(`${OPTIONS_ROLES_ROUTE}`).then(res => {
            setRoleOptions(res?.data?.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='İstifadəçilər'
                    description='İstifadəçi əlavəsi.'
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
                            <div className='row'>
                                <div className='col-lg-4'>
                                    <SgFormGroup>
                                        <SgInput
                                            name='finCode'
                                            id='finCode'
                                            placeholder='FİN kodu daxil'
                                            label='Fin'
                                            value={data.finCode || ''}
                                            onChange={handleChangePinCheck}
                                            isInvalid={valueErrors.finCode}
                                            data_extraarraykey='pinCheck'
                                            data_extraarrayvalue='#,'
                                        />
                                    </SgFormGroup>
                                </div>
                                <div className='col-lg-4'>
                                    <SgFormGroup>
                                        <SgInput
                                            name='birthDate'
                                            id='birthDate'
                                            placeholder='Doğum tarixini daxil et'
                                            label='Doğum tarixi'
                                            variant='date'
                                            type='date'
                                            dateFormat='DD.MM.YYYY'
                                            value={data.birthDate || ''}
                                            onChange={handleChangePinCheck}
                                            isInvalid={valueErrors.birthDate}
                                            data_extraarraykey='pinCheck'
                                            data_extraarrayvalue='#,'
                                        />
                                    </SgFormGroup>
                                </div>
                                <div className='col-lg-4 flex'>
                                    <SgFormGroup
                                        className='mt-auto'
                                    >
                                        <SgButton
                                            onClick={handleCheck}
                                        >
                                            Yoxla
                                        </SgButton>
                                    </SgFormGroup>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <SgInput
                                    name='name'
                                    id='name'
                                    placeholder='Ad'
                                    label='Ad'
                                    value={personData.name || ''}
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
                                    value={personData.surname || ''}
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
                                    value={personData.email || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.email}
                                    disabled={!data?.pinCheck}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='password'
                                    id='password'
                                    type='password'
                                    placeholder='Şifrə təyin et'
                                    label='Şifrə'
                                    invalidMessage={valueErrors.password?.messages.join(';<br/>')}
                                    value={personData.password || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.password}
                                    disabled={!data?.pinCheck}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='repeatPassword'
                                    id='repeatPassword'
                                    type='password'
                                    placeholder='Şifrəni yenidən yaz'
                                    label='Təkrar Şifrə'
                                    value={personData.repeatPassword || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.repeatPassword}
                                    disabled={!data?.pinCheck}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='phone'
                                    id='phone'
                                    type='tel'
                                    placeholder='Nömrə daxil et'
                                    label='Nömrə'
                                    value={personData.phone || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.phone}
                                    disabled={!data?.pinCheck}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='roleId'
                                    id='roleId'
                                    variant='select'
                                    placeholder='Rol seç'
                                    label='Rol'
                                    value={personData.roleId || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.roleId}
                                    disabled={!data?.pinCheck}
                                    options={roleOptions}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgSwitch
                                    id='isSuperAdmin'
                                    name='isSuperAdmin'
                                    label='Super Admin'
                                    placeholder=''
                                    value=''
                                    checked={personData.isSuperAdmin}
                                    isInvalid={valueErrors?.isSuperAdmin}
                                    onChange={handleChange}
                                    reverse={true}
                                    disabled={!data?.pinCheck}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgSwitch
                                    id='isDevelopmentStaff'
                                    name='isDevelopmentStaff'
                                    label='Development Staff'
                                    placeholder=''
                                    value=''
                                    checked={personData.isDevelopmentStaff}
                                    isInvalid={valueErrors?.isDevelopmentStaff}
                                    onChange={handleChange}
                                    reverse={true}
                                    disabled={!data?.pinCheck}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgSwitch
                                    id='status'
                                    name='status'
                                    label='Status'
                                    placeholder=''
                                    value=''
                                    checked={personData.status}
                                    isInvalid={valueErrors?.status}
                                    onChange={handleChange}
                                    reverse={true}
                                    disabled={!data?.pinCheck}
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
                            Təsdiq et
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
                permission='usersCreate'
            >
                {page}
            </MainLayout>
        </>
    )
}