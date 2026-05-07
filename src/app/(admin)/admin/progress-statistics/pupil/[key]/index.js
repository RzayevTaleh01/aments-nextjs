import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import {
    GET_PUPIL_LIST_STATS_EXPORT_ROUTE,
    GET_PUPIL_LIST_STATS_ROUTE, GET_PUPIL_PROGRESS_STATS_EXPORT_ROUTE,
    GET_PUPIL_PROGRESS_STATS_ROUTE,
    GET_SCHOOLS_ROUTE,
} from "@/admin/configs/apiRoutes";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import {useRouter} from "next/router";
import ApiService from "@/admin/services/ApiService";
import moment from "moment";
import {hasPermission} from "@/utils/permissions";
import {useSession} from "next-auth/react";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [removeItemModal, setRemoveItemModal] = useState(false);
    const [filterData, setFilterData] = useState({});
    const router = useRouter();
    const {query: {school_id, region_id, grade_id, subject_id, chapter_id, key}} = router;
    const {data: session} = useSession();

    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    function handleChange(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    async function exportData(keys) {
        ApiService.get(`${GET_PUPIL_LIST_STATS_EXPORT_ROUTE}/`, {
            responseType: 'blob',
            params: {
                regionId: region_id,
                gradeId: grade_id,
                chapterId: chapter_id,
                subjectId: subject_id,
                topicId: null,
                schoolUtisCode: school_id,
                range: key
            }
        }).then(res => {
            const href = URL.createObjectURL(res.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${keys}-(${moment().format('DD-MM-YYYY--HH-mm')}).xlsx`);
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
                    header='Şagird listi'
                    description=' '
                    filter={true}
                >
                    {hasPermission(session?.permissions, 'exportIndex') ? <SgButton
                        size='sm'
                        reverse={true}
                        icon='download'
                        onClick={() => exportData('progress-statistics-pupil-list')}
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
                                    key: 'pupil_id',
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
                                    key: 'pupil_name',
                                    name: 'Ad, Soyad',
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
                                    key: 'pupil_class',
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
                                    key: 'percent',
                                    name: 'Faiz',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                {key}
                                            </>
                                        )
                                    }
                                }
                            ],
                            api: GET_PUPIL_LIST_STATS_ROUTE,
                            filters: {
                                ...filters,
                                regionId: region_id,
                                gradeId: grade_id,
                                chapterId: chapter_id,
                                subjectId: subject_id,
                                topicId: null,
                                schoolUtisCode: school_id,
                                range: key
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