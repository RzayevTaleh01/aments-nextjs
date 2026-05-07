import {MainLayout} from "@/admin/components/layouts";
import {useRouter} from "next/router";
import {
    EDIT_SCHOOL_SURVEY_ROUTE, GET_SCHOOL_SURVEY_QUESTION_BY_ID_ROUTE,
    GET_SCHOOL_SURVEY_ROUTE, POST_SCHOOL_SURVEY_QUESTION_BY_ID_ROUTE
} from "@/admin/configs/apiRoutes";
import QuestionsForm from "@/admin/components/templates/QuestionsForm";


export default function Index() {
    const router = useRouter();
    const { query: {survey_id} } = router;

    return (
        <>
            <QuestionsForm
                router={router}
                submitUrl={`${POST_SCHOOL_SURVEY_QUESTION_BY_ID_ROUTE}/${survey_id}/questions`}
                getUrl={`${GET_SCHOOL_SURVEY_QUESTION_BY_ID_ROUTE}/${survey_id}/questions`}
                redirectUrl={`/content/idareedici/schools-survey`}
                method={'POST'}
            />
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout
                permission='schoolsSurvey'
            >
                {page}
            </MainLayout>
        </>
    )
}