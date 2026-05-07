import SgPageError from "@/components/pages/ErrorPage";
import MainLayout from "@/admin/components/layouts/MainLayout";

export default function Index() {
    return (
        <>
            <SgPageError
                header='Server Xətası'
                mainHeader='500'
                description={`Üzr istəyirik, xəta baş verdi. <Link href='/'>Əsas səhifəyə</Link> geri dönün.`}
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