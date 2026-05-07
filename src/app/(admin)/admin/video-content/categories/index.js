import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import ApiService from "@/admin/services/ApiService";
import {
    CREATE_VIDEO_CONTENT_CATEGORY_ROUTE,
    CREATE_VIDEO_CONTENT_ROUTE,
    DELETE_VIDEO_CONTENT_BY_ID_ROUTE, DELETE_VIDEO_CONTENT_CATEGORY_BY_ID_ROUTE,
    EDIT_VIDEO_CONTENT_BY_ID_ROUTE, EDIT_VIDEO_CONTENT_CATEGORY_BY_ID_ROUTE, GET_VIDEO_CONTENT_CATEGORY_ROUTE,
    GET_VIDEO_CONTENT_ROUTE,
} from "@/admin/configs/apiRoutes";
import {SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import {validate} from "@/admin/utils/validate";
import {validationConstraints} from "@/admin/constants/constants";

export default function Index() {
    const [data, setData] = useState({});
    const [selectedRow, setSelectedRow] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const [selectedRowValueErrors, setSelectedRowValueErrors] = useState({});
    const [filters, setFilters] = useState({});
    const [removeItemModal, setRemoveItemModal] = useState(false);
    const [editItemModal, setEditItemModal] = useState(false);

    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    function handleRemoveItem() {
        ApiService.delete(`${DELETE_VIDEO_CONTENT_CATEGORY_BY_ID_ROUTE}/${selectedRow.id}`).then(() => {
            toggleRemoveItemModal()
            setFilters({...filters})
        }).catch(error => {
            console.log(error)
        })
    }

    function toggleEditItemModal() {
        setEditItemModal(!editItemModal)
        setSelectedRowValueErrors({})
    }

    function handleEditItem(e) {
        e.preventDefault();

        let errors = validate(selectedRow, 'videoCategoryCreate', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setSelectedRowValueErrors(errors)
        }
        else {
            ApiService.put(`${EDIT_VIDEO_CONTENT_CATEGORY_BY_ID_ROUTE}/${selectedRow.id}`, selectedRow).then(() => {
                toggleEditItemModal()
                setFilters({...filters})
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function handleAddItem(e) {
        e.preventDefault();

        let errors = validate(data, 'videoCategoryCreate', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            ApiService.post(`${CREATE_VIDEO_CONTENT_CATEGORY_ROUTE}`, data).then(() => {
                setFilters({...filters})
                setData({})
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function handleChange(e) {
        changeData(e, selectedRow, setSelectedRow, selectedRowValueErrors, setSelectedRowValueErrors)
    }

    function handleChangeNew(e) {
        changeData(e, data, setData, valueErrors, setValueErrors)
    }


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Video resursların Kateqoriyaları'
                    filter={true}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to='/content/idareedici/video-content'
                        color='primary'
                        size='md'
                        icon='arrow-left'
                    >
                        Əlavə video resurslar
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className='row align-items-end mb-[72px]'>
                        <div className='col-lg'>
                            <SgInput
                                id='name'
                                name='name'
                                label='Başlıq'
                                placeholder='Başlıq'
                                value={data.name || ''}
                                isInvalid={valueErrors.name || ''}
                                onChange={handleChangeNew}
                            />
                        </div>
                        <div className='col-lg'>
                            <SgInput
                                id='row'
                                name='row'
                                label='Sıra'
                                placeholder='Sıra'
                                type='number'
                                min={1}
                                value={data.row || ''}
                                isInvalid={valueErrors.row || ''}
                                onChange={handleChangeNew}
                            />
                        </div>
                        <div className='col-lg'>
                            <SgInput
                                id='color'
                                name='color'
                                label='Yazı rəngi'
                                placeholder='Yazı rəngi'
                                type='color'
                                value={data.color || ''}
                                isInvalid={valueErrors.color || ''}
                                onChange={handleChangeNew}
                            />
                        </div>
                        <div className='col-lg'>
                            <SgInput
                                id='backgroundColor'
                                name='backgroundColor'
                                label='Fon rəngi'
                                placeholder='Yazı rəngi'
                                type='color'
                                value={data.backgroundColor || ''}
                                isInvalid={valueErrors.backgroundColor || ''}
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
                                    key: 'name',
                                    name: 'Başlıq',
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
                                    key: 'row',
                                    name: 'Sıra',
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
                                    key: 'color',
                                    name: 'Yazı rəngi',
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
                                    key: 'backgroundColor',
                                    name: 'Fon rəngi',
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
                            api: GET_VIDEO_CONTENT_CATEGORY_ROUTE,
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
                    header='Məlumatı yenilə'
                    description=' '
                    size='md'
                    setToggleModal={toggleEditItemModal}
                    toggleModal={editItemModal}
                >
                    <SgFormGroup>
                        <SgInput
                            id='name'
                            name='name'
                            label='Başlıq'
                            placeholder='Başlıq'
                            value={selectedRow.name || ''}
                            isInvalid={selectedRowValueErrors.name || ''}
                            onChange={handleChange}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            id='row'
                            name='row'
                            label='Sıra'
                            type='number'
                            placeholder='Sıra'
                            value={selectedRow.row || ''}
                            isInvalid={selectedRowValueErrors.row || ''}
                            onChange={handleChange}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            id='color'
                            name='color'
                            label='Yazı rəngi'
                            placeholder='Yazı rəngi'
                            type='color'
                            value={selectedRow.color || ''}
                            isInvalid={selectedRowValueErrors.color || ''}
                            onChange={handleChange}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            id='backgroundColor'
                            name='backgroundColor'
                            label='Fon rəngi'
                            placeholder='Fon rəngi'
                            type='color'
                            value={selectedRow.backgroundColor || ''}
                            isInvalid={selectedRowValueErrors.backgroundColor || ''}
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
                            Yadda saxla
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
                permission='videoContentIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}