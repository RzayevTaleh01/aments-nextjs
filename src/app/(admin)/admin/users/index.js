import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgPopup} from "@/admin/components/ui/Popup";
import ApiService from "@/admin/services/ApiService";
import {
    DELETE_USER_BY_ID_ROUTE,
    GET_USERS_ROUTE
} from "@/admin/configs/apiRoutes";
import {SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import {useSession} from "next-auth/react";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [filtersErrors, setFiltersErrors] = useState({});
    const [removeItemModal, setRemoveItemModal] = useState(false);
    const { data: {user: {isSuperAdmin}} } = useSession();

    function toggleRemoveItemModal() {
        setRemoveItemModal(!removeItemModal)
    }

    function handleRemoveItem() {
        ApiService.delete(`${DELETE_USER_BY_ID_ROUTE}/${selectedRow.id}`).then(() => {
            toggleRemoveItemModal()
            setFilters(filters)
        }).catch(error => {
            console.log(error)
        })
    }

    function handleChange(e) {
        changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
    }

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='İstifadəçilər'
                    description=' '
                    filter={true}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to={`/content/idareedici/users/create`}
                        color='primary'
                        size='md'
                        disabled={!isSuperAdmin}
                    >
                        İstifadəçi əlavə et
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
                                    name: 'Ad Soyad',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                {key} {row.surname}
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: 'email',
                                    name: 'E-poçt',
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
                                    key: 'phone',
                                    name: 'Nömrə',
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
                                    key: 'isSuperAdmin',
                                    name: 'Super Admin',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                {key ? 'Aktiv' : 'Deaktiv'}
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
                                                        to={`/content/idareedici/users/edit/${key}`}
                                                        disabled={!isSuperAdmin}
                                                    >
                                                        Düzəliş et
                                                    </SgButton>
                                                    <SgButton
                                                        size='xs'
                                                        color='error'
                                                        onClick={toggleRemoveItemModal}
                                                        disabled={!isSuperAdmin}
                                                    >
                                                        Sil
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        );
                                    }
                                }
                            ],
                            api: GET_USERS_ROUTE,
                            filters: {...filters}
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
                permission='usersIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}