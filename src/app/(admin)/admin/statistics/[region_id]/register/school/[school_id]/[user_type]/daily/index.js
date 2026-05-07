import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import ApiService from "@/admin/services/ApiService";
import {
    GET_FIRST_LOGIN_PERSONS_BY_SCHOOL_ID_ROUTE,
    GET_INFO_BY_REGION_ID_ROUTE, GET_INFO_BY_SCHOOL_ID_ROUTE
} from "@/admin/configs/apiRoutes";
import {useRouter} from "next/router";
import moment from "moment";
import {SgInput} from "@/admin/components/ui/Form";
import {SgButton} from "@/admin/components/ui/Button";
import {changeData} from "@/admin/utils/changeData";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [infoData, setInfoData] = useState({});
    const router = useRouter()
    const { query: {region_id, school_id, user_type} } = router;

    function handleChange(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    useEffect(() => {
        ApiService.get(`${GET_INFO_BY_REGION_ID_ROUTE}/${region_id}`).then(resp => {
            ApiService.get(`${GET_INFO_BY_SCHOOL_ID_ROUTE}/${school_id}`).then(resp2 => {
                setInfoData({...infoData, region: resp.data.data, school: resp2.data.data})
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
    }, [region_id, school_id, user_type]);

    return (
        <>
            <SgPage>
                <SgPageHead
                    header={`Qeydiyyat statistikası`}
                    description={infoData?.region ? `${infoData?.region?.name} rayonu - ${infoData?.school?.name} üzrə statistikası (${moment().format('DD-MM-YYYY')})` : ''}
                    filter={false}
                />
                <SgPageBody>
                    <div>
                        <div className='row align-items-end gap-y-[16px]'>
                            <div className='col-lg-4'>
                                <SgInput
                                    id='name'
                                    name='name'
                                    type='text'
                                    value={filters.name || ''}
                                    onChange={handleChange}
                                    label='Axtarış'
                                    placeholder='Axtarış...'
                                />
                            </div>
                            <div className='col-lg-4'>
                                <SgInput
                                    id='pin'
                                    name='pin'
                                    type='text'
                                    value={filters.pin || ''}
                                    onChange={handleChange}
                                    label='FİN'
                                    placeholder='FİN...'
                                />
                            </div>

                            <div className='col-lg-4'>
                                <SgButton
                                    color='error-outline'
                                    onClick={() => setFilters({})}
                                >
                                    Filterləri təmizlə
                                </SgButton>
                            </div>
                        </div>
                    </div>

                    {infoData?.school?.utisCode ?
                        <SgTable
                            serverSide={true}
                            tableData={{
                                data: [
                                    {
                                        key: 'pin',
                                        name: 'FİN',
                                        hidden: false,
                                        cell: (row, key) => {
                                            return (
                                                <>
                                                    {key}
                                                </>
                                            )
                                        }
                                    },
                                    {
                                        key: 'name',
                                        name: 'Ad',
                                        hidden: false,
                                        cell: (row, key) => {
                                            return (
                                                <>
                                                    {row?.surname} {key} {row?.patronymic}
                                                </>
                                            )
                                        }
                                    },
                                    {
                                        key: 'class',
                                        name: 'Sinif',
                                        hidden: user_type !== 'pupil',
                                        cell: (row, key) => {
                                            return (
                                                <>
                                                    {(key || []).join(', ')}
                                                </>
                                            )
                                        }
                                    },
                                    {
                                        key: 'first_login_time',
                                        name: 'İlk Giriş Tarixi və saatı',
                                        hidden: false,
                                        cell: (row, key) => {
                                            return (
                                                <>
                                                    {moment(key).format('YYYY-MM-DD HH:mm:ss')}
                                                </>
                                            )
                                        }
                                    }
                                ],
                                api: `${GET_FIRST_LOGIN_PERSONS_BY_SCHOOL_ID_ROUTE}/${user_type}`,
                                filters: {
                                    ...filters,
                                    regionId: region_id,
                                    schoolUtisCode: infoData?.school?.utisCode,
                                    user_type: user_type,
                                    date: moment().format('YYYY-MM-DD'),
                                }
                            }}
                            onClick={(e, row) => {
                                // setSelectedRow(row)
                            }}
                        />
                        : ''
                    }
                </SgPageBody>
            </SgPage>
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout
                permission='statisticsRegisterIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}