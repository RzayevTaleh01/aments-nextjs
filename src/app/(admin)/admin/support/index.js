import {MainLayout} from "@/admin/components/layouts";
import DashboardItem from "@/admin/components/ui/DashboardItem";
import {supportsData} from "@/admin/configs/supports";
import {SgPage, SgPageBody, SgPageHead} from "@/admin/components/ui/Page";

export default function Index() {
    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Support'
                    description=''
                    filter={false}
                />
                <SgPageBody>
                    <div className='row gap-y-[16px]'>
                        {(supportsData || []).map((item, index) =>
                            <div key={index} className='col-lg-4'>
                                <DashboardItem
                                    header={item?.name}
                                    description={item?.description}
                                    path={`/content/idareedici/support/${item.key}`}
                                    length={0}
                                />
                            </div>
                        )}
                    </div>
                </SgPageBody>
            </SgPage>
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout
                permission='supportIndex'
            >
                {page}
            </MainLayout>
        </>
    )
}