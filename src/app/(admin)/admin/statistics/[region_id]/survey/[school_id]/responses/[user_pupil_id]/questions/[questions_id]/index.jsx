import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import {
    GET_INFO_BY_REGION_ID_ROUTE, GET_INFO_BY_SCHOOL_ID_ROUTE,
    GET_RESPONSES_BY_SCHOOL_USER_PUPIL_ROUTE
} from "@/admin/configs/apiRoutes";
import {useRouter} from "next/router";
import ApiService from "@/admin/services/ApiService";

export default function Index() {
    const [filters, setFilters] = useState(null);
    const router = useRouter();
    const { region_id, school_id, user_pupil_id, questions_id } = router.query;

    useEffect(() => {
        if (questions_id) {
            setFilters({
                surveyId: questions_id,
            });
        }
    }, [questions_id]);

    return (
        <SgPage>
            <SgPageHead header='Məktəblər üzrə statistika' filter={false} />
            <SgPageBody>

                {questions_id && filters && (
                    <SgTable
                        serverSide={false}
                        tableData={{
                            data: [
                                {
                                    key: 'id',
                                    name: 'ID',
                                    hidden: false,
                                    cell: (row, key) => key
                                },
                                {
                                    key: 'text',
                                    name: 'Ad',
                                    hidden: false,
                                    cell: (row, key) => key
                                },
                                {
                                    key: 'typeId',
                                    name: 'Cavab',
                                    hidden: false,
                                    cell: (row, key) => (
                                        <>
                                            {[1,2,3].includes(key)
                                                ? (row?.selectedVariants || [])
                                                    .map(el => ((row?.variants || []).find(it => it.id === el) || {}).text)
                                                    .join(', ')
                                                : row?.textAnswer
                                            }
                                        </>
                                    )
                                }
                            ],
                            api: `${GET_RESPONSES_BY_SCHOOL_USER_PUPIL_ROUTE}/${school_id}/user-pupil/${user_pupil_id}`,
                            filters
                        }}
                    />
                )}

            </SgPageBody>
        </SgPage>
    );
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
