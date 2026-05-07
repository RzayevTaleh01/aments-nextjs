import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import ApiService from "@/admin/services/ApiService";
import {
    GET_TOPICS_ROUTE,
    OPTIONS_CATEGORIES_ROUTE,
    OPTIONS_SECTORS_ROUTE
} from "@/admin/configs/apiRoutes";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [removeItemModal, setRemoveItemModal] = useState(false);
    const [filterData, setFilterData] = useState({});

    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    function handleRemoveItem() {
        // ApiService.delete(`${LANGUAGE_DELETE_ROUTE}/${selectedRow.id}`).then(response => {
        //     toggleRemoveItemModal()
        //     setFilters(filters)
        // }).catch(error => {
        //     console.log(error)
        // })
    }

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
                <SgPageHead
                    header='Mövzular'
                    description='Mövzu siyahısı.'
                    filter={false}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to='/content/idareedici/topics/create'
                        color='primary'
                        size='md'
                        icon='plus'
                    >
                        Mövzu əlavə et
                    </SgButton>
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
                                <SgInput
                                    id='subject'
                                    name='subject'
                                    variant='select'
                                    options={filterData?.subjects}
                                    value={filters.subject || ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleFilterDataPreFetch(e, 'chapters');
                                    }}
                                    label='Fənn'
                                    placeholder='Fənn'
                                    disabled={!filters.grade}
                                />
                            </div>
                            <div className='col-lg-4'>
                                <SgInput
                                    id='chapter'
                                    name='chapter'
                                    variant='select'
                                    options={(filterData?.chapters || []).map(el => ({
                                        ...el,
                                        name: el?.name.toUpperCase()
                                    }))}
                                    value={filters.chapter || ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    label='Bölmə'
                                    placeholder='Bölmə'
                                    disabled={!filters.subject}
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
                                    name: 'Mövzu adı',
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
                                    name: 'Dərslər',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButtonGroup>
                                                    <SgButton
                                                        size='xs'
                                                        color='primary'
                                                        type='link'
                                                        to={`/content/idareedici/topics/${key}/${row?.subjectId}/lessons`}
                                                    >
                                                        Dərs siyahısı
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        );
                                    }
                                },
                                /*{
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
                                                        to={`/content/idareedici/topics/edit/${key}`}
                                                    >
                                                        Edit
                                                    </SgButton>
                                                    <SgButton
                                                        size='xs'
                                                        color='error'
                                                        onClick={toggleRemoveItemModal}
                                                    >
                                                        Remove
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        );
                                    }
                                }*/
                            ],
                            api: GET_TOPICS_ROUTE,
                            filters
                        }}
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
                            Remove
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
                permission='topicsIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}