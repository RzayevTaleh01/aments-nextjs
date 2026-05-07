import {MainLayout} from "@/admin/components/layouts";
import DashboardItem from "@/admin/components/ui/DashboardItem";
import {sidebarPrimaryMenu} from "@/admin/configs/sidebarMenu";
import {hasPermission} from "@/utils/permissions";
import {useSession} from "next-auth/react";

export default function Index() {
    const {data: session} = useSession();

    return (
        <>
            <div className='row gap-y-[16px]'>
                {(sidebarPrimaryMenu || []).filter(el => el.dashboard && !(el?.permission && !hasPermission(session?.permissions, el?.permission))).map((item, index) =>
                    <div key={index} className='col-lg-4'>
                        <DashboardItem
                            header={item?.name}
                            description={item?.description}
                            path={item?.external ? item?.path : `/content/idareedici${item.path}`}
                            list={(item?.children || []).filter(el => !(el?.permission && !hasPermission(session?.permissions, el?.permission))).map((el, i) => (
                                {
                                    name: el?.name,
                                    path: el?.external ? el?.path : `/content/idareedici${el.path}`,
                                    key: i
                                }
                            ))}
                            length={0}
                        />
                    </div>
                )}
            </div>
        </>
    )
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