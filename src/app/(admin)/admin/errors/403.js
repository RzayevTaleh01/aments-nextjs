import SgPageError from "@/components/pages/ErrorPage";
import MainLayout from "@/admin/components/layouts/MainLayout";

export default function Index() {
    return (
        <>
            <SgPageError
                header='Qadağan olunmuş səhifə'
                mainHeader='403'
                description={`Üzr istəyirik, bu səhifəyə giriş icazəniz mövcud deyil. <Link href='/content/idareedici/'>Əsas səhifəyə</Link> geri dönün.`}
            />
        </>
    );
}


Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout>
                {page}
            </MainLayout>
        </>
    )
}