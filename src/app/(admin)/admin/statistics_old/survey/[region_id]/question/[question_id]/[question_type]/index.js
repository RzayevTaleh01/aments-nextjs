import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";
import {useEffect, useState} from "react";
import ApiService from "@/admin/services/ApiService";
import {
    GET_SCHOOL_SURVEY_QUESTION_STATISTICS_BY_REGION_SCHOOL_ROUTE
} from "@/admin/configs/apiRoutes";
import {useRouter} from "next/router";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
};

export default function Index() {
    const router = useRouter()
    const { query: {region_id, school_id, question_id, question_type} } = router;

    const [data, setData] = useState({})
    const [chartData, setChartData] = useState({})
    const [haveData, setHaveData] = useState(false)

    useEffect(() => {
        let dataset = []
        let labels = []
        ApiService({
            url: `${GET_SCHOOL_SURVEY_QUESTION_STATISTICS_BY_REGION_SCHOOL_ROUTE}/${question_id}`,
            params: {
                regionId: region_id,
                schoolId: school_id
            }
        }).then(response => {
            setData(response.data.data)

            if (['1', '2', '3'].includes(question_type)) {
                response.data.data.map(el => {
                    dataset.push(el.count)
                    labels.push(`${el.text}-(${el.count})`)
                })

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: '',
                            data: dataset,
                            backgroundColor: [
                                'rgba(255, 205, 255, 0.8)',
                                'rgba(255, 205, 205, 0.8)',
                                'rgba(255, 205, 155, 0.8)',
                                'rgba(255, 205, 105, 0.8)',
                                'rgba(255, 205, 55, 0.8)',

                                'rgba(255, 155, 255, 0.8)',
                                'rgba(255, 155, 205, 0.8)',
                                'rgba(255, 155, 155, 0.8)',
                                'rgba(255, 155, 105, 0.8)',
                                'rgba(255, 155, 55, 0.8)',

                                'rgba(255, 105, 255, 0.8)',
                                'rgba(255, 105, 205, 0.8)',
                                'rgba(255, 105, 155, 0.8)',
                                'rgba(255, 105, 105, 0.8)',
                                'rgba(255, 105, 55, 0.8)',

                                'rgba(255, 55, 255, 0.8)',
                                'rgba(255, 55, 205, 0.8)',
                                'rgba(255, 55, 155, 0.8)',
                                'rgba(255, 55, 105, 0.8)',
                                'rgba(255, 55, 55, 0.8)',

                                'rgba(205, 255, 255, 0.8)',
                                'rgba(205, 255, 205, 0.8)',
                                'rgba(205, 255, 155, 0.8)',
                                'rgba(205, 255, 105, 0.8)',
                                'rgba(205, 255, 55, 0.8)',

                                'rgba(205, 205, 255, 0.8)',
                                'rgba(205, 205, 205, 0.8)',
                                'rgba(205, 205, 155, 0.8)',
                                'rgba(205, 205, 105, 0.8)',
                                'rgba(205, 205, 55, 0.8)',

                                'rgba(205, 155, 255, 0.8)',
                                'rgba(205, 155, 205, 0.8)',
                                'rgba(205, 155, 155, 0.8)',
                                'rgba(205, 155, 105, 0.8)',
                                'rgba(205, 155, 55, 0.8)',

                                'rgba(205, 105, 255, 0.8)',
                                'rgba(205, 105, 205, 0.8)',
                                'rgba(205, 105, 155, 0.8)',
                                'rgba(205, 105, 105, 0.8)',
                                'rgba(205, 105, 55, 0.8)',
                            ],
                        }
                    ],
                });
                setHaveData(true)
            }

        }).catch(error => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Məktəblər üzrə statistika'
                    filter={false}
                />
                <SgPageBody>
                    {haveData ? <Bar options={options} data={chartData} /> : ''}
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