import styles from '@/admin/components/templates/Sidebar/Sidebar.module.scss';
import Link from "next/link";
import {sidebarPrimaryMenu, sidebarSecondaryMenu} from "@/admin/configs/sidebarMenu";
import SgSideBarMenuItem from "@/admin/components/templates/Sidebar/SideBarMenuItem";
import Image from "next/image";
import Logo from "@/assets/images/logo2_w.svg";

export default function SgTemplateSidebar(props) {
    const { isOpen } = props;

    return (
        <>
            <div className={[styles['sg--template--sidebar'], isOpen ? styles['sg--template--sidebar--open'] : ''].join(' ').trim()}>
                <div className={[styles['sg--template--sidebar-head']].join(' ').trim()}>
                    <Link href='/content/idareedici' className={[styles['sg--template--sidebar-head-logo']].join(' ').trim()}>
                        <Image width='1000' height='1000'
                               className={[styles['sg--template--sidebar-head-logo--realImage']].join(' ').trim()}
                               src={Logo}
                               alt={'Rəqəmsal məktəb yazılı loqo şəkli'}
                        />
                        {/*<div className={[styles['sg--template--sidebar-head-logo--image']].join(' ').trim()}>*/}
                        {/*    SG*/}
                        {/*</div>*/}
                        {/*<div className={[styles['sg--template--sidebar-head-logo--header']].join(' ').trim()}>*/}
                        {/*    AdminPanel*/}
                        {/*</div>*/}
                    </Link>
                    {/*<div onClick={handleToggleSidebar}
                         className={[styles['sg--template--sidebar-head--toggle']].join(' ').trim()}
                    >
                        <SgIcon icon='menu-2' />
                    </div>*/}
                </div>
                <div className={[styles['sg--template--sidebar-body']].join(' ').trim()}>
                    <div className={[styles['sg--template--sidebar-body-menu']].join(' ').trim()}>
                        {(sidebarPrimaryMenu || []).map((item, index) =>
                            <SgSideBarMenuItem
                                isOpen={isOpen}
                                key={index}
                                item={{...item, path: item?.external ? item.path : `/content/idareedici${item.path}`}}
                                index={index}
                            />
                        )}
                    </div>
                    <div className={[styles['sg--template--sidebar-body-menu'], 'mt-auto'].join(' ').trim()}>
                        {(sidebarSecondaryMenu || []).map((item, index) =>
                            <SgSideBarMenuItem
                                key={index}
                                item={{...item, path: `/content/idareedici${item.path}`}}
                                index={index}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}