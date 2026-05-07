import { SgTemplateSidebar } from "@/admin/components/templates/Sidebar";
import { SgTemplateHeader } from "@/admin/components/templates/Header";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useState} from "react";
import styles from "@/admin/components/layouts/MainLayout/MainLayout.module.scss";
import {usePermissions} from "@/hooks/usePermissions";
import SgLoading from "@/components/ui/Loading";


export default function MainLayout(props) {
    const { children, permission } = props;
    const { data: session, status } = useSession();
    const [sidebar, setSidebar] = useState(true)
    const router = useRouter();
    const REQUEST_NEXT_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_NEXT_ADMIN_BASE_URL;
    const { hasPermission } = usePermissions();

    function handleToggleSidebar() {
        setSidebar(!sidebar)
    }

    if (status === "loading") {
        return (
            <>
                <SgLoading />
            </>
        )
    }
    else if (status !== "authenticated") {
        router.push('/content/idareedici/sign-in')
    }
    else {
        if (session?.user?.type?.name !== 'admin' && !session?.adminToken?.accessToken) {
            signOut({
                redirect: false,
                callbackUrl: `${REQUEST_NEXT_ADMIN_BASE_URL}/content/idareedici/sign-in`
            }).then(async () => {
                await router.push('/content/idareedici/sign-in')
            })
            return null;
        }
        if ((session?.user?.type?.name === 'admin' && !session?.adminToken?.accessToken) && permission && !hasPermission(session?.permissions, permission)) {

            router.push("/content/idareedici/errors/403");
            return null;
        }
        return (
            <>
                <div className={[styles['sg--layouts--main']].join(' ').trim()}>
                    <SgTemplateSidebar
                        user={{}}
                        menu={[]}
                        isOpen={sidebar}
                        handleToggleSidebar={handleToggleSidebar}
                    />
                    <div className={[styles['sg--layouts--main-container']].join(' ').trim()}>
                        <SgTemplateHeader
                            handleToggleSidebar={handleToggleSidebar}
                            layout='main'
                        />
                        <div className={[styles['sg--layouts--main-container-content']].join(' ').trim()}>
                            {children}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}