"use client";

import styles from '@/admin/components/templates/Header/Header.module.scss';
import Link from "next/link";
import {SgTemplateUserDropdown} from "@/admin/components/templates/UserDropdown";
import { SgButton } from "@/admin/components/ui/Button";
import {useSession,signOut} from "next-auth/react";
import { FaArrowLeft, FaBars } from "react-icons/fa";
const REQUEST_NEXT_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_NEXT_ADMIN_BASE_URL;

export default function SgTemplateHeader(props) {
    const { layout, handleToggleSidebar } = props;
    const { data: session } = useSession();

    return (
        <>
            <div className={styles['sg--template--header']}>
                {layout !== 'workspace' ?
                    <div className={styles['sg--template--header-toggle']} onClick={handleToggleSidebar}>
                        <FaBars />
                    </div>
                    :
                    <Link href='/' className={[styles['sg--template--header-logo']].join(' ').trim()}>
                        <div className={[styles['sg--template--header-logo--image']].join(' ').trim()}>
                            SG
                        </div>
                        <div className={[styles['sg--template--header-logo--header']].join(' ').trim()}>
                            AdminPanel
                        </div>
                    </Link>
                }
                <div className={styles['sg--template--header-actions']}>
                    <SgButton type='link' to='/' color='secondary-outline' size='sm' icon={FaArrowLeft}>
                        Sayta qayıt
                    </SgButton>
                    <SgTemplateUserDropdown
                        user={{
                            id: session?.user?.id,
                            name: session?.user?.name,
                            surname: session?.user?.surname,
                            email: session?.user?.email,
                            avatar: null
                        }}
                    />
                </div>
            </div>
        </>
    )
}
