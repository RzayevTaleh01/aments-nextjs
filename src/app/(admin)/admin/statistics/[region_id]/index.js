import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import {
    GET_ADMIN_SCHOOLS_ROUTE, GET_ALL_STATS_ROUTE, GET_INFO_BY_REGION_ID_ROUTE,
    OPTIONS_REGIONS_ROUTE,
} from "@/admin/configs/apiRoutes";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import DashboardItem from "@/admin/components/ui/DashboardItem";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import {useRouter} from "next/router";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [filterData, setFilterData] = useState({});
    const [infoData, setInfoData] = useState({});
    const [userStats, setUserStats] = useState([]);
    const [userTypes, setUserTypes] = useState({
        pupils: 'Şagirdlər',
        teachers: 'Müəllimlər',
        directors: 'Direktorlar',
        parents: 'Valideynlər'
    });
    const router = useRouter();
    const { query: {region_id} } = router;

    function handleChange(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    useEffect(() => {
        ApiService.get(OPTIONS_REGIONS_ROUTE).then(response => {
            setFilterData((prevState) => ({
                ...prevState,
                regions: response.data.data
            }))
        })
        ApiService.get(GET_ALL_STATS_ROUTE).then(response => {
            setUserStats(response?.data?.data)
        })
    }, []);

    useEffect(() => {
        ApiService.get(`${GET_INFO_BY_REGION_ID_ROUTE}/${region_id}`).then(resp => {
            setInfoData({...infoData, region: resp.data.data, school: {}})
        }).catch(err => {
            console.log(err);
        })
    }, [region_id]);


    return (
        <>
            <SgPage>
                <SgPageHead
                    header={`"${infoData?.region?.name}" Məktəbləri üzrə statistika`}
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
                                <SgButton
                                    color='error-outline'
                                    onClick={() => setFilters({})}
                                >
                                    Filterləri təmizlə
                                </SgButton>
                            </div>
                        </div>
                    </div>

                    <SgTable
                        tableData={{
                            data: [
                                {
                                    key: 'id',
                                    name: 'ID',
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
                                    name: 'Məktəbin adı',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                {key}
                                            </>
                                        )
                                    }
                                },
                                // {
                                //     key: 'regionName',
                                //     name: 'Rayon',
                                //     hidden: false,
                                //     cell: (row, key) => {
                                //         return (
                                //             <>
                                //                 {key}
                                //             </>
                                //         )
                                //     }
                                // },
                                {
                                    key: 'id',
                                    name: 'Məktəb sorğusu',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButtonGroup>
                                                    <SgButton
                                                        color='primary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/survey/${key}`}
                                                    >
                                                        Məktəb
                                                    </SgButton>
                                                    <SgButton
                                                        color='primary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/survey`}
                                                    >
                                                        Rayon
                                                    </SgButton>
                                                    <SgButton
                                                        color='primary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/survey/${key}/responses`}
                                                    >
                                                        Valideynlər
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        )
                                    }
                                },

                                {
                                    key: 'id',
                                    name: 'Ümumi qeydiyyat',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButtonGroup>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/register/school/${key}/director`}
                                                    >
                                                        Direktor ({row?.ratings?.totalRegistration?.director || 0})
                                                    </SgButton>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/register/school/${key}/teacher`}
                                                    >
                                                        Müəllim ({row?.ratings?.totalRegistration?.teacher || 0})
                                                    </SgButton>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/register/school/${key}/parent`}
                                                    >
                                                        Valideyn ({row?.ratings?.totalRegistration?.parent || 0})
                                                    </SgButton>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/register/school/${key}/pupil`}
                                                    >
                                                        Şagird ({row?.ratings?.totalRegistration?.pupil || 0})
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: 'id',
                                    name: 'Günlük qeydiyyat',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButtonGroup>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/register/school/${key}/director/daily`}
                                                    >
                                                        Direktor ({row?.ratings?.totadailyRegistration?.director || 0})
                                                    </SgButton>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/register/school/${key}/teacher/daily`}
                                                    >
                                                        Müəllim ({row?.ratings?.totadailyRegistration?.teacher || 0})
                                                    </SgButton>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/register/school/${key}/parent/daily`}
                                                    >
                                                        Valideyn ({row?.ratings?.totadailyRegistration?.parent || 0})
                                                    </SgButton>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${row.regionId}/register/school/${key}/pupil/daily`}
                                                    >
                                                        Şagird ({row?.ratings?.totadailyRegistration?.pupil || 0})
                                                    </SgButton>
                                                </SgButtonGroup>
                                                {/*<div>*/}
                                                {/*    <div>*/}
                                                {/*        Direktor <b>({row?.ratings?.totadailyRegistration?.director || 0})</b>*/}
                                                {/*    </div>*/}
                                                {/*    <div>*/}
                                                {/*        Müəllim <b>({row?.ratings?.totadailyRegistration?.teacher || 0})</b>*/}
                                                {/*    </div>*/}
                                                {/*    <div>*/}
                                                {/*        Valideyn <b>({row?.ratings?.totadailyRegistration?.parent || 0})</b>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: 'id',
                                    name: 'Ümumi giriş',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                {/*<SgButtonGroup>*/}
                                                {/*    <SgButton*/}
                                                {/*        color='secondary-outline'*/}
                                                {/*        // withOutBlock={true}*/}
                                                {/*        size='xs'*/}
                                                {/*        type='link'*/}
                                                {/*        // to={`/content/idareedici/statistics/${row.regionId}/register/${key}/director`}*/}
                                                {/*    >*/}
                                                {/*        Direktor ({row?.ratings?.totalLogin?.director || 0})*/}
                                                {/*    </SgButton>*/}
                                                {/*    <SgButton*/}
                                                {/*        color='secondary-outline'*/}
                                                {/*        // withOutBlock={true}*/}
                                                {/*        size='xs'*/}
                                                {/*        type='link'*/}
                                                {/*        // to={`/content/idareedici/statistics/${row.regionId}/register/${key}/teacher`}*/}
                                                {/*    >*/}
                                                {/*        Müəllim ({row?.ratings?.totalLogin?.teacher || 0})*/}
                                                {/*    </SgButton>*/}
                                                {/*    <SgButton*/}
                                                {/*        color='secondary-outline'*/}
                                                {/*        // withOutBlock={true}*/}
                                                {/*        size='xs'*/}
                                                {/*        type='link'*/}
                                                {/*        // to={`/content/idareedici/statistics/${row.regionId}/register/${key}/parent`}*/}
                                                {/*    >*/}
                                                {/*        Valideyn ({row?.ratings?.totalLogin?.parent || 0})*/}
                                                {/*    </SgButton>*/}
                                                {/*</SgButtonGroup>*/}
                                                <div>
                                                    <div>
                                                        Direktor <b>({row?.ratings?.totalLogin?.director || 0})</b>
                                                    </div>
                                                    <div>
                                                        Müəllim <b>({row?.ratings?.totalLogin?.teacher || 0})</b>
                                                    </div>
                                                    <div>
                                                        Valideyn <b>({row?.ratings?.totalLogin?.parent || 0})</b>
                                                    </div>
                                                    <div>
                                                        Şagird <b>({row?.ratings?.totalLogin?.pupil || 0})</b>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: 'id',
                                    name: 'Günlük giriş',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                {/*<SgButtonGroup>*/}
                                                    {/*<SgButton*/}
                                                    {/*    color='secondary-outline'*/}
                                                    {/*    // withOutBlock={true}*/}
                                                    {/*    size='xs'*/}
                                                    {/*    type='link'*/}
                                                    {/*    // to={`/content/idareedici/statistics/${row.regionId}/register/${key}/director`}*/}
                                                    {/*>*/}
                                                    {/*    Direktor ({row?.ratings?.dailyLogin?.director || 0})*/}
                                                    {/*</SgButton>*/}
                                                    {/*<SgButton*/}
                                                    {/*    color='secondary-outline'*/}
                                                    {/*    // withOutBlock={true}*/}
                                                    {/*    size='xs'*/}
                                                    {/*    type='link'*/}
                                                    {/*    // to={`/content/idareedici/statistics/${row.regionId}/register/${key}/teacher`}*/}
                                                    {/*>*/}
                                                    {/*    Müəllim ({row?.ratings?.dailyLogin?.teacher || 0})*/}
                                                    {/*</SgButton>*/}
                                                    {/*<SgButton*/}
                                                    {/*    color='secondary-outline'*/}
                                                    {/*    // withOutBlock={true}*/}
                                                    {/*    size='xs'*/}
                                                    {/*    type='link'*/}
                                                    {/*    // to={`/content/idareedici/statistics/${row.regionId}/register/${key}/parent`}*/}
                                                    {/*>*/}
                                                    {/*    Valideyn ({row?.ratings?.dailyLogin?.parent || 0})*/}
                                                    {/*</SgButton>*/}
                                                {/*</SgButtonGroup>*/}
                                                <div>
                                                    <div>
                                                        Direktor <b>({row?.ratings?.dailyLogin?.director || 0})</b>
                                                    </div>
                                                    <div>
                                                        Müəllim <b>({row?.ratings?.dailyLogin?.teacher || 0})</b>
                                                    </div>
                                                    <div>
                                                        Valideyn <b>({row?.ratings?.dailyLogin?.parent || 0})</b>
                                                    </div>
                                                    <div>
                                                        Şagird <b>({row?.ratings?.dailyLogin?.pupil || 0})</b>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                }
                            ],
                            api: GET_ADMIN_SCHOOLS_ROUTE,
                            filters: {
                                ...filters,
                                regionId: region_id,
                            }
                        }}
                        onClick={(e, row) => {
                            // setSelectedRow(row)
                        }}
                    />
                </SgPageBody>
            </SgPage>
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout
                permission='statisticsIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}