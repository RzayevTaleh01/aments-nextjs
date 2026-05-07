import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import {
    CHANGE_STATUS_SCHOOL_SURVEY_ROUTE,
    DELETE_FAQ_BY_ID_ROUTE, DELETE_SCHOOL_SURVEY_ROUTE,
    GET_SCHOOL_SURVEY_ROUTE,
    GET_SCHOOLS_ROUTE, GET_STATISTICS_SCHOOL_SURVEY_ROUTE,
    OPTIONS_REGIONS_ROUTE,
} from "@/admin/configs/apiRoutes";
import {SgInput, SgSwitch} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import {SgPopup} from "@/admin/components/ui/Popup";
import {hasPermission} from "@/utils/permissions";
import {useSession} from "next-auth/react";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [removeItemModal, setRemoveItemModal] = useState(false);
    const [checkFieldStatus, setCheckFieldStatus] = useState(false);
    const [filterData, setFilterData] = useState({});
    const {data: session} = useSession();
    const [statistic, setStatistic] = useState([])

    function handleChange(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    function handleRemoveItem() {
        ApiService.delete(`${DELETE_SCHOOL_SURVEY_ROUTE}/${selectedRow.id}`).then(() => {
            toggleRemoveItemModal()
            setFilters(filters)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        ApiService.get(GET_SCHOOL_SURVEY_ROUTE).then(response => {
            setStatistic(response?.data?.data)
            const array = response?.data?.data || [];
            const stats = [];

            (array || [])?.map((el, index) => {
                ApiService.get(`${GET_STATISTICS_SCHOOL_SURVEY_ROUTE}?surveyId=${el?.id}`).then(resp => {
                    stats.push({
                        id: el?.id,
                        count: resp?.data?.data
                    })

                    if (index === array.length - 1) {
                        setStatistic(stats)
                    }
                })
            })
        })

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

    function handleChangeStatus(e) {
        setCheckFieldStatus(true)
        const checked = e.target.checked;

        ApiService.post(`${CHANGE_STATUS_SCHOOL_SURVEY_ROUTE}/${selectedRow.id}/activate`).then(() => {
            setFilters({...filters})
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setCheckFieldStatus(false)
        })
    }


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Məktəb Sorğuları'
                    description='Məktəb sorğularının siyahısı.'
                    filter={true}
                >
                    {hasPermission(session?.permissions, 'exportIndex') ? <SgButton
                        type='link'
                        isLinked={true}
                        to={`/content/idareedici/schools-survey/create`}
                        color='primary'
                        size='md'
                    >
                        Yeni sorğu
                    </SgButton> : null}
                </SgPageHead>
                <SgPageBody>
                    {/*<div>
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
                    </div>*/}

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
                                    name: 'Sorğu adı',
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
                                    key: 'description',
                                    name: 'Təsvir',
                                    hidden: false,
                                    cell: (row, key) => {
                                        const limited = key.length > 100 ? key.substring(0, 100) + "..." : key;
                                        return <>{limited}</>;
                                    }
                                },
                                {
                                    key: 'status',
                                    name: 'Status',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <SgSwitch
                                                id={`status-${row.id}`}
                                                name='status'
                                                label={!key ? 'Aktiv et' : 'Aktiv'}
                                                placeholder=''
                                                value=''
                                                checked={key}
                                                onChange={handleChangeStatus}
                                                reverse={true}
                                                disabled={checkFieldStatus || key}
                                            />
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
                                                        to={`/content/idareedici/schools-survey/edit/${key}`}
                                                    >
                                                        Düzəliş et
                                                    </SgButton>
                                                    <SgButton
                                                        size='xs'
                                                        color='primary'
                                                        type='link'
                                                        to={`/content/idareedici/schools-survey/questions/${key}`}
                                                    >
                                                        Suallar
                                                    </SgButton>
                                                    <SgButton
                                                        size='xs'
                                                        color='error'
                                                        onClick={toggleRemoveItemModal}
                                                    >
                                                        Sil
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        );
                                    }
                                },
                                {
                                    key: 'id',
                                    name: 'İştirakçı sayı',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return statistic?.find(el => el.id === key)?.count || 0;
                                    }
                                },
                            ],
                            api: GET_SCHOOL_SURVEY_ROUTE,
                            filters
                        }}
                        serverSide={false}
                        onClick={(e, row) => {
                            setSelectedRow(row)
                        }}
                    />
                </SgPageBody>

                <SgPopup
                    header='Silmək'
                    description=' '
                    size='md'
                    setToggleModal={toggleRemoveItemModal}
                    toggleModal={removeItemModal}
                >
                    <SgButtonGroup
                        gap={true}
                    >
                        <SgButton
                            size='lg'
                            color='error'
                            onClick={handleRemoveItem}
                        >
                            Sil
                        </SgButton>
                        <SgButton
                            size='lg'
                            color='primary'
                            onClick={toggleRemoveItemModal}
                        >
                            Ləğv et
                        </SgButton>
                    </SgButtonGroup>
                </SgPopup>
            </SgPage>
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout
                permission='schoolsIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}