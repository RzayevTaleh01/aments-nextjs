import styles from "@/admin/components/templates/UserDropdown/UserDropdown.module.scss";
import SgIcon from "@/admin/components/ui/Icon";
import Link from "next/link";
import {SgDropdown} from "@/admin/components/ui/Dropdown";

export default function SgTemplateUserDropdown(props) {
    const { user = {}, signOut } = props;
    const { id, name, surname, avatar, email } = user;

    return (
        <>
            <SgDropdown
                className='ms-auto'
                toggleHeader={
                    <div className={styles['sg--template--userDropdown-user']}>
                        <div className={styles['sg--template--userDropdown-user-avatar']}>
                            {avatar ?
                                ''
                                :
                                <SgIcon icon='user' />
                            }
                        </div>
                        <div className={styles['sg--template--userDropdown-user-content']}>
                            <div className={styles['sg--template--userDropdown-user-content--name']}>
                                {name} {surname}
                            </div>
                            <div className={styles['sg--template--userDropdown-user-content--email']}>
                                {email}
                            </div>
                        </div>
                    </div>
                }
                menuClassName={['p-0', styles['sg--template--userDropdown-maimMenu-catalogue-menu']].join(' ').trim()}
                list={[
                    // {
                    //     name: <Link href={`/settings/user/${id}`}>Admin</Link>
                    // },
                    // {
                    //     type: 'divider'
                    // },
                    {
                        name: <div className='d-flex gap-2 align-items-center'><SgIcon icon='log-out' /><span>Çıxış</span></div>,
                        onClick: signOut
                    },
                ]}
            />
        </>
    )
}