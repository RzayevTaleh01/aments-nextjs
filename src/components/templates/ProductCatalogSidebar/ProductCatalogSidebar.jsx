"use client";

import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import styles from "./ProductCatalogSidebar.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function ProductCatalogSidebar({
  title = "Filter",
  searchValue,
  onSearchChange,
  categoryValue,
  onCategoryChange,
  brandValue,
  onBrandChange,
  markValue,
  onMarkChange,
  modelValue,
  onModelChange,
  modelDisabled = false,
  onSearch,
  onClear,
  categoryOptions = [{ label: "Category", value: "" }],
  brandOptions = [{ label: "Brend", value: "" }],
  markOptions = [{ label: "Marka", value: "" }],
  modelOptions = [{ label: "Model", value: "" }],
}) {
  const { staticContent } = useInitial();
  return (
    <div className={styles.root}>
      <h6 className={styles.title}>{title}</h6>

      <div className={styles.field}>
        <input
          className={`form-control ${styles.control}`}
          type="text"
          value={searchValue}
          onChange={onSearchChange}
          placeholder={HelperTranslate({ defaultText: "Axtarış", translateText: staticContent?.catalog__searchPlaceholder })}
        />
      </div>

      <div className={styles.field}>
        <select className={`form-select ${styles.control}`} value={categoryValue} onChange={onCategoryChange}>
          {categoryOptions.map((o) => (
            <option key={o.value || o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <select className={`form-select ${styles.control}`} value={brandValue} onChange={onBrandChange}>
          {brandOptions.map((o) => (
            <option key={o.value || o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <select className={`form-select ${styles.control}`} value={markValue} onChange={onMarkChange}>
          {markOptions.map((o) => (
            <option key={o.value || o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <select className={`form-select ${styles.control}`} value={modelValue} onChange={onModelChange} disabled={modelDisabled}>
          {modelOptions.map((o) => (
            <option key={o.value || o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.searchButton} onClick={onSearch}>
          {HelperTranslate({ defaultText: "Axtar", translateText: staticContent?.catalog__searchButton })}
        </button>
        <button type="button" className={styles.clearButton} onClick={onClear}>
          <Icon name="FaSyncAlt" size={14} />{" "}
          {HelperTranslate({ defaultText: "Təmizlə", translateText: staticContent?.catalog__clearButton })}
        </button>
      </div>
    </div>
  );
}
