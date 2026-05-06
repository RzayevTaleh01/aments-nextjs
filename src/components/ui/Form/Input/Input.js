"use client";

import { useId } from "react";
import { cn } from "@/utils/cn";

export default function Input(props) {
  const {
    id,
    name,
    label,
    labelHidden,
    required,
    className,
    type = "text",
    variant,
    options = [],
    value,
    defaultValue,
    placeholder,
    disabled,
    readonly,
    loading,
    isInvalid,
    invalidMessage,
    onChange,
    onKeyup,
    onKeyUp,
    data_key,
    ...rest
  } = props;

  const autoId = useId();
  const inputId = id ?? `${name || "input"}-${autoId}`;

  const handleChange = (e) => {
    if (disabled || readonly || loading) {
      e.preventDefault();
      return;
    }
    onChange?.(e);
  };

  const handleKeyUp = (e) => {
    if (disabled || readonly || loading) {
      e.preventDefault();
      return;
    }
    (onKeyUp ?? onKeyup)?.(e);
  };

  const isSelect = variant === "select" || type === "select";
  const isTextarea = type === "textarea";

  return (
    <div className={cn("default-form-box", className)}>
      {label && !labelHidden ? (
        <label htmlFor={inputId}>
          {label} {required ? <span>*</span> : null}
        </label>
      ) : null}

      {isSelect ? (
        <select
          id={inputId}
          name={name}
          className="form-select"
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          disabled={disabled || loading}
          data-key={data_key}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          ) : null}
          {options.map((opt) => {
            const optionValue = opt?.value ?? opt?.id ?? "";
            const optionLabel = opt?.label ?? opt?.title ?? String(optionValue);
            return (
              <option key={String(optionValue)} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      ) : isTextarea ? (
        <textarea
          id={inputId}
          name={name}
          className="form-control"
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          disabled={disabled || loading}
          readOnly={readonly}
          required={required}
          data-key={data_key}
          {...rest}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          className="form-control"
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          disabled={disabled || loading}
          readOnly={readonly}
          required={required}
          data-key={data_key}
          {...rest}
        />
      )}

      {isInvalid ? (
        <small className="text-danger d-block mt-1">
          {invalidMessage ?? "Required"}
        </small>
      ) : null}
    </div>
  );
}

