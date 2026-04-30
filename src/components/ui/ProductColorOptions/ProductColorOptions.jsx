import { useId } from "react";

const defaultOptions = [
  { value: "red", className: "product-color-red" },
  { value: "tomato", className: "product-color-tomato" },
  { value: "green", className: "product-color-green" },
  { value: "light-green", className: "product-color-light-green" },
  { value: "blue", className: "product-color-blue" },
  { value: "light-blue", className: "product-color-light-blue" },
];

export default function ProductColorOptions({ label = "Color", name = "product-color", options = defaultOptions }) {
  const id = useId();

  return (
    <div className="variable-single-item">
      <span>{label}</span>
      <div className="product-variable-color">
        {options.map((opt, idx) => {
          const inputId = `${name}-${id}-${opt.value}`;
          return (
            <label key={opt.value} htmlFor={inputId}>
              <input name={name} id={inputId} type="radio" defaultChecked={idx === 0} />
              <span className={opt.className} />
            </label>
          );
        })}
      </div>
    </div>
  );
}

