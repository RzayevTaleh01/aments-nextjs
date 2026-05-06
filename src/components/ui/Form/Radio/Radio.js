"use client";

import { useId } from "react";
import { cn } from "@/utils/cn";

export default function Radio(props) {
  const {
    id,
    name,
    label,
    required,
    readonly,
    disabled,
    value,
    checked,
    loading,
    isInvalid,
    invalidMessage,
    className,
    onChange,
    data_key,
    ...rest
  } = props;

  const autoId = useId();
  const inputId = id ?? `${name || "radio"}-${autoId}`;

  const handleChange = (e) => {
    if (disabled || readonly || loading) {
      e.preventDefault();
      return;
    }
    onChange?.(e);
  };

  return (
    <div className={cn("form-check", className)}>
      <input
        id={inputId}
        name={name}
        className={cn("form-check-input", isInvalid && "is-invalid")}
        type="radio"
        onChange={handleChange}
        disabled={disabled || loading}
        value={value}
        readOnly={readonly}
        required={required}
        checked={checked}
        data-key={data_key}
        {...rest}
      />
      {label ? (
        <label className="form-check-label" htmlFor={inputId}>
          {label} {required ? <span>*</span> : null}
        </label>
      ) : null}
      {isInvalid ? (
        <small className="text-danger d-block">{invalidMessage ?? "Required"}</small>
      ) : null}
    </div>
  );
}
