import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import SgTable from "@/admin/components/ui/Table";
import {useState} from "react";
import {
    GET_RESPONSES_BY_SCHOOL_USER_PUPIL_ROUTE
} from "@/admin/configs/apiRoutes";
import {useRouter} from "next/router";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const router = useRouter()
    const { query: {school_id, user_pupil_id} } = router;


    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Məktəblər üzrə statistika'
                    filter={false}
                />
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
                                    key: 'text',
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
                                    key: 'typeId',
                                    name: 'Cavab',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                {[1, 2, 3].includes(key) ? (row?.selectedVariants || []).map(el => ((row?.variants || []).find(it => it.id === el) || {})?.text).join(', ') : row?.textAnswer}
                                            </>
                                        )
                                    }
                                }
                            ],
                            api: `${GET_RESPONSES_BY_SCHOOL_USER_PUPIL_ROUTE}/${school_id}/user-pupil/${user_pupil_id}`,
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
                permission='statisticsSurveyIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}