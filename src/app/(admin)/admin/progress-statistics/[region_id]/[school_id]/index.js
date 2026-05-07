import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import {
    GET_INFO_BY_CATEGORY_ID_ROUTE,
    GET_INFO_BY_REGION_ID_ROUTE,
    GET_INFO_BY_SCHOOL_UTIS_ROUTE, GET_PUPIL_PROGRESS_STATS_EXPORT_ROUTE,
    GET_PUPIL_PROGRESS_STATS_ROUTE,
} from "@/admin/configs/apiRoutes";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import ApiService from "@/admin/services/ApiService";
import {useRouter} from "next/router";
import moment from "moment";
import {hasPermission} from "@/utils/permissions";
import {useSession} from "next-auth/react";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [infoData, setInfoData] = useState({});
    const router = useRouter();
    const {query: {school_id, region_id, grade_id, subject_id, chapter_id}} = router;
    const {data: session} = useSession();

    function handleChange(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    async function getInfos() {
        let object = {};

        if (region_id) {
            await ApiService.get(`${GET_INFO_BY_REGION_ID_ROUTE}/${region_id}`).then(resp => {
                object = ({...object, region: resp.data.data})
            }).catch(err => {
                console.log(err);
            })
        }
        if (school_id) {
            await ApiService.get(`${GET_INFO_BY_SCHOOL_UTIS_ROUTE}/${school_id}`).then(resp => {
                object = ({...object, school: resp.data.data})
            }).catch(err => {
                console.log(err);
            })
        }
        if (grade_id) {
            await ApiService.get(`${GET_INFO_BY_CATEGORY_ID_ROUTE}/${grade_id}`).then(resp => {
                object = ({...object, grade: resp.data.data})
            }).catch(err => {
                console.log(err);
            })
        }
        if (subject_id) {
            await ApiService.get(`${GET_INFO_BY_CATEGORY_ID_ROUTE}/${subject_id}`).then(resp => {
                object = ({...object, subject: resp.data.data})
            }).catch(err => {
                console.log(err);
            })
        }
        if (chapter_id) {
            await ApiService.get(`${GET_INFO_BY_CATEGORY_ID_ROUTE}/${chapter_id}`).then(resp => {
                object = ({...object, chapter: resp.data.data})
            }).catch(err => {
                console.log(err);
            })
        }

        setInfoData(object);
    }

    useEffect(() => {
        getInfos()
    }, [school_id, region_id, grade_id, subject_id, chapter_id])

    async function exportData(key) {
        ApiService.get(`${GET_PUPIL_PROGRESS_STATS_EXPORT_ROUTE}/`, {
            responseType: 'blob',
            params: {
                catFilter: 'grade',
                regionId: region_id,
                gradeId: null,
                chapterId: null,
                subjectId: null,
                topicId: null,
                schoolUtisCode: school_id
            }
        }).then(res => {
            const href = URL.createObjectURL(res.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${key}-(${moment().format('DD-MM-YYYY--HH-mm')}).xlsx`);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
    }


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='İrəliləmə göstəriciləri'
                    description={`${infoData?.region?.name ? `<b>${infoData?.region?.name}</b> rayon, ` : ''}${infoData?.school?.name ? `<b>${infoData?.school?.name}</b>, ` : ''}${infoData?.grade?.name ? `<b>${infoData?.grade?.name}</b> sinif,` : ''}${infoData?.subject?.name ? `<b>${infoData?.subject?.name}</b> fənni, ` : ''}${infoData?.chapter?.name ? `<b>${infoData?.chapter?.name}</b> bölməsi` : ''} üzrə irəliləmə göstəriciləri.`}
                    filter={true}
                >
                    {hasPermission(session?.permissions, 'exportIndex') ? <SgButton
                        size='sm'
                        reverse={true}
                        icon='download'
                        onClick={() => exportData('progress-statistics')}
                    >İxrac</SgButton> : null}
                </SgPageHead>
                <SgPageBody>
                    <div>
                        {/*<div className='row align-items-end gap-y-[16px]'>*/}
                        {/*    <div className='col-lg-4'>*/}
                        {/*        <SgInput*/}
                        {/*            id='name'*/}
                        {/*            name='name'*/}
                        {/*            type='text'*/}
                        {/*            value={filters.name || ''}*/}
                        {/*            onChange={handleChange}*/}
                        {/*            label='Axtarış'*/}
                        {/*            placeholder='Axtarış...'*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className='col-lg-4'>*/}
                        {/*        <SgInput*/}
                        {/*            id='regionId'*/}
                        {/*            name='regionId'*/}
                        {/*            variant='select'*/}
                        {/*            options={filterData?.regions}*/}
                        {/*            value={filters.regionId || ''}*/}
                        {/*            onChange={(e) => {*/}
                        {/*                handleChange(e);*/}
                        {/*            }}*/}
                        {/*            searchAble={true}*/}
                        {/*            label='Rayon'*/}
                        {/*            placeholder='Rayon'*/}
                        {/*        />*/}
                        {/*    </div>*/}

                        {/*    <div className='col-lg-4'>*/}
                        {/*        <SgButton*/}
                        {/*            color='error-outline'*/}
                        {/*            onClick={() => setFilters({})}*/}
                        {/*        >*/}
                        {/*            Filterləri təmizlə*/}
                        {/*        </SgButton>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    <SgTable
                        tableData={{
                            data: [
                                {
                                    key: 'grade_id',
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
                                    key: 'grade',
                                    name: 'Sinif',
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
                                    key: '0_percent',
                                    name: '0%',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButton
                                                    size='xs'
                                                    color='primary-outline'
                                                    type='link'
                                                    to={`/content/idareedici/progress-statistics/${region_id}/${school_id}/${row?.grade_id}/pupil/0`}
                                                >
                                                    {key}
                                                </SgButton>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: '0-20_percent',
                                    name: '0-20%',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButton
                                                    size='xs'
                                                    color='primary-outline'
                                                    type='link'
                                                    to={`/content/idareedici/progress-statistics/${region_id}/${school_id}/${row?.grade_id}/pupil/1`}
                                                >
                                                    {key}
                                                </SgButton>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: '20-40_percent',
                                    name: '20-40%',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButton
                                                    size='xs'
                                                    color='primary-outline'
                                                    type='link'
                                                    to={`/content/idareedici/progress-statistics/${region_id}/${school_id}/${row?.grade_id}/pupil/2`}
                                                >
                                                    {key}
                                                </SgButton>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: '40-60_percent',
                                    name: '40-60%',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButton
                                                    size='xs'
                                                    color='primary-outline'
                                                    type='link'
                                                    to={`/content/idareedici/progress-statistics/${region_id}/${school_id}/${row?.grade_id}/pupil/3`}
                                                >
                                                    {key}
                                                </SgButton>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: '60-80_percent',
                                    name: '60-80%',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButton
                                                    size='xs'
                                                    color='primary-outline'
                                                    type='link'
                                                    to={`/content/idareedici/progress-statistics/${region_id}/${school_id}/${row?.grade_id}/pupil/4`}
                                                >
                                                    {key}
                                                </SgButton>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: '80-100_percent',
                                    name: '80-100%',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButton
                                                    size='xs'
                                                    color='primary-outline'
                                                    type='link'
                                                    to={`/content/idareedici/progress-statistics/${region_id}/${school_id}/${row?.grade_id}/pupil/5`}
                                                >
                                                    {key}
                                                </SgButton>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: 'grade_id',
                                    name: 'Əməliyyatlar',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButtonGroup>
                                                    <SgButton
                                                        size='xs'
                                                        color='primary'
                                                        type='link'
                                                        to={`/content/idareedici/progress-statistics/${region_id}/${school_id}/${key}`}
                                                    >
                                                        Göstəricilər
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        );
                                    }
                                }
                            ],
                            api: GET_PUPIL_PROGRESS_STATS_ROUTE,
                            filters: {
                                ...filters,
                                catFilter: 'grade',
                                regionId: region_id,
                                gradeId: null,
                                chapterId: null,
                                subjectId: null,
                                topicId: null,
                                schoolUtisCode: school_id
                            },
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