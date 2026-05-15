import makeID from "@/admin/utils/makeID";
import {useEffect, useMemo, useRef, useState} from "react";
import ReactDatetimeClass from "react-datetime";
import moment from "moment";
import styles from "@/admin/components/ui/Form/Form.module.css"

import dynamic from "next/dynamic";
import {
    FILE_UPLOAD_ROUTE,
    GET_FILE_ROUTE
} from "@/admin/configs/apiRoutes";
import {useSession} from "next-auth/react";
import {getBase64} from "@/admin/utils/getBase64";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


export default function SgInput(props) {
    const {
        options = [],
        maxDate,
        minDate,
        data_id,
        counter,
        data_key,
        color,
        dateFormat = 'DD-MM-YYYY',
        timeFormat = 'HH:mm',
        data_extrakey,
        data_extraarraykey,
        data_extraarrayvalue,
        labelHidden,
        inline,
        multiple = false,
        searchAble = false,
        type,
        required,
        name,
        id = makeID(7),
        disabled,
        readonly,
        className,
        wrapperClassName,
        placeholder = '',
        size,
        label,
        variant,
        selectVariant,
        value,
        isInvalid,
        invalidMessage,
        loading,
        onChange = () => {},
        onKeyup = () => {},
        suffix,
        suffixType = 'icon',
        prefix,
        prefixType = 'icon',
        floating = false,
        children,
        step,
        min,
        max,
        ...rest
    } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [selected, setSelected] = useState(variant === 'select' ? (value || []) : []);
    const [filter, setFilter] = useState("");
    const [opened, setOpened] = useState(false);
    const [onFocus, setOnFocus] = useState(false);
    const editor = useRef(null);
    const REQUEST_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL;
    const REQUEST_STORAGE_URL = process.env.NEXT_PUBLIC_REQUEST_STORAGE_URL;
    const REQUEST_TOKEN_TYPE = process.env.NEXT_PUBLIC_REQUEST_TOKEN_TYPE;
    const REQUEST_HEADER_AUTH_KEY = process.env.NEXT_PUBLIC_REQUEST_HEADER_AUTH_KEY;
    const {data: session} = useSession();
    const config = useMemo(
        () => ({
            readonly: false,
            license: "",
            enter: "br",
            uploader: {
                url: `${REQUEST_BASE_URL}${FILE_UPLOAD_ROUTE}`,
                headers: {
                    [REQUEST_HEADER_AUTH_KEY]: `${REQUEST_TOKEN_TYPE} ${session?.token?.accessToken}`
                },
                queryBuild: function (data) {
                    return JSON.stringify(data);
                },
                contentType: function () {
                    return 'application/json';
                },
                buildData: function (data) {
                    return new Promise(function (resolve) {
                        for (const file of data.getAll('files[0]')) {
                            getBase64(file, (result64) => {
                                const exts = file.name.split('.');
                                const ext = exts[exts.length - 1];
                                const fname = exts.join('.').trim();

                                resolve({
                                    extension: ext,
                                    fileName: fname,
                                    base64: result64.result
                                })
                            });
                        }
                    });
                },
                data: {

                },
                isSuccess: function (resp) {
                    return !resp.error;
                },
                getMessage: function (resp) {
                    return resp.msg;
                },
                process: function (resp) {
                    return resp;
                },
                defaultHandlerSuccess: function (data) {
                    this.s.insertImage(`${REQUEST_STORAGE_URL}${GET_FILE_ROUTE}/${data?.data?.token}`);
                },
                error: function (e) {
                    this.message.message(e.getMessage(), 'error', 4000);
                }
            }
        }),
        []
    );

    const getSuffixType = () => {
        switch (suffixType) {
            case 'icon':
                return styles['input-suffix--icon']

            case 'text':
                return styles['input-suffix--text']

            default:
                return styles['input-suffix--icon']
        }
    }

    const getPrefixType = () => {
        switch (prefixType) {
            case 'icon':
                return styles['input-suffix--icon']

            case 'text':
                return styles['input-suffix--text']

            default:
                return styles['input-suffix--icon']
        }
    }

    const getSize = () => {
        switch (size) {
            case 'big':
                return styles['input--big']

            case 'small':
                return styles['input--small']

            case 'extraSmall':
                return styles['input--extraSmall']

            default:
                return ''
        }
    }

    const getColor = () => {
        switch (color) {
            case 'light':
                return styles['input--light']

            default:
                return ''
        }
    }

    const getSelectVariant = () => {
        switch (selectVariant) {
            case 'checkbox':
                return styles['select--checkbox']

            default:
                return ''
        }
    }

    const getInputType = () => {
        let returnType = ''
        switch (type) {
            case 'password':
                switch (showPassword) {
                    case true:
                        returnType = 'text'
                        break

                    case false:
                        returnType = 'password'
                        break
                }
                break

            default:
                returnType = type
                break
        }

        return returnType
    }

    const handleChange = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        (onChange)?.(e)
    }

    const handleChangeDate = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        (onChange)?.(
            {
                target: {
                    id: id,
                    name: name,
                    // value: moment(e['_d']).format([['date', 'date-time'].includes(type) ? dateFormat : '', ['time', 'date-time'].includes(type) ? timeFormat : ''].join(' ').trim()),
                    value: moment(e['_d']).format(),
                    validity: {},
                    dataset: {
                        key: data_key,
                        id: data_id,
                        extraarraykey: data_extraarraykey,
                        extraarrayvalue: data_extraarrayvalue
                    },
                }
            }
        )
    }

    const handleKeyup = (e) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
            return
        }
        (onKeyup)?.(e)
    }

    const toggleOption = (e, option) => {
        if (disabled || readonly || loading) {
            e.preventDefault()
        }
        else {
            if (option.id) {
                if (multiple) {
                    if (selected.includes(option.id)) {
                        // setSelected(selected.filter((item) => item !== option));
                        (onChange)?.(
                            {
                                target: {
                                    id: id,
                                    name: name,
                                    value: selected.filter((item) => item !== option.id),
                                    validity: {},
                                    dataset: {
                                        key: data_key,
                                        id: data_id,
                                        extraarraykey: data_extraarraykey,
                                        extraarrayvalue: data_extraarrayvalue
                                    },
                                }
                            }
                        )
                    }
                    else {
                        // setSelected([...selected, option]);
                        (onChange)?.(
                            {
                                target: {
                                    id: id,
                                    name: name,
                                    value: [...selected, option.id],
                                    validity: {},
                                    dataset: {
                                        key: data_key,
                                        id: data_id,
                                        extraarraykey: data_extraarraykey,
                                        extraarrayvalue: data_extraarrayvalue
                                    },
                                }
                            }
                        )
                    }
                }
                else {
                    // setSelected([option]);
                    (onChange)?.(
                        {
                            target: {
                                id: id,
                                name: name,
                                value: option.id,
                                validity: {},
                                dataset: {
                                    key: data_key,
                                    id: data_id,
                                    extraarraykey: data_extraarraykey,
                                    extraarrayvalue: data_extraarrayvalue
                                },
                            }
                        }
                    )
                    toggleOpen()
                }
            }
            else if (option.id === 0) {
                (onChange)?.(
                    {
                        target: {
                            id: id,
                            name: name,
                            value: option.id.toString(),
                            validity: {},
                            dataset: {
                                key: data_key,
                                id: data_id,
                                extraarraykey: data_extraarraykey,
                                extraarrayvalue: data_extraarrayvalue
                            },
                        }
                    }
                )
                toggleOpen()
            }
            else {
                (onChange)?.(
                    {
                        target: {
                            id: id,
                            name: name,
                            value: option.id,
                            validity: {},
                            dataset: {
                                key: data_key,
                                id: data_id,
                                extraarraykey: data_extraarraykey,
                                extraarrayvalue: data_extraarrayvalue
                            },
                        }
                    }
                )
                toggleOpen()
            }
        }
    };

    const toggleOpen = () => {
        setOpened((disabled || readonly || loading) ? false : !opened)
    }

    const selectRef = useRef(null)

    const closeOpenMenus = (e)=>{
        if(opened && !selectRef.current?.contains(e.target)){
            setOpened(false)
        }
    }

    if (typeof window !== "undefined") {
        window.addEventListener('mousedown',closeOpenMenus)
    }

    const filterLower = String(filter || '').toLowerCase();
    const filteredOptions = (options || []).filter((a) =>
        String(a?.name ?? '').toLowerCase().startsWith(filterLower)
    );

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const validDate = (current) => {
        let min = minDate ? current.isAfter(minDate) : true
        let max = maxDate ? current.isBefore(maxDate) : true
        return min && max
    }

    const renderEditor = (
        <div className='w-100'>
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                tabIndex={1}
                onBlur={(editorContent) =>
                {
                    handleChange(
                        {
                            target: {
                                id: id,
                                name: name,
                                value: `${editorContent}`,
                                validity: {},
                                dataset: {
                                    key: data_key,
                                    id: data_id,
                                    extraarraykey: data_extraarraykey,
                                    extraarrayvalue: data_extraarrayvalue
                                },
                            }
                        }
                    )
                }
                }
                className=""
            />
        </div>
    )

    const renderSelect = (
        <div ref={selectRef} onClick={toggleOpen} className={[styles["select"], getSelectVariant(), disabled && styles['disabled'], readonly && styles['read-only']].join(' ').trim()}>
            <div className="filter-option">
                <div className="filter-option-inner">
                    <div className="filter-option-inner-inner">
                        {selected.length ? (selected.length === 1 ? filteredOptions.find(el => el.id === selected[0])?.name : `${selected.length} ${placeholder} seçildi`) : (placeholder ? placeholder : (label ? label : 'Seçin'))}
                    </div>
                </div>
            </div>
            {(opened && (!disabled || !readonly)) && (
                <div className={[styles['dropdown-menu'], styles['show'], "dropdown-menu show"].join(' ').trim()}
                     onClick={(e) => e.stopPropagation()}
                >
                    {searchAble && <div className="bs-searchbox">
                        <input
                            onChange={(e) => setFilter(e.target.value)}
                            value={filter}
                            className='form-control'
                            type="text"
                            placeholder="Axtar..."
                            style={{paddingTop: 0, paddingBottom: 0}}
                        />
                    </div>}
                    <div className={[styles["inner"], styles["show"], "inner show"].join(' ').trim()}>
                        <ul className={[styles['dropdown-menu'], styles['inner'], styles['show'], 'dropdown-menu inner show'].join(' ').trim()}>
                            {filteredOptions.length ? (
                                    <>
                                        <li
                                            className={selected.includes('') ? styles["selected"] : ""}
                                            onClick={(e) => toggleOption(e, {id: '', value: '', name: 'Seçin'})}
                                        >
                                            <a
                                                className={[styles["dropdown-item"], "dropdown-item", selected.includes('') ? styles["selected"] : ""].join(' ').trim()}>
                                                <span>Seçin</span>
                                            </a>
                                        </li>
                                        {filteredOptions.map((option, index) => (
                                            <li
                                                className={selected.includes(option) ? styles["selected"] : ""}
                                                onClick={(e) => toggleOption(e, option)}
                                                key={index}
                                            >
                                                <a
                                                    className={[styles["dropdown-item"], "dropdown-item", (selected.includes(option.id) || selected.includes(Number(option.id))) ? styles["selected"] : ""].join(' ').trim()}>
                                                    <span>{option.name}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </>

                            ) : (
                                <li>
                                    <span className={[styles["dropdown-item"], "dropdown-item"].join(' ').trim()}>
                                        Nəticə yoxdur.
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )

    const renderDateInput = (
        <ReactDatetimeClass
            onChange={handleChangeDate}
            dateFormat={['date', 'date-time'].includes(type) ? dateFormat : false}
            timeFormat={['time', 'date-time'].includes(type) ? timeFormat : false}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            onKeyUp={handleKeyup}
            timeConstraints={{ minutes: { step: 15 }}}
            inputProps={{
                disabled: disabled,
                readOnly: readonly,
                id: id,
                name: name,
                className: [styles["input"], getSize()].join(" ").trim(),
                placeholder: floating ? "" : placeholder,
                onFocus: () => setOnFocus(true),
                onBlur: () => setOnFocus(false)
            }}
            value={(() => {
                if (!value && value !== 0) return '';
                const m = moment(value);
                return m.isValid() ? m : '';
            })()}
            type={getInputType()}
            isValidDate={validDate}
        />
    )

    const renderInput = (
        <input maxLength={counter} data-id={data_id} data-extraarraykey={data_extraarraykey} data-extraarrayvalue={data_extraarrayvalue} data-key={data_key} data-extrakey={data_extrakey} onBlur={() => setOnFocus(false)} onFocus={() => setOnFocus(true)} onChange={handleChange} onKeyUp={handleKeyup} disabled={disabled} readOnly={readonly} id={id} name={name} className={[styles["input"]].join(' ').trim()} placeholder={floating ? "" : placeholder} value={value} type={getInputType()} step={step} min={min} max={max}/>
    )

    const renderTextarea = (
        <textarea maxLength={counter} data-id={data_id} data-extraarraykey={data_extraarraykey} data-extraarrayvalue={data_extraarrayvalue} data-key={data_key} onChange={handleChange} onKeyUp={handleKeyup} disabled={disabled} readOnly={readonly} id={id} name={name} className={[styles["input"]].join(' ').trim()} placeholder={floating ? "" : placeholder} value={value} type={getInputType()}/>
    )

    const getInputVariant = () => {
        switch (variant) {
            case ('textarea'):
                return renderTextarea

            case ('input'):
                return renderInput

            case ('select'):
                return renderSelect

            case "date":
                return renderDateInput;

            case "editor":
                return renderEditor;
                // return renderTextarea

            default:
                return renderInput
        }
    }

    const floatingInput = (
        <>
            {getInputVariant()}
        </>
    )

    const renderAffixInput = (
        <div className={[styles['input-wrapper'], variant === 'editor' ? styles['input-wrapper--editor'] : '', onFocus ? styles['input-wrapper--focus'] : '', wrapperClassName, disabled && styles['disabled'], readonly && styles['read-only']].join(' ').trim()} {...rest}>
            {prefix ? <div className={[styles['input-suffix'], styles['input-suffix-start'], getPrefixType()].join(' ').trim()}>{prefix}</div> : null}
            {floatingInput}
            {suffix ? <div className={[styles['input-suffix'], styles['input-suffix-end'], getSuffixType()].join(' ').trim()}>{suffix}</div> : null}
            {type === 'password' ? <div className={[styles["input-suffix"], styles["input-suffix-end"], styles["input-suffix--icon"]].join(' ').trim()}>
                <span onClick={handleTogglePassword}>
                    {!showPassword ?
                        <i className="sg-admin-icon sg-admin-icon-eye"></i>
                        :
                        <i className="sg-admin-icon sg-admin-icon-eye-off"></i>
                    }
                </span>
            </div> : ''}
        </div>
    )

    const renderInvalid = (
        (isInvalid && invalidMessage) ?
            <div className={styles["invalid"]} id={`${id}-error`} dangerouslySetInnerHTML={{ __html: invalidMessage }} />
            : ''
    )

    const renderChildren = () => {
        return renderAffixInput
    }

    useEffect(() => {
        if (variant === 'select' && options.length > 0) {
            const arrayValue = (value || value === 0) ? (typeof value !== 'object' ? [value] : value) : [];

            setSelected(variant === 'select' ? (options.filter(el => arrayValue.includes(el.id) || arrayValue.includes(el.id.toString())).map(el => el.id) || []) : [])
        }
    }, [value, options]);

    return (
        <>
            <div className={[styles['input-container'], getSize(), getColor(), inline && styles['input--inline'], isInvalid && styles['input--error']].join(' ').trim()}>
                {!floating && !labelHidden && <label htmlFor={id} className={[styles["label"], counter ? styles['label--flex'] : '', !label && 'opacity-0'].join(' ').trim()}>{label || id} {counter ? <span className={styles['label--counter']}>{value.length}/{counter}</span> : ''}</label>}
                {renderChildren()}
                {renderInvalid}
            </div>
        </>
    )
}
