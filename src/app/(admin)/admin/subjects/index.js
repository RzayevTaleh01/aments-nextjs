import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import {
    GET_SUBJECTS_ROUTE,
    OPTIONS_CATEGORIES_ROUTE,
    OPTIONS_SECTORS_ROUTE
} from "@/admin/configs/apiRoutes";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [filterData, setFilterData] = useState({});

    function handleChange(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    useEffect(() => {
        ApiService.get(OPTIONS_SECTORS_ROUTE).then(response => {
            setFilterData((prevState) => ({
                ...prevState,
                sectors: response.data.data
            }))
        })
    }, []);

    function handleFilterDataPreFetch(e, key) {
        ApiService.get(`${OPTIONS_CATEGORIES_ROUTE}/${e.target.value}`).then(response => {
            setFilterData((prevState) => ({
                ...prevState,
                [key]: response.data.data
            }))
        })
    }


    return (
        <>
            <SgPage>
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
                                    id='sector'
                                    name='sector'
                                    variant='select'
                                    options={filterData?.sectors}
                                    value={filters.sector || ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleFilterDataPreFetch(e, 'grades');
                                    }}
                                    label='Tədris dili'
                                    placeholder='Tədris dili'
                                    data_extraarraykey='grade,subject,section'
                                    data_extraarrayvalue='#,#,'
                                />
                            </div>
                            <div className='col-lg-4'>
                                <SgInput
                                    id='grade'
                                    name='grade'
                                    variant='select'
                                    options={filterData?.grades}
                                    value={filters.grade || ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleFilterDataPreFetch(e, 'subjects');
                                    }}
                                    label='Sinif'
                                    placeholder='Sinif'
                                    disabled={!filters.sector}
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
                                    name: 'Ad',
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
                                    name: 'Kitablar',
                                    hidden: false,
                                    cell: (row) => {
                                        return (
                                            <>
                                                <SgButtonGroup>
                                                    <SgButton
                                                        size='xs'
                                                        color='primary'
                                                        type='link'
                                                        to={`/content/idareedici/subjects/textbooks/${row.id}`}
                                                    >
                                                        Kitabların siyahısı
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        );
                                    }
                                }
                            ],
                            api: GET_SUBJECTS_ROUTE,
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
                permission='subjectsIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}