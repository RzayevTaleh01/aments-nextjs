"use client";

import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { Icon } from "@/components/ui";
import styles from "./ProductOffersTable.module.scss";

const defaultGroups = [
  {
    title: "Axtarılan kod",
    rows: [
      {
        img: "/assets/images/products_images/aments_products_image_1.jpg",
        brand: "HYUNDAI",
        code: "3730033013",
        name: "DİNAMO",
        warehouse: "Xırdalan",
        qty: 1,
        price: "139.35 AZN",
      },
      {
        img: "/assets/images/products_images/aments_products_image_1.jpg",
        brand: "HYUNDAI",
        code: "3730033013",
        name: "DİNAMO",
        warehouse: "Babək",
        qty: 3,
        price: "139.35 AZN",
      },
    ],
  },
  {
    title: "Əvəzləyici",
    rows: [
      {
        img: "/assets/images/products_images/aments_products_image_2.jpg",
        brand: "MANDO",
        code: "BN3730033013",
        name: "DİNAMO",
        warehouse: "Babək",
        qty: 0,
        price: "188.96 AZN",
      },
      {
        img: "/assets/images/products_images/aments_products_image_2.jpg",
        brand: "MANDO",
        code: "BN3730033013",
        name: "DİNAMO",
        warehouse: "Xırdalan",
        qty: 1,
        price: "188.96 AZN",
      },
    ],
  },
];

export default function ProductOffersTable({ product, groups = defaultGroups }) {
  const [pendingBrand, setPendingBrand] = useState("ALL");
  const [pendingQty, setPendingQty] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [selectedQty, setSelectedQty] = useState("ALL");

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
    const qtyValue = selectedQty === "ALL" ? null : Number(selectedQty);
    return groups
      .map((g) => ({
        ...g,
        rows: g.rows.filter((r) => {
          const brandOk = selectedBrand === "ALL" || r.brand === selectedBrand;
          const qtyOk = qtyValue == null || r.qty === qtyValue;
          return brandOk && qtyOk;
        }),
      }))
      .filter((g) => g.rows.length > 0);
  }, [groups, selectedBrand, selectedQty]);

  return (
    <div className={`${styles.scope} wishlish-table-wrapper section-top-gap-100`}>
      <div className="container">
        <div className="row mb-30">
          <div className="col-lg-3 col-md-4 mb-10">
            <div className="default-form-box">
              <label>BRAND</label>
              <select className="country_option nice-select wide" value={pendingBrand} onChange={(e) => setPendingBrand(e.target.value)}>
                <option value="ALL">Hamısı</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mb-10">
            <div className="default-form-box">
              <label>MİQDAR SEÇİMİ</label>
              <select className="country_option nice-select wide" value={pendingQty} onChange={(e) => setPendingQty(e.target.value)}>
                <option value="ALL">Hamısı</option>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={String(n)}>
                    {n}
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
                  setSelectedQty(pendingQty);
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
                  setPendingQty("ALL");
                  setSelectedBrand("ALL");
                  setSelectedQty("ALL");
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
                      <th className="product_quantity">Ədəd</th>
                      <th className="product_total">
                        Qiymət
                      </th>
                      <th className="product_addcart" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGroups.map((g) => (
                      <Fragment key={g.title}>
                        <tr>
                          <td colSpan={6} className="text-start fw-bold">
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
                              <td className="product_quantity">{r.qty}</td>
                              <td className="product_total">{r.price}</td>
                              <td className="product_addcart">
                                <button
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalProductOffer"
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
                        <td colSpan={6}>Nəticə tapılmadı</td>
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
