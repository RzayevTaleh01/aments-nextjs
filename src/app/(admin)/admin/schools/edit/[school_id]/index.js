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
    EDIT_SCHOOLS_ROUTE,
    GET_SCHOOL_BY_ID_ROUTE,
    GET_SCHOOL_CONTACT_TYPES_ROUTE
} from "@/admin/configs/apiRoutes";
import {callBackChangeDataFile} from "@/admin/utils/changeDataFile";
import moment from "moment";


export default function Index() {
    const [data, setData] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const [filesProgress, setFilesProgress] = useState(null)
    const [contactTypes, setContactTypes] = useState([]);
    /*const [daysOptions, setDaysOptions] = useState([
        {
            id: 'Bazar ertəsi',
            value: 'Bazar ertəsi',
            name: 'Bazar ertəsi',
        },
        {
            id: 'Çərşənbə Axşamı',
            value: 'Çərşənbə Axşamı',
            name: 'Çərşənbə Axşamı',
        },
        {
            id: 'Çərşənbə',
            value: 'Çərşənbə',
            name: 'Çərşənbə',
        },
        {
            id: 'Cümə axşamı',
            value: 'Cümə axşamı',
            name: 'Cümə axşamı',
        },
        {
            id: 'Cümə',
            value: 'Cümə',
            name: 'Cümə',
        },
        {
            id: 'Şənbə',
            value: 'Şənbə',
            name: 'Şənbə',
        },
        {
            id: 'Bazar',
            value: 'Bazar',
            name: 'Bazar',
        }
    ]);*/
    const [daysOptions, setDaysOptions] = useState([
        {
            id: 1,
            value: 1,
            name: 'Bazar ertəsi',
        },
        {
            id: 2,
            value: 2,
            name: 'Çərşənbə Axşamı',
        },
        {
            id: 3,
            value: 3,
            name: 'Çərşənbə',
        },
        {
            id: 4,
            value: 4,
            name: 'Cümə axşamı',
        },
        {
            id: 5,
            value: 5,
            name: 'Cümə',
        },
        {
            id: 6,
            value: 6,
            name: 'Şənbə',
        },
        {
            id: 7,
            value: 7,
            name: 'Bazar',
        }
    ]);
    const router = useRouter()
    const { query: {school_id} } = router;


    function handleChange(e) {
        changeData(e, data, setData, valueErrors, setValueErrors);
    }

    function handleFileChange(e) {
        callBackChangeDataFile(e, data, setData, valueErrors, setValueErrors, null, filesProgress, setFilesProgress);
    }

    function handleAddContact() {
        setData({...data, contacts: [
                ...data.contacts,
                {
                    value: '',
                    typeId: 1,
                },
            ]
        })
    }

    function handleAddAdmissionDay() {
        setData({...data, openHours: [
                ...(data.openHours || []),
                {
                    title: '',
                    start_value: '',
                    end_value: '',
                },
            ]
        })
    }

    function handleRemove(index) {
        const contacts = [...data.contacts];
        contacts.splice(index, 1);
        setData({...data, contacts: contacts});
    }

    function handleRemoveAdmissionDay(index) {
        const openHours = [...data.openHours];
        openHours.splice(index, 1);
        setData({...data, openHours: openHours});
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errors = validate(data, 'schoolCreate', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.put(`${EDIT_SCHOOLS_ROUTE}/${school_id}`, {
                ...data,
                openHours: data?.openHours.map(el => (
                    {
                        ...el,
                        startTime: moment(el?.startValue).format('HH:mm'),
                        endTime: moment(el?.endValue).format('HH:mm')
                    }
                ))
            }).then(async () => {
                await router.push({
                    pathname: '/content/idareedici/schools/'
                }, undefined, { scroll: true });
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        ApiService.get(`${GET_SCHOOL_CONTACT_TYPES_ROUTE}`).then(resp => {
            setContactTypes(resp.data.data)
        }).catch(error => {
            console.log(error)
        })
        ApiService.get(`${GET_SCHOOL_BY_ID_ROUTE}/${school_id}`).then(resp => {
            setData({
                ...resp.data.data,
                openHours: resp.data.data?.openHours.map(el => {
                    return (
                        {
                            ...el,
                            startValue: moment(`${moment().format("YYYY-MM-DD")} ${el.startTime}`),
                            endValue: moment(`${moment().format("YYYY-MM-DD")} ${el.endTime}`)
                        }
                    )
                })
            })
        }).catch(error => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Məktəblər'
                    filter={true}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to='/content/idareedici/schools'
                        color='primary'
                        size='md'
                        icon='plus'
                    >
                        Məktəblər
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className={['row'].join(' ').trim()}>
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <SgInput
                                    name='name'
                                    id='name'
                                    placeholder='Məktəbin adı'
                                    label='Məktəbin adı'
                                    value={data.name || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.name}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='lat'
                                    id='lat'
                                    placeholder='Coğrafi enlik'
                                    label='Coğrafi enlik'
                                    value={data.lat || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.lat}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='lng'
                                    id='lng'
                                    placeholder='Coğrafi uzunluq'
                                    label='Coğrafi uzunluq'
                                    value={data.lng || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.lng}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='siteUrl'
                                    id='siteUrl'
                                    placeholder='URL əlavə et'
                                    label='Məktəbin vebsaytı'
                                    type='url'
                                    value={data.siteUrl || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.siteUrl}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='address'
                                    id='address'
                                    placeholder='Ünvan daxil et'
                                    label='Ünvan'
                                    variant='textarea'
                                    value={data.address || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.address}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgFile
                                    accepts='image/jpeg, image/png, image/jpg'
                                    label='Şəkil'
                                    onChange={handleFileChange}
                                    onRemove={handleChange}
                                    value={data.imageToken}
                                    id="imageToken"
                                    name='imageToken'
                                    isInvalid={valueErrors.imageToken}
                                />
                            </SgFormGroup>
                        </div>
                    </div>
                </SgPageBody>

                <SgPageHead
                    header='Əlaqə məlumatları'
                    filter={true}
                    size='extraSmall'
                >
                    <SgButton
                        color='primary'
                        size='sm'
                        icon='plus'
                        onClick={handleAddContact}
                    >
                        Əlavə et
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className='row gap-y-[32px]'>
                        {(data.contacts || []).map((item, index) => {
                            return (
                                <div key={index} className='col-lg-6'>
                                    <div key={index} className='border-1 p-[16px] rounded-[8px]'>
                                        <div className='border-b pb-[12px] mb-3 flex gap-[8px] items-center'>
                                            <h6 className='h6 mb-0'>
                                                {index + 1}{contactTypes ? `. '${contactTypes.find(el => el?.id === item.typeId)?.name}'` : null}
                                            </h6>
                                            <SgButton
                                                className='ms-auto'
                                                size='sm'
                                                color='error-outline'
                                                withOutBlock={true}
                                                onClick={() => handleRemove(index)}
                                            >
                                                Sil
                                            </SgButton>
                                        </div>
                                        <SgFormGroup>
                                            <SgInput
                                                id='typeId'
                                                name='typeId'
                                                data_key={`contacts.${index}`}
                                                label='Əlaqə növü'
                                                placeholder='Əlaqə növü'
                                                options={contactTypes}
                                                variant='select'
                                                onChange={handleChange}
                                                value={item.typeId || ''}
                                            />
                                        </SgFormGroup>
                                        <SgFormGroup>
                                            <SgInput
                                                id='value'
                                                name='value'
                                                data_key={`contacts.${index}`}
                                                label='Açıqlama'
                                                placeholder='Açıqlama'
                                                onChange={handleChange}
                                                value={item.value || ''}
                                            />
                                        </SgFormGroup>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </SgPageBody>

                <SgPageHead
                    header='Qəbul günləri məlumatları'
                    filter={true}
                    size='extraSmall'
                >
                    <SgButton
                        color='primary'
                        size='sm'
                        icon='plus'
                        onClick={handleAddAdmissionDay}
                    >
                        Əlavə et
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className='row gap-y-[32px]'>
                        {(data.openHours || []).map((item, index) => {
                            return (
                                <div key={index} className='col-lg-6'>
                                    <div key={index} className='border-1 p-[16px] rounded-[8px]'>
                                        <div className='border-b pb-[12px] mb-3 flex gap-[8px] items-center'>
                                            <h6 className='h6 mb-0'>
                                                {index + 1}{item.title ? `. '${daysOptions.find(el => el?.id === item.title)?.name}'` : null}
                                            </h6>
                                            <SgButton
                                                className='ms-auto'
                                                size='sm'
                                                color='error-outline'
                                                withOutBlock={true}
                                                onClick={() => handleRemoveAdmissionDay(index)}
                                            >
                                                Sil
                                            </SgButton>
                                        </div>
                                        <SgFormGroup>
                                            <SgInput
                                                id='weekday'
                                                name='weekday'
                                                data_key={`openHours.${index}`}
                                                label='Günlər'
                                                placeholder='Günlər'
                                                options={daysOptions}
                                                variant='select'
                                                onChange={handleChange}
                                                value={item.weekday || ''}
                                            />
                                        </SgFormGroup>
                                        <div>
                                            <SgFormGroup>
                                                <SgInput
                                                    id='startValue'
                                                    name='startValue'
                                                    data_key={`openHours.${index}`}
                                                    label='Qəbulun başlama saatı'
                                                    variant='date'
                                                    type='time'
                                                    timeFormat='HH:mm'
                                                    dateFormat='HH:mm'
                                                    placeholder='Qəbulun başlama saatı'
                                                    onChange={handleChange}
                                                    // value={item.startValue ? moment(`${moment().format("YYYY-MM-DD")} ${item.startValue}`) : ''}
                                                    value={item.startValue || ''}
                                                    timeIntervals={15}
                                                />
                                            </SgFormGroup>
                                            <SgFormGroup>
                                                <SgInput
                                                    id='endValue'
                                                    name='endValue'
                                                    data_key={`openHours.${index}`}
                                                    label='Qəbulun bitmə saatı'
                                                    variant='date'
                                                    type='time'
                                                    timeFormat='HH:mm'
                                                    dateFormat='HH:mm'
                                                    placeholder='Qəbulun bitmə saatı'
                                                    onChange={handleChange}
                                                    value={item.endValue || ''}
                                                    timeIntervals={15}
                                                />
                                            </SgFormGroup>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
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
                permission='schoolsEdit'
            >
                {page}
            </MainLayout>
        </>
    )
}