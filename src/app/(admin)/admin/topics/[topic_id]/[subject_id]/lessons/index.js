import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import ApiService from "@/admin/services/ApiService";
import {DELETE_LESSON_ROUTE, GET_LESSONS_BY_TOPIC_ID_ROUTE} from "@/admin/configs/apiRoutes";
import {useRouter} from "next/router";

export default function Index() {
    const route = useRouter();
    const {query: {topic_id, subject_id}} = route
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [removeItemModal, setRemoveItemModal] = useState(false);

    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    function handleRemoveItem() {
        ApiService.delete(`${DELETE_LESSON_ROUTE}/${selectedRow.id}`).then(() => {
            toggleRemoveItemModal()
            setFilters({...filters})
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Dərslər'
                    description='Dərslərin siyahısı.'
                    filter={true}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to={`/content/idareedici/topics/${topic_id}/${subject_id}/lessons/create`}
                        color='primary'
                        size='md'
                        icon='plus'
                    >
                        Dərs əlavə et
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
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
                                    name: 'Dərsin adı',
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
                                    key: 'end_date',
                                    name: 'Bitmə tarixi',
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
                                    key: 'epub_page_number',
                                    name: 'Dərslikdəki səhifəsi',
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
                                    name: 'Test tapşırığı, Ev tapşırığı',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButtonGroup>
                                                    <SgButton
                                                        size='xs'
                                                        color='primary-outline'
                                                        type='link'
                                                        to={`/content/idareedici/topics/${topic_id}/${subject_id}/lessons/${key}/quiz`}
                                                    >
                                                        Test tapşırığı
                                                    </SgButton>
                                                    <SgButton
                                                        size='xs'
                                                        color='primary-outline'
                                                        type='link'
                                                        to={`/content/idareedici/topics/${topic_id}/${subject_id}/lessons/${key}/task`}
                                                    >
                                                        Ev tapşırığı
                                                    </SgButton>
                                                </SgButtonGroup>
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
                                                        to={`/content/idareedici/topics/${topic_id}/${subject_id}/lessons/edit/${key}`}
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
                            api: `${GET_LESSONS_BY_TOPIC_ID_ROUTE}/${topic_id}`,
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
                            Sil0
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
                permission='topicsLessonsIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}