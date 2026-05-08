import styles from "@/admin/components/templates/Sidebar/Sidebar.module.scss";
import Link from "next/link";
import {SgCollapse} from "@/admin/components/ui/Collapse";
import SgIcon from "@/admin/components/ui/Icon";
import {SgDropdown} from "@/admin/components/ui/Dropdown";
import {useSession} from "next-auth/react";
import { usePathname } from "next/navigation";

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

function resolveAdminPath(path, external) {
    if (!path) return '/admin';
    if (external || /^https?:\/\//.test(path)) return path;
    if (path.startsWith('/admin')) return path;
    if (path === '/') return '/admin';
    return `/admin${path}`;
}

export default function SgSideBarMenuItem(props) {
    const { item, isOpen } = props;
    const {data: session} = useSession();
    const pathname = usePathname();

    const normalizePath = (value) => {
        if (!value) return '';
        const path = String(value).split('?')[0].split('#')[0];
        return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
    };

    const isActivePath = (target) => {
        const current = normalizePath(pathname || '');
        const normalizedTarget = normalizePath(target || '');
        if (!current || !normalizedTarget) return false;
        if (current === normalizedTarget) return true;
        return current.startsWith(`${normalizedTarget}/`);
    };

    const resolvedPath = resolveAdminPath(item?.path, item?.external);
    const hasChildren = (item?.children || []).length > 0;
    const isActive = !item?.external && (hasChildren
        ? (item?.children || []).some((c) => isActivePath(resolveAdminPath(c?.path, c?.external)))
        : isActivePath(resolvedPath)
    );

    return (
        <>
            {!(item?.permission && !hasPermission(session?.permissions, item?.permission)) ?
                <div className={[styles['sg--template--sidebar-body-menu-item']].join(' ').trim()}>
                    {(item.children || []).length > 0 ?
                        <>
                            {!isOpen ?
                                <SgDropdown
                                    key={0}
                                    direction={'right'}
                                    className={[].join(' ').trim()}
                                    itemClassName={[].join(' ').trim()}
                                    toggleClassName={[styles['sg--template--sidebar-body-menu-item--link'], isActive ? 'active' : ''].join(' ').trim()}
                                    caret={false}
                                    toggleHeader={
                                        <>
                                            <div className={[styles['sg--template--sidebar-body-menu-item--link-icon']].join(' ').trim()}>
                                                {item.icon ? item.icon : <SgIcon icon='menu' />}
                                            </div>
                                            <div className={[styles['sg--template--sidebar-body-menu-item--link-name']].join(' ').trim()}>
                                                {item.name}
                                            </div>
                                        </>
                                    }
                                    list={(item?.children || []).map((el, i) => ({
                                        name: (
                                            <Link
                                                href={resolveAdminPath(el?.path, el?.external)}
                                                target={el?.external ? '_blank' : '_self'}
                                                key={`main__${i}`}
                                                className={[].join(' ').trim()}
                                            >
                                                {el?.name}
                                            </Link>
                                        ),
                                        disabled: false
                                    }))}
                                />
                                :
                                <SgCollapse
                                    className={styles['sg--template--sidebar-body-menu-item']}
                                    toggleClassName={[styles['sg--template--sidebar-body-menu-item--link'], isActive ? 'active' : ''].join(' ').trim()}
                                    toggleHeader={
                                        <>
                                            <div className={[styles['sg--template--sidebar-body-menu-item--link-icon']].join(' ').trim()}>
                                                {/*{item.icon ? item.icon : (item.name || '').substring(0, 2)}*/}
                                                {item.icon ? item.icon : <SgIcon icon='menu' />}
                                            </div>
                                            <div className={[styles['sg--template--sidebar-body-menu-item--link-name']].join(' ').trim()}>
                                                {item.name}
                                            </div>
                                        </>
                                    }
                                >
                                    <div className={[styles['sg--template--sidebar-body-menu-item--sub']].join(' ').trim()}>
                                        <div className={[styles['sg--template--sidebar-body-menu']].join(' ').trim()}>
                                            {(item.children || []).map((el, index) =>
                                                <SgSideBarMenuItem
                                                    key={index}
                                                    item={{...el, path: resolveAdminPath(el?.path, el?.external)}}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </SgCollapse>
                            }
                        </>
                        :
                        (!(item?.permission && !hasPermission(session?.permissions, item?.permission)) ?
                                <Link
                                    href={resolvedPath}
                                    target={item?.external ? '_blank' : '_self'}
                                    className={[styles['sg--template--sidebar-body-menu-item--link'], isActive ? 'active' : ''].join(' ').trim()}
                                >
                                    <div className={[styles['sg--template--sidebar-body-menu-item--link-icon']].join(' ').trim()}>
                                        {item.icon ? item.icon : <SgIcon icon='menu' />}
                                    </div>
                                    <div className={[styles['sg--template--sidebar-body-menu-item--link-name']].join(' ').trim()}>
                                        {item.name}
                                    </div>
                                </Link>
                                : ''
                        )
                    }
                </div>
                : ''
            }
        </>
    )
}
