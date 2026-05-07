import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import ApiService from "@/admin/services/ApiService";
import {
    CREATE_VIDEO_CONTENT_ROUTE,
    DELETE_VIDEO_CONTENT_BY_ID_ROUTE,
    EDIT_VIDEO_CONTENT_BY_ID_ROUTE, GET_VIDEO_CONTENT_CATEGORY_ROUTE,
    GET_VIDEO_CONTENT_ROUTE,
} from "@/admin/configs/apiRoutes";
import {SgFile, SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import {callBackChangeDataFile} from "@/admin/utils/changeDataFile";
import {Axios} from "axios";

export default function Index() {
    const [data, setData] = useState({});
    const [selectedRow, setSelectedRow] = useState({});
    const [valueErrors, setValueErrors] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [removeItemModal, setRemoveItemModal] = useState(false);
    const [editItemModal, setEditItemModal] = useState(false);
    const [addItemModal, setAddItemModal] = useState(false);
    const [filesProgress, setFilesProgress] = useState(null);

    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    function handleRemoveItem() {
        ApiService.delete(`${DELETE_VIDEO_CONTENT_BY_ID_ROUTE}/${selectedRow.id}`).then(() => {
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
        ApiService.put(`${EDIT_VIDEO_CONTENT_BY_ID_ROUTE}/${selectedRow.id}`, selectedRow).then(() => {
            toggleEditItemModal()
            setFilters({...filters})
        }).catch(error => {
            console.log(error)
        })
    }

    function handleAddItem() {
        ApiService.post(`${CREATE_VIDEO_CONTENT_ROUTE}`, data).then(() => {
            setFilters({...filters})
            setData({})
        }).catch(error => {
            console.log(error)
        })
    }

    function handleChangeFilters(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    function handleChange(e) {
        changeData(e, selectedRow, setSelectedRow, valueErrors, setValueErrors)
    }

    function handleChangeNew(e) {
        changeData(e, data, setData, valueErrors, setValueErrors)
    }

    function handleFileChange(e) {
        callBackChangeDataFile(e, selectedRow, setSelectedRow, valueErrors, setValueErrors, null, filesProgress, setFilesProgress);
    }

    function handleFileChangeNew(e) {
        callBackChangeDataFile(e, data, setData, valueErrors, setValueErrors, null, filesProgress, setFilesProgress);
    }

    useEffect(() => {
        ApiService.get(GET_VIDEO_CONTENT_CATEGORY_ROUTE).then((response) => {
            setCategories(response.data?.data)
        }).catch(error => {
            console.log(error)
        })
    }, []);


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Əlavə video resurslar'
                    filter={true}
                >
                    <SgButtonGroup>
                        <SgButton
                            type='link'
                            onClick={toggleAddItemModal}
                            color='primary-outline'
                            size='md'
                            icon='plus'
                        >
                            Əlavə et
                        </SgButton>
                        <SgButton
                            type='link'
                            isLinked={true}
                            to='/content/idareedici/video-content/categories'
                            color='primary'
                            size='md'
                        >
                            Kateqoriyalar
                        </SgButton>
                    </SgButtonGroup>
                </SgPageHead>
                <SgPageBody>
                    <div className='row align-items-end gap-y-[16px]'>
                        <div className='col-lg-4'>
                            <SgInput
                                id='name'
                                name='name'
                                type='text'
                                value={filters.name || ''}
                                onChange={handleChangeFilters}
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
                                    key: 'title',
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
                                    key: 'videoUrl',
                                    name: 'Video URL',
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
                            api: GET_VIDEO_CONTENT_ROUTE,
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
                            id='title'
                            name='title'
                            label='Başlıq'
                            placeholder='Başlıq'
                            value={selectedRow.title || ''}
                            onChange={handleChange}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            id='videoUrl'
                            name='videoUrl'
                            label='Video URL'
                            placeholder='Video URL'
                            value={selectedRow.videoUrl || ''}
                            onChange={handleChange}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            id='categoryId'
                            name='categoryId'
                            label='Kateqoriya'
                            placeholder='Kateqoriya'
                            value={selectedRow.categoryId || ''}
                            onChange={handleChange}
                            variant='select'
                            options={categories}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgFile
                            accepts='image/jpeg, image/png, image/jpg'
                            label='Videonun şəkli'
                            onChange={handleFileChange}
                            onRemove={handleChange}
                            value={selectedRow.thumbnailToken}
                            id="thumbnailToken"
                            name='thumbnailToken'
                            isInvalid={valueErrors.thumbnailToken}
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

                <SgPopup
                    header='Əlavə et'
                    description=' '
                    size='md'
                    setToggleModal={toggleAddItemModal}
                    toggleModal={addItemModal}
                >
                    <SgFormGroup>
                        <SgInput
                            id='title'
                            name='title'
                            label='Başlıq'
                            placeholder='Başlıq'
                            value={data.title || ''}
                            onChange={handleChangeNew}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgInput
                            id='videoUrl'
                            name='videoUrl'
                            label='Video URL'
                            placeholder='Video URL'
                            value={data.videoUrl || ''}
                            onChange={handleChangeNew}
                        />
                    </SgFormGroup>
                    <SgFormGroup>
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
                    </SgFormGroup>
                    <SgFormGroup>
                        <SgFile
                            accepts='image/jpeg, image/png, image/jpg'
                            label='Videonun şəkli'
                            onChange={handleFileChangeNew}
                            onRemove={handleChangeNew}
                            value={data.thumbnailToken}
                            id="thumbnailToken"
                            name='thumbnailToken'
                            isInvalid={valueErrors.thumbnailToken}
                        />
                    </SgFormGroup>

                    <SgButtonGroup
                        gap={true}
                    >
                        <SgButton
                            size='lg'
                            color='primary'
                            onClick={handleAddItem}
                        >
                            Yadda saxla
                        </SgButton>
                        <SgButton
                            size='lg'
                            color='error'
                            onClick={toggleAddItemModal}
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