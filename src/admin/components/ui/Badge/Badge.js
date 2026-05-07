/**
 * @names ### "SG-BADGE" Component;
 * @project adminpanel-nextjs
 * @repository https://github.com/alimahmudlu/adminpanel-nextjs
 * @lead Ali Mahmudlu <alimahmudlu@gmail.com>
 * @author Ali Mahmudlu <alimahmudlu@gmail.com>
 *
 * @param {object} props.
 * @property {string} icon.
 * @property {string} header.
 * @property {function | null} onClick.
 *
 * @description import { SgBadge } from "@/admin/components/ui/Budge";
 * @description <SgBadge
 *                  onClick={() => removeFilter('categories[]', item)}
 *                  header={item}
 *                  icon='times'
 *              />
 */

// STYLESHEET
import styles from '@/admin/components/ui/Badge/Badge.module.scss'

export default function SgBadge(props){
    const {icon, dot, header, onClick} = props

    const getBadgeIcon = () => {
        return icon ? `sg-${icon}` : ''
    }

    return (
        <>
            <div onClick={onClick} className={[styles['sg--badge'] , getBadgeIcon(), icon ? styles['sg--badge--icon'] : '', dot ? styles['sg--badge--dot'] : ''].join(' ').trim()}>
                {header}
            </div>
        </>
    )
}