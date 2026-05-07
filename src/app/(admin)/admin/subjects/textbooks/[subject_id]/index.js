import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import ApiService from "@/admin/services/ApiService";
import {
    CREATE_TEXTBOOKS_BY_ID_ROUTE,
    DELETE_TEXTBOOKS_BY_ID_ROUTE,
    GET_TEXTBOOKS_BY_SUBJECT_ID_ROUTE,
    PUT_TEXTBOOKS_BY_ID_ROUTE
} from "@/admin/configs/apiRoutes";
import {SgFile, SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import {useRouter} from "next/router";
import {callBackChangeDataFile} from "@/admin/utils/changeDataFile";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [data, setData] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const [filesProgress, setFilesProgress] = useState(null);
    const [filters, setFilters] = useState({});
    const {query: {subject_id}} = useRouter();
    const [editItemModal, setEditItemModal] = useState(false);
    const [createItemModal, setCreateItemModal] = useState(false);
    const [removeItemModal, setRemoveItemModal] = useState(false);

    function handleChange2(e) {
        changeData(e, data, setData, valueErrors, setValueErrors);
    }

    function handleFileChange2(e) {
        callBackChangeDataFile(e, data, setData, valueErrors, setValueErrors, null, filesProgress, setFilesProgress);
    }

    function toggleEditItemModal() {
        if (editItemModal) {
            setData({})
        }
        else {
            setData(selectedRow)
        }
        setEditItemModal(!editItemModal)
    }

    function toggleCreateItemModal() {
        if (createItemModal) {
            setData({})
        }
        setCreateItemModal(!createItemModal)
    }

    function handleEditItem() {
        ApiService.put(`${PUT_TEXTBOOKS_BY_ID_ROUTE}/${data.id}`, {data: data}).then(() => {
            toggleEditItemModal()
            setFilters({...filters})
        }).catch(error => {
            console.log(error)
        })
    }

    function handleCreateItem() {
        ApiService.post(`${CREATE_TEXTBOOKS_BY_ID_ROUTE}/${subject_id}`, {data: data}).then(() => {
            toggleCreateItemModal()
            setFilters({...filters})
        }).catch(error => {
            console.log(error)
        })
    }

    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    function handleRemoveItem() {
        ApiService.delete(`${DELETE_TEXTBOOKS_BY_ID_ROUTE}/${selectedRow.id}`).then(() => {
            toggleRemoveItemModal()
            setFilters({...filters})
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        setData(selectedRow)
    }, [selectedRow])


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Kitab'
                    filter={true}
                >
                    <SgButton
                        color='primary'
                        size='md'
                        icon='plus'
                        onClick={toggleCreateItemModal}
                    >
                        Əlavə et
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <SgTable
                        serverSide={false}
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
                                    key: 'title',
                                    name: 'Kitabın adı',
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
                                                        type='link'
                                                        onClick={toggleEditItemModal}
                                                    >
                                                        Redaktə et
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
                            api: `${GET_TEXTBOOKS_BY_SUBJECT_ID_ROUTE}/${subject_id}`,
                            filters,
                        }}
                        onClick={(e, row) => {
                            setSelectedRow(row)
                        }}
                    />
                </SgPageBody>

                <SgPopup
                    header='Kitabın redaktəsi'
                    description=' '
                    size='lg'
                    setToggleModal={toggleEditItemModal}
                    toggleModal={editItemModal}
                >
                    <SgFormGroup>
                        <SgInput
                            name='title'
                            id='title'
                            placeholder='Kitabın adını daxil edin'
                            label='Kitabın adı'
                            value={data?.title || ''}
                            onChange={handleChange2}
                            isInvalid={valueErrors.title}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgFile
                            accepts='image/jpeg, image/png, image/jpg'
                            label='Kitabın üz qabığı şəkli'
                            onChange={handleFileChange2}
                            onRemove={handleChange2}
                            value={data?.imageUrl}
                            id='imageUrl'
                            name='imageUrl'
                            isInvalid={valueErrors.imageUrl}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            name='epubUrl'
                            id='epubUrl'
                            placeholder='E-pub URL-ni daxil edin'
                            label='E-pub URL-i'
                            value={data?.epubUrl || ''}
                            onChange={handleChange2}
                            isInvalid={valueErrors.epubUrl}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            name='pdfUrl'
                            id='pdfUrl'
                            placeholder='PDF URL-ni daxil edin'
                            label='PDF URL-i'
                            value={data?.pdfUrl || ''}
                            onChange={handleChange2}
                            isInvalid={valueErrors.pdfUrl}
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

                <SgPopup
                    header='Kitabın əlavəsi'
                    description=' '
                    size='lg'
                    setToggleModal={toggleCreateItemModal}
                    toggleModal={createItemModal}
                >
                    <SgFormGroup>
                        <SgInput
                            name='title'
                            id='title'
                            placeholder='Kitabın adını daxil edin'
                            label='Kitabın adı'
                            value={data.title || ''}
                            onChange={handleChange2}
                            isInvalid={valueErrors.title}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgFile
                            accepts='image/jpeg, image/png, image/jpg'
                            label='Kitabın üz qabığı şəkli'
                            onChange={handleFileChange2}
                            onRemove={handleChange2}
                            value={data.imageUrl}
                            id='imageUrl'
                            name='imageUrl'
                            isInvalid={valueErrors.imageUrl}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            name='epubUrl'
                            id='epubUrl'
                            placeholder='E-pub URL-ni daxil edin'
                            label='E-pub URL-i'
                            value={data.epubUrl || ''}
                            onChange={handleChange2}
                            isInvalid={valueErrors.epubUrl}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            name='pdfUrl'
                            id='pdfUrl'
                            placeholder='PDF URL-ni daxil edin'
                            label='PDF URL-i'
                            value={data.pdfUrl || ''}
                            onChange={handleChange2}
                            isInvalid={valueErrors.pdfUrl}
                        />
                    </SgFormGroup>

                    <SgButtonGroup
                        gap={true}
                    >
                        <SgButton
                            size='lg'
                            color='primary'
                            onClick={handleCreateItem}
                        >
                            Əlavə et
                        </SgButton>
                        <SgButton
                            size='lg'
                            color='error'
                            onClick={toggleCreateItemModal}
                        >
                            Ləğv et
                        </SgButton>
                    </SgButtonGroup>
                </SgPopup>

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
                permission='subjectsTextbookIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}