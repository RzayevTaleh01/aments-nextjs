/**
 * @names "SG-LIST" Component;
 * @project video.edu.az
 * @company Edumedia LLC
 * @repository https://github.com/alimahmudlu/video.edu.az-nextjs
 * @lead Ali Mahmudlu;
 * @author Ali Mahmudlu;
 * @email alimahmudlu@gmail.com
 *
 * @props {array} list.
 *
 * @import import { SgRatio } from "@/admin/components/ui/Ratio";
 * @component  <SgRatio
 *                 ratio={ratio}
 *             >
 *                  Component
 *             </SgRatio>
 */

import styles from "@/admin/components/ui/Ratio/Ratio.module.scss";

export default function SgRatio(props) {
    const { ratio, children } = props;

    const getRatio = () => {
        return (ratio && ratio.width && ratio.height) ? ratio.height / ratio.width * 100 : 100;
    }

    return (
        <>
            <div className={styles['sg--assistant--ratio']} style={{paddingTop: `${getRatio()}%`}}>
                <div className={styles['sg--assistant--ratio-container']}>
                    {children}
                </div>
            </div>
        </>
    )
}