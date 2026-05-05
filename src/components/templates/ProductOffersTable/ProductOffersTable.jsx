"use client";

import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import styles from "./ProductOffersTable.module.scss";

const defaultGroups = [];

export default function ProductOffersTable({ product, groups = defaultGroups }) {
  const { status } = useSession();
  const showPrice = status === "authenticated";
  const [pendingBrand, setPendingBrand] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  const brands = useMemo(() => {
    const list = [];
    for (const g of groups) {
      for (const r of g.rows) {
        if (r.brand && !list.includes(r.brand)) list.push(r.brand);
      }
    }
    return list;
  }, [groups]);

  const filteredGroups = useMemo(() => {
    return groups
      .map((g) => ({
        ...g,
        rows: g.rows.filter((r) => {
          const brandOk = selectedBrand === "ALL" || r.brand === selectedBrand;
          return brandOk;
        }),
      }))
      .filter((g) => g.rows.length > 0);
  }, [groups, selectedBrand]);

  return (
    <div id="offers" className={`${styles.scope} wishlish-table-wrapper section-top-gap-100`}>
      <div className="container">
        <div className="row justify-content-between mb-30">
          <div className="col-lg-3 col-md-4 mb-10">
            <div className="default-form-box">
              <label>BRAND</label>
              <select className="form-select" value={pendingBrand} onChange={(e) => setPendingBrand(e.target.value)}>
                <option value="ALL">Hamısı</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-md-4 mb-10 d-flex align-items-end">
            <div className="d-flex gap-2 w-100">
              <button
                type="button"
                className="btn btn-danger w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedBrand(pendingBrand);
                }}
              >
                Axtar
              </button>
              <button
                type="button"
                className="btn btn-dark w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setPendingBrand("ALL");
                  setSelectedBrand("ALL");
                }}
              >
                Sıfırla
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="table_desc">
              <div className="table_page table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="product_name" colSpan={2}>
                        Detal
                      </th>
                      <th className="product_stock">Anbar</th>
                      <th className="product_total">{showPrice ? "Qiymət" : null}</th>
                      <th className="product_addcart" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGroups.map((g) => (
                      <Fragment key={g.title}>
                        <tr>
                          <td colSpan={5} className="text-start fw-bold">
                            {g.title}
                          </td>
                        </tr>
                        {g.rows.map((r) => {
                          const displayName = r.name || product?.name || "Məhsul";
                          return (
                            <tr key={`${g.title}-${r.brand}-${r.code}-${r.warehouse}-${r.qty}-${r.price}`}>
                              <td className="product_thumb">
                                <Image src={r.img} alt={displayName} width={120} height={120} />
                              </td>
                              <td className="product_name text-start">
                                <div className="fw-bold">{r.brand}</div>
                                <div>{r.code}</div>
                                <div className="mt-5">{displayName}</div>
                              </td>
                              <td className="product_stock">
                                <button type="button" className="btn btn-link p-0">
                                  {r.warehouse}
                                </button>
                              </td>
                              <td className="product_total">{showPrice ? r.price : null}</td>
                              <td className="product_addcart">
                                <button
                                  type="button"
                                  onClick={() => {
                                    window.dispatchEvent(
                                      new CustomEvent("aments:product-offer-modal", {
                                        detail: { row: r, product },
                                      })
                                    );
                                  }}
                                >
                                  <Icon name="FaShoppingCart" size={16} /> ƏLAVƏ ET
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </Fragment>
                    ))}
                    {filteredGroups.length === 0 ? (
                      <tr>
                        <td colSpan={5}>Nəticə tapılmadı</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
