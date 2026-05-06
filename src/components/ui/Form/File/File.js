"use client";

import { useId } from "react";
import { cn } from "@/utils/cn";

export default function File(props) {
  const {
    id,
    name,
    label,
    labelHidden,
    required,
    className,
    disabled,
    readonly,
    loading,
    isInvalid,
    invalidMessage,
    onChange,
    data_key,
    accepts,
    multiple,
    ...rest
  } = props;

  const autoId = useId();
  const inputId = id ?? `${name || "file"}-${autoId}`;

  const handleChange = (e) => {
    if (disabled || readonly || loading) {
      e.preventDefault();
      return;
    }
    onChange?.(e);
  };

  return (
    <div className={cn("default-form-box", className)}>
      {label && !labelHidden ? (
        <label htmlFor={inputId}>
          {label} {required ? <span>*</span> : null}
        </label>
      ) : null}

      <input
        id={inputId}
        name={name}
        type="file"
        className="form-control"
        onChange={handleChange}
        disabled={disabled || loading}
        readOnly={readonly}
        required={required}
        multiple={multiple}
        accept={accepts}
        data-key={data_key}
        {...rest}
      />

      {isInvalid ? (
        <small className="text-danger d-block mt-1">
          {invalidMessage ?? "Required"}
        </small>
      ) : null}
    </div>
  );
}

