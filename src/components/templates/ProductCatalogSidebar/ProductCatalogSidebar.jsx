"use client";

import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import styles from "./ProductCatalogSidebar.module.scss";

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
  onSearch,
  onClear,
  categoryOptions = [{ label: "Category", value: "" }],
  brandOptions = [{ label: "Brend", value: "" }],
  markOptions = [{ label: "Marka", value: "" }],
  modelOptions = [{ label: "Model", value: "" }],
}) {
  return (
    <div className={styles.root}>
      <h6 className={styles.title}>{title}</h6>

      <div className={styles.field}>
        <input
          className={`form-control ${styles.control}`}
          type="text"
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Axtarış"
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
        <select className={`form-select ${styles.control}`} value={modelValue} onChange={onModelChange}>
          {modelOptions.map((o) => (
            <option key={o.value || o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.searchButton} onClick={onSearch}>
          Axtar
        </button>
        <button type="button" className={styles.clearButton} onClick={onClear}>
          <Icon name="FaSyncAlt" size={14} /> Təmizlə
        </button>
      </div>
    </div>
  );
}
