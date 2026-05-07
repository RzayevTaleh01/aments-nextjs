import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import {
    GET_ADMIN_SCHOOLS_ROUTE, GET_ALL_STATS_ROUTE,
    OPTIONS_REGIONS_ROUTE,
} from "@/admin/configs/apiRoutes";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import DashboardItem from "@/admin/components/ui/DashboardItem";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [filterData, setFilterData] = useState({});
    const [userStats, setUserStats] = useState([]);
    const [userTypes, setUserTypes] = useState({
        pupils: 'Şagirdlər',
        teachers: 'Müəllimlər',
        directors: 'Direktorlar',
        parents: 'Valideynlər'
    });

    function handleChange(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    async function exportData(key) {
        ApiService.get(`/admin/stats/export/${key}`, {
            responseType: 'blob'
        }).then(res => {
            const href = URL.createObjectURL(res.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${key}-(${moment().format('DD-MM-YYYY--HH-mm')}).xlsx`);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);


            // const data = res?.data?.data?.data
            //
            // if (!Array.isArray(data)) {
            //     throw new Error("Xəta baş verdi. Data tipi array deyil!");
            // }
            //
            // const worksheet = XLSX.utils.json_to_sheet(data);
            // const workbook = XLSX.utils.book_new();
            // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            //
            // const excelBuffer = XLSX.write(workbook, {
            //     bookType: "xlsx",
            //     type: "array",
            // });
            //
            // const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            // saveAs(blob, `${key}-(${moment().format('DD-MM-YYYY--HH-mm')}).xlsx`);
        })
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


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Ümumi statistika'
                    filter={true}
                >
                    <SgButton
                        size='sm'
                        reverse={true}
                        icon='download'
                        onClick={() => exportData('total-users')}
                    >İxrac</SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className='row'>
                        {Object.entries(userStats).map(([key, value], index) => (
                            <div key={index} className='col-lg-3'>
                                <DashboardItem
                                    header={userTypes[`${key}`]}
                                    length={value}
                                    description={
                                        <div className='pt-[24px]'>
                                            <SgButton
                                                size='sm'
                                                reverse={true}
                                                icon='download'
                                                onClick={() => exportData(`${key.split('').splice(0, key.split('').length - 1).join('')}-list`)}
                                            >İxrac</SgButton>
                                        </div>
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </SgPageBody>

                <SgPageHead
                    header='Məktəblər üzrə statistika'
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
                                    id='regionId'
                                    name='regionId'
                                    variant='select'
                                    options={filterData?.regions}
                                    value={filters.regionId || ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
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
                                    key: 'id',
                                    name: 'Məktəb sorğusu statistikası',
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
                                                        to={`/content/idareedici/statistics/survey/${row.regionId}/${key}`}
                                                    >
                                                        Məktəb
                                                    </SgButton>
                                                    <SgButton
                                                        color='primary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/survey/${row.regionId}`}
                                                    >
                                                        Rayon
                                                    </SgButton>
                                                    <SgButton
                                                        color='primary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/survey/${row.regionId}/${key}/responses`}
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
                                    name: 'Qeydiyyat Statistikası',
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
                                                        to={`/content/idareedici/statistics/register/${row.regionId}/${key}/director`}
                                                    >
                                                        Direktor ({row?.ratings?.director || 0})
                                                    </SgButton>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/register/${row.regionId}/${key}/teacher`}
                                                    >
                                                        Müəllim ({row?.ratings?.teacher || 0})
                                                    </SgButton>
                                                    <SgButton
                                                        color='secondary-outline'
                                                        // withOutBlock={true}
                                                        size='xs'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/register/${row.regionId}/${key}/parent`}
                                                    >
                                                        Valideyn ({row?.ratings?.parent || 0})
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        )
                                    }
                                }
                            ],
                            api: GET_ADMIN_SCHOOLS_ROUTE,
                            filters
                        }}
                        onClick={(e, row) => {
                            setSelectedRow(row)
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