import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useState, useEffect} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import ApiService from "@/admin/services/ApiService";
import {
    CREATE_STATIC_CONTENT_ROUTE, DELETE_STATIC_CONTENT_ROUTE, EDIT_STATIC_CONTENT_ROUTE,
    GET_STATIC_CONTENT_ROUTE, GET_STATIC_CATEGORY_ROUTE
} from "@/admin/configs/apiRoutes";
import {SgFile, SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";

export default function Index() {
    const [data, setData] = useState({});
    const [selectedRow, setSelectedRow] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const [filters, setFilters] = useState({});
    const [categories, setCategories] = useState([]);
    const [removeItemModal, setRemoveItemModal] = useState(false);
    const [editItemModal, setEditItemModal] = useState(false);
    const [addItemModal, setAddItemModal] = useState(false);
    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    useEffect(() => {
        ApiService.get(`${GET_STATIC_CATEGORY_ROUTE}?page=1&items=1000`)
            .then(res => {
                const formatted = res.data.data.data.map(item => ({
                    name: item.name,
                    value: item.id,
                    id: item.id
                }));
                setCategories(formatted);
            })
            .catch(error => console.log(error));
    }, []);

    function handleRemoveItem() {
        ApiService.delete(`${DELETE_STATIC_CONTENT_ROUTE}/${selectedRow.id}`).then(() => {
            toggleRemoveItemModal()
            setFilters({...filters})
        }).catch(error => {
            console.log(error)
        })
    }

    function toggleEditItemModal() {
        setEditItemModal(!editItemModal)
    }

    function toggleAddItemModal() {
        setAddItemModal(!addItemModal)
    }

    function handleEditItem() {
        ApiService.post(`${EDIT_STATIC_CONTENT_ROUTE}`, selectedRow).then(() => {
            toggleEditItemModal()
            setFilters({...filters})
        }).catch(error => {
            console.log(error)
        })
    }

    function handleAddItem() {
        ApiService.post(`${CREATE_STATIC_CONTENT_ROUTE}`, data).then(() => {
            setFilters({...filters})
            setData({})
        }).catch(error => {
            console.log(error)
        })
    }

    function handleChange(e) {
        changeData(e, selectedRow, setSelectedRow, valueErrors, setValueErrors)
    }

    function handleChangeNew(e) {
        changeData(e, data, setData, valueErrors, setValueErrors)
    }


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Statik məlumatlar'
                    filter={true}
                >
                    <SgButtonGroup>
                        <SgButton
                            type='link'
                            isLinked={true}
                            to='/content/idareedici/static/categories'
                            color='primary'
                            size='md'
                        >
                            Kateqoriyalar
                        </SgButton>
                    </SgButtonGroup>
                </SgPageHead>
                <SgPageBody>
                    <div className='row align-items-end mb-[72px]'>
                        <div className='col-lg'>
                            <SgInput
                                id='key'
                                name='key'
                                label='Açar sözü'
                                placeholder='Açar sözü'
                                value={data.key || ''}
                                onChange={handleChangeNew}
                            />
                        </div>
                        <div className='col-lg'>
                            <SgInput
                                id='typeId'
                                name='typeId'
                                label='Məlumatın tipi'
                                placeholder='Məlumatın tipi'
                                value={data.typeId || ''}
                                onChange={handleChangeNew}
                                variant='select'
                                options={[
                                    {name: 'Mətn', value: 1, id: 1},
                                    {name: 'Şəkil', value: 2, id: 2}
                                ]}
                            />
                        </div>
                        <div className='col-lg'>
                            <SgInput
                                id='categoryId'
                                name='categoryId'
                                label='Kateqoriya'
                                placeholder='Kateqoriya'
                                value={data.categoryId || ''}
                                onChange={handleChangeNew}
                                variant='select'
                                options={categories}
                            />
                        </div>
                        <div className='col-lg'>
                            <SgInput
                                id='value'
                                name='value'
                                label='Açıqlama'
                                placeholder='Açıqlama'
                                value={data.value || ''}
                                onChange={handleChangeNew}
                            />
                        </div>
                        <div className='col-lg-auto'>
                            <SgButton
                                size='lg'
                                color='primary'
                                onClick={handleAddItem}
                            >
                                Əlavə et
                            </SgButton>
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
                                    key: 'key',
                                    name: 'Açar sözü',
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
                                    key: 'categoryId',
                                    name: 'Kateqoriya',
                                    hidden: false,
                                    cell: (row) => {
                                        const category = categories.find(cat => cat.id === row.categoryId);

                                        return <>{category?.name}</>;
                                    }
                                },
                                {
                                    key: 'value',
                                    name: 'Açıqlama',
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
                                    cell: () => {
                                        return (
                                            <>
                                                <SgButtonGroup>
                                                    <SgButton
                                                        size='xs'
                                                        color='primary'
                                                        onClick={toggleEditItemModal}
                                                    >
                                                        Düzəliş et
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
                                }
                            ],
                            api: GET_STATIC_CONTENT_ROUTE,
                            filters
                        }}
                        onClick={(e, row) => {setSelectedRow(row)}}
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

                <SgPopup
                    header='Edit'
                    description=' '
                    size='md'
                    setToggleModal={toggleEditItemModal}
                    toggleModal={editItemModal}
                >
                    <SgFormGroup>
                        <SgInput
                            id='key'
                            name='key'
                            label='Açar sözü'
                            placeholder='Açar sözü'
                            value={selectedRow.key}
                            onChange={handleChange}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            id='categoryId'
                            name='categoryId'
                            label='Kateqoriya'
                            placeholder='Kateqoriya'
                            value={selectedRow.categoryId}
                            onChange={handleChange}
                            variant='select'
                            options={categories}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            id='value'
                            name='value'
                            label='Açıqlama'
                            placeholder='Açıqlama'
                            value={selectedRow.value}
                            onChange={handleChange}
                        />
                    </SgFormGroup>

                    <SgButtonGroup
                        gap={true}
                    >
                        <SgButton
                            size='lg'
                            color='primary'
                            onClick={handleEditItem}
                        >
                            Düzəliş et
                        </SgButton>
                        <SgButton
                            size='lg'
                            color='error'
                            onClick={toggleEditItemModal}
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
                permission='staticIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}