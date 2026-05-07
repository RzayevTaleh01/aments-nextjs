import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import {useEffect, useState} from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import {
    GET_INFO_BY_REGION_ID_ROUTE, GET_INFO_BY_SCHOOL_ID_ROUTE,
    GET_SCHOOL_SURVEY_STATISTICS_BY_REGION_SCHOOL_ROUTE, GET_SCHOOL_SURVEY_STATISTICS_BY_REGION_SCHOOL_SURVEY_ROUTE
} from "@/admin/configs/apiRoutes";
import {useRouter} from "next/router";

export default function Index() {
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({});
    const [infoData, setInfoData] = useState({});
    const router = useRouter()
    const { query: {region_id, school_id, questions_id} } = router;
    console.log(router.query);

    useEffect(() => {
        ApiService.get(`${GET_INFO_BY_REGION_ID_ROUTE}/${region_id}`).then(resp => {
            ApiService.get(`${GET_INFO_BY_SCHOOL_ID_ROUTE}/${school_id}`).then(resp2 => {
                setInfoData({...infoData, region: resp.data.data, school: resp2.data.data})
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })


        setFilters({
            regionId: region_id,
            schoolId: school_id,
            surveyId: questions_id,
        })
    }, [region_id, school_id]);

    return (
        <>
            <SgPage>
                <SgPageHead
                    header={`Sorğu statistikası`}
                    description={infoData?.region ? `${infoData?.region?.name} rayonu - ${infoData?.school?.name} üzrə statistika` : ''}
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
                                    name: 'Sorğu üzrə suallar',
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
                                    key: 'responses',
                                    name: 'Cavab sayı (Valideynlər)',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButton
                                                    size='xs'
                                                    withOutBlock={true}
                                                    color='primary-outline'
                                                    type='link'
                                                    to={`/content/idareedici/statistics/${region_id}/survey/${school_id}/responses`}
                                                >
                                                    {key} valideyn
                                                </SgButton>
                                            </>
                                        )
                                    }
                                },
                                {
                                    key: 'id',
                                    name: 'Statistika',
                                    hidden: false,
                                    cell: (row, key) => {
                                        return (
                                            <>
                                                <SgButtonGroup>
                                                    <SgButton
                                                        size='xs'
                                                        color='primary-outline'
                                                        type='link'
                                                        to={`/content/idareedici/statistics/${region_id}/survey/${school_id}/question/${key}/${row?.typeId}`}
                                                    >
                                                        Cavablar
                                                    </SgButton>
                                                </SgButtonGroup>
                                            </>
                                        );
                                    }
                                }
                            ],
                            api: GET_SCHOOL_SURVEY_STATISTICS_BY_REGION_SCHOOL_SURVEY_ROUTE,
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