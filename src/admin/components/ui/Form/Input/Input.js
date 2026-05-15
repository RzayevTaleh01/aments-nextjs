import makeID from "@/admin/utils/makeID";
import {useMemo, useRef, useState} from "react";
import ReactDatetimeClass from "react-datetime";
import moment from "moment";
import styles from "@/admin/components/ui/Form/Form.module.css"
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

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
    const emitChange = (nextValue) => {
        if (disabled || readonly || loading) return;
        (onChange)?.({
            target: {
                id: id,
                name: name,
                value: nextValue,
                validity: {},
                dataset: {
                    key: data_key,
                    id: data_id,
                    extraarraykey: data_extraarraykey,
                    extraarrayvalue: data_extraarrayvalue
                },
            }
        })
    }

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

    const selectOptions = useMemo(() => {
        return (options || []).map((opt) => {
            const optValue = opt?.id ?? opt?.value ?? "";
            const optLabel = opt?.name ?? opt?.label ?? String(optValue);
            return { value: optValue, label: optLabel };
        });
    }, [options]);

    const selectValue = useMemo(() => {
        if (multiple) {
            const arr = (value || value === 0) ? (Array.isArray(value) ? value : [value]) : [];
            const wanted = new Set(arr.map((x) => String(x)));
            return selectOptions.filter((o) => wanted.has(String(o.value)));
        }
        if (value || value === 0) {
            return selectOptions.find((o) => String(o.value) === String(value)) || null;
        }
        return null;
    }, [multiple, value, selectOptions]);

    const reactSelectStyles = useMemo(() => {
        const brandRed = "#ea1c26";
        const brandRedSoft = "rgba(234, 28, 38, 0.12)";
        return {
            container: (base) => ({ ...base, width: "100%" }),
            control: (base) => ({
                ...base,
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                minHeight: 44,
            }),
            valueContainer: (base) => ({ ...base, padding: 0 }),
            input: (base) => ({ ...base, margin: 0, padding: 0 }),
            placeholder: (base) => ({ ...base, margin: 0, color: "#B1B1B1" }),
            option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? brandRed : state.isFocused ? brandRedSoft : base.backgroundColor,
                color: state.isSelected ? "#fff" : base.color,
            }),
            multiValue: (base) => ({ ...base, backgroundColor: brandRedSoft }),
            multiValueLabel: (base) => ({ ...base, color: brandRed }),
            multiValueRemove: (base) => ({
                ...base,
                color: brandRed,
                ":hover": { backgroundColor: brandRed, color: "#fff" },
            }),
            indicatorsContainer: (base) => ({ ...base, height: 44 }),
            dropdownIndicator: (base) => ({ ...base, padding: 0 }),
            clearIndicator: (base) => ({ ...base, padding: 0 }),
            indicatorSeparator: () => ({ display: "none" }),
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        };
    }, []);

    const reactSelectTheme = useMemo(() => {
        const brandRed = "#ea1c26";
        const brandRedSoft = "rgba(234, 28, 38, 0.12)";
        return (theme) => ({
            ...theme,
            colors: {
                ...theme.colors,
                primary: brandRed,
                primary25: brandRedSoft,
                primary50: brandRedSoft,
            },
        });
    }, []);

    const renderSelect = (
        <Select
            inputId={id}
            instanceId={id}
            name={name}
            isMulti={multiple}
            isSearchable={Boolean(searchAble)}
            isDisabled={Boolean(disabled || readonly || loading)}
            options={selectOptions}
            value={selectValue}
            placeholder={placeholder || label || "Seçin"}
            onChange={(next) => {
                if (multiple) {
                    const arr = Array.isArray(next) ? next.map((o) => o.value) : [];
                    emitChange(arr);
                } else {
                    emitChange(next ? next.value : "");
                }
            }}
            styles={reactSelectStyles}
            theme={reactSelectTheme}
            menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        />
    )

    const creatableSelectedOptions = String(value || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
        .map((code) => ({ value: code, label: code }));

    const renderCreatableSelect = (
        <CreatableSelect
            inputId={id}
            instanceId={id}
            name={name}
            isMulti={true}
            options={creatableSelectedOptions}
            isDisabled={Boolean(disabled || readonly || loading)}
            value={creatableSelectedOptions}
            placeholder={placeholder || label || "Kod yazın"}
            onChange={(next) => {
                const arr = Array.isArray(next) ? next.map((o) => String(o?.value || "").trim()).filter(Boolean) : [];
                emitChange(arr.join(", "));
            }}
            styles={reactSelectStyles}
            theme={reactSelectTheme}
            menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        />
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

            case ('creatable-select'):
                return renderCreatableSelect

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
