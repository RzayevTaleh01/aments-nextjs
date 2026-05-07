import QuestionsForm from "@/admin/components/templates/QuestionsForm";
import {useRouter} from "next/router";
import {MainLayout} from "@/admin/components/layouts";
import {CREATE_QUIZ_BY_LESSON_ID_ROUTE, GET_QUIZ_BY_LESSON_ID_ROUTE} from "@/admin/configs/apiRoutes";

export default function Index() {
    const router = useRouter();
    const {query: {topic_id, lesson_id, subject_id}} = router;
    return (
        <>
            <QuestionsForm
                router={router}
                submitUrl={`${CREATE_QUIZ_BY_LESSON_ID_ROUTE}/${lesson_id}`}
                getUrl={`${GET_QUIZ_BY_LESSON_ID_ROUTE}/${lesson_id}`}
                redirectUrl={`/content/idareedici/topics/${topic_id}/${subject_id}/lessons`}
                method={'POST'}
            />
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout
                permission='topicsLessonsQuizEdit'
            >
                {page}
            </MainLayout>
        </>
    )
}