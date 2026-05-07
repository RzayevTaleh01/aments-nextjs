import styles from '@/admin/components/ui/Button/Button.module.scss';
import Link from "next/link";

export default function SgButton (props) {
    const {children, size, color, variant, block, align, icon, onlyIcon, reverse, squared, withOutBlock, className, disabled, loading, close, active, onClick, padding, weight, decoration, type = 'button', isLinked = false, to = '#', ...rest} = props;

    const getButtonSize = () => {
        switch (size) {
            case 'xs':
                return styles['sg--button--xs']

            case 'sm':
                return styles['sg--button--sm']

            case 'md':
                return styles['sg--button--md']

            case 'lg':
                return styles['sg--button--lg']

            case 'xl':
                return styles['sg--button--xl']

            case '2xl':
                return styles['sg--button--2xl']

            default:
                return styles['sg--button--lg']
        }
    }

    const getButtonVariant = () => {
        switch (variant) {
            case 'rounded':
                return styles['sg--button--rounded']

            case 'sharp':
                return styles['sg--button--sharp']

            default:
                return ''
        }
    }

    const getButtonColor = () => {
        switch (color) {
            case 'primary':
                return styles['sg--button--primary']

            case 'primary-outline':
                return styles['sg--button--primary-outline']

            case 'secondary':
                return styles['sg--button--secondary']

            case 'secondary-outline':
                return styles['sg--button--secondary-outline']

            case 'error':
                return styles['sg--button--error']

            case 'error-outline':
                return styles['sg--button--error-outline']

            default:
                return styles['sg--button--primary-outline']
        }
    }

    const getButtonAttr = () => {
        let classes = [];

        if (block) {
            if (block === true) {
                classes.push(styles['sg--button--full'])
            }
            else {
                classes.push(styles[`sg--button--full:${block}`])
            }
        }
        if (align) {
            classes.push(styles[`sg--button--align-${align}`])
        }
        if (disabled) {
            classes.push(styles['sg--button--disabled'])
        }
        if (reverse) {
            classes.push(styles['sg--button--reverse'])
        }
        if (onlyIcon) {
            classes.push(styles['sg--button--onlyIcon'])
        }
        if (withOutBlock) {
            if (withOutBlock === true) {
                classes.push(styles['sg--button--withOutBlock'])
            }
            else {
                classes.push(styles[`sg--button--withOutBlock:${withOutBlock}`])
            }
        }
        if (loading) {
            classes.push(styles['sg--button--loading'])
        }
        if (decoration === 'underline') {
            classes.push(styles['sg--button--underline'])
        }
        if (squared) {
            classes.push(styles['sg--button--squared'])
        }

        return classes.join(' ')
    }

    const getButtonIcon = () => {
        return `sg-admin-icon-${icon}`
    }

    const handleClick = (e) => {
        if (disabled || loading) {
            e.preventDefault()
            return
        }
        (onClick)?.(e)
    }

    if (type === 'link') {
        return (
            <Link href={to}
                  {...rest}
                  className={[styles['sg--button'], getButtonSize(), getButtonVariant(), getButtonColor(), getButtonAttr(), getButtonIcon(), className].join(' ').trim()}
                  onClick={handleClick}
            >
                {children}
            </Link>
        )
    }
    return (
        <button
            {...rest}
            className={[styles['sg--button'], getButtonSize(), getButtonVariant(), getButtonColor(), getButtonAttr(), getButtonIcon(), className].join(' ').trim()} type={type}
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}