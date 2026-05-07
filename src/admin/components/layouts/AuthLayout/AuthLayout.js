import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import styles from "@/admin/components/layouts/AuthLayout/AuthLayout.module.scss";

export default function AuthLayout(props) {
    const { children } = props;
    const { status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return (
            <>
                LOADINGGGG
            </>
        )
    }
    else if (status === "authenticated") {
        router.push('/content/idareedici')
    }
    else {
        return (
            <>
                <div className={[styles['sg--layouts--auth']].join(' ').trim()}>
                    <div className={[styles['sg--layouts--auth-container']].join(' ').trim()}>
                        {children}
                    </div>
                </div>
            </>
        )
    }
}