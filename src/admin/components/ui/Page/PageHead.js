import styles from '@/admin/components/ui/Page/Page.module.scss'

export default function SgPageHead(props) {
    const {children, className, header, description, color, filter, variant, size, direction} = props;

    const getPageVariant = () => {
        switch (variant) {
            case 'center':
                return styles['pages--block-head--center']
            default:
                return ''
        }
    }

    const getPageDirection = () => {
        switch (direction) {
            case 'row':
                return styles['pages--block-head--row']

            case 'column':
                return styles['pages--block-head--column']

            default:
                return ''

        }
    }

    const getPageSize = () => {
        switch (size) {
            case 'extraSmall':
                return styles['pages--block--extraSmall']

            case 'small':
                return styles['pages--block--small']

            default:
                return ''

        }
    }

    const getSectionColor = () => {
        switch (color) {
            case 'main':
                return styles['pages--block-head--header--main']

            default:
                return ''
        }
    }

    return (
        <>
            <div className={[styles["pages--block-head"], className, getPageVariant(), getPageSize(), getPageDirection()].join(' ').trim()}>
                <div className={styles['pages--block-head-group']}>
                    <h3 className={[styles["pages--block-head--header"], getSectionColor()].join(' ').trim()}>
                        {header}
                    </h3>
                    {description ?
                        <p className={styles["pages--block-head--description"]} dangerouslySetInnerHTML={{__html: description}}/>
                        : ''
                    }
                </div>
                {filter ?
                    <div className={styles["pages--block-head-filter"]}>
                        {children}
                    </div>
                    : ''
                }
            </div>
        </>
    )
}