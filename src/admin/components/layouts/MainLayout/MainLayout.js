"use client";

import { SgTemplateSidebar } from "@/admin/components/templates/Sidebar";
import { SgTemplateHeader } from "@/admin/components/templates/Header";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/admin/components/layouts/MainLayout/MainLayout.module.scss";

function hasPermission(permissions, permissionKey) {
    if (!permissionKey) return true;
    if (!permissions) return true;
    if (Array.isArray(permissions)) {
        if (permissions.includes(permissionKey)) return true;
        return permissions.some((p) => p?.name === permissionKey || p?.key === permissionKey || p?.permission === permissionKey);
    }
    if (typeof permissions === 'object') {
        return Boolean(permissions[permissionKey]);
    }
    return false;
}

function isAdminRole(user) {
    const role = user?.role ?? user?.roleId ?? user?.role_id ?? user?.user_role;
    if (role === 1 || role === "1") return true;
    if (role && typeof role === "object") {
        return role?.id === 1 || role?.value === 1 || role?.key === 1;
    }
    return false;
}


export default function MainLayout(props) {
    const { children, permission } = props;
    const { data: session, status } = useSession();
    const [sidebar, setSidebar] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const prevBodyOverflowRef = useRef(null);
    const prevIsMobileRef = useRef(null);

    function handleToggleSidebar() {
        setSidebar((v) => !v);
    }

    const loginUrl = useMemo(() => {
        const callbackUrl = encodeURIComponent(pathname || "/admin");
        return `/login?callbackUrl=${callbackUrl}`;
    }, [pathname]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia("(max-width: 992px)");
        const update = () => setIsMobile(Boolean(mql.matches));
        update();
        if (typeof mql.addEventListener === "function") {
            mql.addEventListener("change", update);
            return () => mql.removeEventListener("change", update);
        }
        mql.addListener(update);
        return () => mql.removeListener(update);
    }, []);

    useEffect(() => {
        if (prevIsMobileRef.current == null) {
            prevIsMobileRef.current = isMobile;
            if (isMobile) setSidebar(false);
            return;
        }
        const prev = prevIsMobileRef.current;
        prevIsMobileRef.current = isMobile;
        if (!prev && isMobile) setSidebar(false);
        if (prev && !isMobile) setSidebar(true);
    }, [isMobile]);

    useEffect(() => {
        if (!isMobile) return;
        setSidebar(false);
    }, [pathname, isMobile]);

    useEffect(() => {
        if (!isMobile) return;
        if (!sidebar) {
            if (prevBodyOverflowRef.current != null) {
                document.body.style.overflow = prevBodyOverflowRef.current;
                prevBodyOverflowRef.current = null;
            }
            return;
        }
        if (prevBodyOverflowRef.current == null) {
            prevBodyOverflowRef.current = document.body.style.overflow || "";
        }
        document.body.style.overflow = "hidden";
        return () => {
            if (prevBodyOverflowRef.current != null) {
                document.body.style.overflow = prevBodyOverflowRef.current;
                prevBodyOverflowRef.current = null;
            }
        };
    }, [sidebar, isMobile]);

    useEffect(() => {
        if (!isMobile || !sidebar) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") setSidebar(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [sidebar, isMobile]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace(loginUrl);
        }
    }, [status, router, loginUrl]);

    useEffect(() => {
        if (status !== "authenticated") return;
        if (isAdminRole(session?.user)) return;

        router.replace("/404");
    }, [status, session?.user, router]);

    useEffect(() => {
        if (status !== "authenticated") return;
        if (!permission) return;
        if (!session?.permissions) return;
        if (hasPermission(session?.permissions, permission)) return;

        router.replace("/404");
    }, [status, permission, session?.permissions, hasPermission, router]);

    if (status === "loading") {
        return (
            <>
            </>
        )
    }
    else if (status !== "authenticated") {
        return null;
    }
    else {
        return (
            <>
                <div className={[styles['sg--layouts--main']].join(' ').trim()}>
                    {isMobile && sidebar ? (
                        <div
                            className={styles["sg--layouts--main-backdrop"]}
                            onClick={() => setSidebar(false)}
                        />
                    ) : null}
                    <SgTemplateSidebar
                        user={{}}
                        menu={[]}
                        isOpen={sidebar}
                        handleToggleSidebar={handleToggleSidebar}
                        onNavigate={() => {
                            if (isMobile) setSidebar(false);
                        }}
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
