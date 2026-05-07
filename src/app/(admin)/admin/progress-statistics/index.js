import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import {
    GET_PUPIL_PROGRESS_STATS_EXPORT_ROUTE,
    GET_PUPIL_PROGRESS_STATS_ROUTE,
    GET_SCHOOLS_ROUTE,
} from "@/admin/configs/apiRoutes";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import ApiService from "@/admin/services/ApiService";
import moment from "moment/moment";
import {hasPermission} from "@/utils/permissions";
import {usePermissions} from "@/hooks/usePermissions";
import {useSession} from "next-auth/react";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [removeItemModal, setRemoveItemModal] = useState(false);
    const [filterData, setFilterData] = useState({});
    const {data: session} = useSession();

    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    function handleChange(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    useEffect(() => {
        setFilterData((prevState) => ({
            ...prevState,
            regions: [
                {
                    name: 'Binəqədi rayonu',
                    value: 1000021,
                    id: 1000021,
                    lon: 49.81216,
                    lat: 40.45398,
                },
                {
                    name: 'Sabunçu rayonu',
                    value: 1000079,
                    id: 1000079,
                    'lon': 49.95653,
                    'lat': 40.5036,
                },
                {
                    name: 'Xətai rayonu',
                    value: 1000022,
                    id: 1000022,
                    'lon': 49.92494,
                    'lat': 40.36746,
                },
                {
                    name: 'Nərimanov rayonu',
                    value: 1000010,
                    id: 1000010,
                    'lon': 49.85892,
                    'lat': 40.40305,
                },
                {
                    name: 'Pirallahi rayonu',
                    value: 1000074,
                    id: 1000074,
                    'lon': 50.44231,
                    'lat': 40.39154,
                },
                {
                    name: 'Qaradağ rayonu',
                    value: 1000007,
                    id: 1000007,
                    'lon': 49.40881,
                    'lat': 40.2546,
                },
                {
                    name: 'Suraxanı rayonu',
                    value: 1000008,
                    id: 1000008,
                    'lon': 50.01021,
                    'lat': 40.40005,
                },
                {
                    name: 'Xəzər rayonu',
                    value: 1000023,
                    id: 1000023,
                    'lon': 50.1572,
                    'lat': 40.44572,
                },
                {
                    name: 'Nəsimi rayonu',
                    value: 1000024,
                    id: 1000024,
                    'lon': 49.82983,
                    'lat': 40.3988,
                },
                {
                    name: 'Nizami rayonu',
                    value: 1000006,
                    id: 1000006,
                    'lon': 49.91588,
                    'lat': 40.40438,
                },
                {
                    name: 'Səbail rayonu',
                    value: 1000013,
                    id: 1000013,
                    'lon': 49.81734,
                    'lat': 40.35492,
                },
                {
                    name: 'Yasamal rayonu',
                    value: 1000019,
                    id: 1000019,
                    'lon': 49.81052,
                    'lat': 40.38132,
                }
            ]
        }))
    }, []);

    async function exportData(key) {
        ApiService.get(`${GET_PUPIL_PROGRESS_STATS_EXPORT_ROUTE}/`, {
            responseType: 'blob',
            params: {
                catFilter: 'region',
                regionId: null,
                gradeId: null,
                chapterId: null,
                subjectId: null,
                topicId: null,
                schoolUtisCode: null
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
                    description=' '
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
                                    id='regionId'
                                    name='regionId'
                                    variant='select'
                                    options={filterData?.regions}
                                    value={filters.regionId || ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    searchAble={true}
                                    label='Rayon'
                                    placeholder='Rayon'
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
                                    key: 'region_id',
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
                                    key: 'region',
                                    name: 'Rayon',
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
                                                    to={`/content/idareedici/progress-statistics/${row?.region_id}/pupil/0`}
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
                                                    to={`/content/idareedici/progress-statistics/${row?.region_id}/pupil/1`}
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
                                                    to={`/content/idareedici/progress-statistics/${row?.region_id}/pupil/2`}
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
                                                    to={`/content/idareedici/progress-statistics/${row?.region_id}/pupil/3`}
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
                                                    to={`/content/idareedici/progress-statistics/${row?.region_id}/pupil/4`}
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
                                                    to={`/content/idareedici/progress-statistics/${row?.region_id}/pupil/5`}
                                                >
                                                    {key}
                                                </SgButton>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: 'region_id',
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
                                                        to={`/content/idareedici/progress-statistics/${key}`}
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
                                catFilter: 'region',
                                regionId: null,
                                gradeId: null,
                                chapterId: null,
                                subjectId: null,
                                topicId: null,
                                schoolUtisCode: null
                            },
                        }}
                        onClick={(e, row) => {
                            // setSelectedRow(row)
                        }}
                    />

                    {/*<SgTable
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
                                {
                                    key: 'regionName',
                                    name: 'Rayon',
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
                                    key: 'address',
                                    name: 'Ünvan',
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
                                    key: 'id',
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
                                                        to={`/content/idareedici/progress-statistics/${key}`}
                                                    >
                                                        Göstəricilər
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        );
                                    }
                                }
                            ],
                            api: GET_SCHOOLS_ROUTE,
                            filters
                        }}
                        onClick={(e, row) => {
                            setSelectedRow(row)
                        }}
                    />*/}
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