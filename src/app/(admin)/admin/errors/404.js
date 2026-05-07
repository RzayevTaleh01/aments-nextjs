import SgPageError from "@/components/pages/ErrorPage";
import MainLayout from "@/admin/components/layouts/MainLayout";

export default function Index() {
    return (
        <>
            <SgPageError
                header='Səhifə tapılmadı'
                mainHeader='404'
                description={`Üzr istəyirik, bu səhifə mövcud deyil. <Link href='/'>Əsas səhifəyə</Link> geri dönün.`}
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