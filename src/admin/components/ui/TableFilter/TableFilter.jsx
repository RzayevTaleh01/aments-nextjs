import { useEffect, useMemo, useRef, useState } from "react";
import { SgButton } from "@/admin/components/ui/Button";
import { SgInput } from "@/admin/components/ui/Form";
import ApiService from "@/admin/services/ApiService";

function normalizeListResponse(resp) {
  const payload = resp?.data?.data ?? resp?.data ?? null;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.category)) return payload.category;
  if (Array.isArray(payload?.categorys)) return payload.categorys;
  return [];
}

export default function TableFilter({ fields, value, onChange, children }) {
  const safeFields = Array.isArray(fields) ? fields : [];
  if (!safeFields.length) return null;

  const valueKey = useMemo(() => {
    try {
      return JSON.stringify(value && typeof value === "object" ? value : {});
    } catch {
      return "";
    }
  }, [value]);

  const fieldsKey = useMemo(() => {
    try {
      return JSON.stringify(
        safeFields.map((f) => ({
          key: f?.key,
          type: f?.type ?? f?.kind,
          filterKey: f?.filterKey,
          debounceMs: f?.debounceMs,
          width: f?.width,
          optionsType: typeof f?.options === "object" ? f?.options?.type : Array.isArray(f?.options) ? "array" : typeof f?.options,
          api: typeof f?.options === "object" ? f?.options?.api : undefined,
          defaultValue: f?.defaultValue,
        })),
      );
    } catch {
      return "";
    }
  }, [safeFields]);

  const [localValues, setLocalValues] = useState(() => {
    const base = value && typeof value === "object" ? value : {};
    const next = {};
    for (const f of safeFields) {
      const k = f?.key;
      if (!k) continue;
      next[k] = base?.[k] ?? f?.defaultValue ?? "";
    }
    return next;
  });

  useEffect(() => {
    const base = value && typeof value === "object" ? value : {};
    setLocalValues((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const f of safeFields) {
        const k = f?.key;
        if (!k) continue;
        const wanted = base?.[k] ?? f?.defaultValue ?? "";
        if (!(k in next) || next[k] !== wanted) {
          next[k] = wanted;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [fieldsKey, valueKey]);

  const debounceTimersRef = useRef({});
  const [debouncedValues, setDebouncedValues] = useState(() => ({ ...localValues }));

  useEffect(() => {
    const timers = debounceTimersRef.current || {};
    for (const f of safeFields) {
      const k = f?.key;
      if (!k) continue;
      const ms = Number(f?.debounceMs ?? 0);
      if (!Number.isFinite(ms) || ms <= 0) {
        setDebouncedValues((prev) => (prev[k] === localValues[k] ? prev : { ...prev, [k]: localValues[k] }));
        continue;
      }
      if (timers[k]) window.clearTimeout(timers[k]);
      timers[k] = window.setTimeout(() => {
        setDebouncedValues((prev) => (prev[k] === localValues[k] ? prev : { ...prev, [k]: localValues[k] }));
      }, ms);
    }
    debounceTimersRef.current = timers;
    return () => {
      const t = debounceTimersRef.current || {};
      for (const k of Object.keys(t)) window.clearTimeout(t[k]);
    };
  }, [fieldsKey, localValues]);

  const [remoteOptions, setRemoteOptions] = useState({});
  useEffect(() => {
    let isActive = true;
    const apiFields = safeFields.filter((f) => f?.options && typeof f.options === "object" && f.options.type === "api" && f.options.api && f?.key);
    if (!apiFields.length) return () => {};

    for (const f of apiFields) {
      const k = f.key;
      setRemoteOptions((prev) => ({ ...prev, [k]: { loading: true, options: prev?.[k]?.options ?? [] } }));
      ApiService.get(f.options.api)
        .then((resp) => {
          const list = normalizeListResponse(resp);
          const mapped = (list || [])
            .filter((x) => x?.id != null && (x?.name != null || x?.title != null))
            .map((x) => ({ id: String(x.id), name: x?.name ?? x?.title ?? String(x.id) }));

          const includeAll = Boolean(f?.options?.includeAll);
          const allValue = String(f?.options?.allValue ?? "all");
          const allLabel = String(f?.options?.allLabel ?? "Hamısı");
          const finalOptions = includeAll ? [{ id: allValue, name: allLabel }].concat(mapped) : mapped;
          if (!isActive) return;
          setRemoteOptions((prev) => ({ ...prev, [k]: { loading: false, options: finalOptions } }));
        })
        .catch(() => {
          const includeAll = Boolean(f?.options?.includeAll);
          const allValue = String(f?.options?.allValue ?? "all");
          const allLabel = String(f?.options?.allLabel ?? "Hamısı");
          const finalOptions = includeAll ? [{ id: allValue, name: allLabel }] : [];
          if (!isActive) return;
          setRemoteOptions((prev) => ({ ...prev, [k]: { loading: false, options: finalOptions } }));
        });
    }
    return () => {
      isActive = false;
    };
  }, [fieldsKey]);

  const computedFilters = useMemo(() => {
    const out = {};
    for (const f of safeFields) {
      const k = f?.key;
      if (!k) continue;
      const filterKey = f?.filterKey ?? k;
      if (!filterKey) continue;
      const ms = Number(f?.debounceMs ?? 0);
      const raw = Number.isFinite(ms) && ms > 0 ? debouncedValues[k] : localValues[k];
      const type = f?.type ?? f?.kind ?? "input";
      const defaultValue = f?.defaultValue;

      if (type === "select") {
        const v = raw == null ? "" : String(raw);
        if (v === "" || (defaultValue != null && String(defaultValue) === v)) continue;
        out[filterKey] = v;
        continue;
      }

      const v = String(raw || "").trim();
      if (!v) continue;
      out[filterKey] = v;
    }
    return out;
  }, [debouncedValues, fieldsKey, localValues, safeFields]);

  const computedKey = useMemo(() => {
    try {
      return JSON.stringify(computedFilters);
    } catch {
      return "";
    }
  }, [computedFilters]);

  const lastEmittedRef = useRef("");
  useEffect(() => {
    if (typeof onChange !== "function") return;
    if (computedKey === lastEmittedRef.current) return;
    lastEmittedRef.current = computedKey;
    onChange({ values: localValues, filters: computedFilters });
  }, [computedKey, computedFilters, localValues, onChange]);

  function handleReset() {
    const next = {};
    for (const f of safeFields) {
      const k = f?.key;
      if (!k) continue;
      next[k] = f?.defaultValue ?? "";
    }
    setLocalValues(next);
    setDebouncedValues(next);
  }

  return (
    <div className="d-flex gap-2 flex-wrap align-items-center justify-content-between mb-3">
      <div className="d-flex gap-2 flex-wrap align-items-center">
        {safeFields.map((f) => {
          const k = f?.key;
          if (!k) return null;
          const type = f?.type ?? f?.kind ?? "input";
          const width = Number(f?.width ?? 220);
          const fieldValue = localValues[k] ?? "";

          if (type === "select") {
            const isApi = f?.options && typeof f.options === "object" && f.options.type === "api";
            const optState = isApi ? remoteOptions?.[k] : null;
            const loading = Boolean(optState?.loading);
            const options = isApi ? optState?.options ?? [] : Array.isArray(f?.options) ? f.options : [];
            const selectProps = f?.selectProps && typeof f.selectProps === "object" ? f.selectProps : {};

            return (
              <div key={k} style={{ width }}>
                <SgInput
                  {...selectProps}
                  disabled={Boolean(selectProps?.disabled || loading)}
                  value={fieldValue}
                  onChange={(e) => setLocalValues((prev) => ({ ...prev, [k]: e.target.value }))}
                  options={options}
                />
              </div>
            );
          }

          const inputProps = f?.inputProps && typeof f.inputProps === "object" ? f.inputProps : {};
          return (
            <div key={k} style={{ width }}>
              <SgInput
                {...inputProps}
                value={fieldValue}
                onChange={(e) => setLocalValues((prev) => ({ ...prev, [k]: e.target.value }))}
              />
            </div>
          );
        })}
        <SgButton type="button" size="lg" color="error-outline" icon="sync" onClick={handleReset}>
          Sıfırla
        </SgButton>
      </div>
      {children ? <div className="d-flex gap-2 flex-wrap align-items-center">{children}</div> : null}
    </div>
  );
}
