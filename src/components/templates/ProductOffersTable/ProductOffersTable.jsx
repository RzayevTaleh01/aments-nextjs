"use client";

import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import useShowPrice from "@/hooks/use-show-price";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import styles from "./ProductOffersTable.module.scss";

const defaultGroups = [];

export default function ProductOffersTable({ product, groups = defaultGroups }) {
  const { showPrice } = useShowPrice();
  const { staticContent } = useInitial();
  const [pendingBrand, setPendingBrand] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const base = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL || "";
  const showProductColumn = true;
  const colCount = showProductColumn ? 7 : 6;

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
              <label>{HelperTranslate({ defaultText: "BRAND", translateText: staticContent?.offers__brandLabel })}</label>
              <select className="form-select" value={pendingBrand} onChange={(e) => setPendingBrand(e.target.value)}>
                <option value="ALL">
                  {HelperTranslate({ defaultText: "Hamısı", translateText: staticContent?.offers__all })}
                </option>
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
                {HelperTranslate({ defaultText: "Axtar", translateText: staticContent?.offers__search })}
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
                {HelperTranslate({ defaultText: "Sıfırla", translateText: staticContent?.offers__reset })}
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
                      <th className="product_thumb">
                        {HelperTranslate({ defaultText: "Image", translateText: staticContent?.cart__image })}
                      </th>
                      <th className="product_brand">{HelperTranslate({ defaultText: "Brand", translateText: staticContent?.offers__brandLabel })}</th>
                      <th className="product_code">
                        {HelperTranslate({ defaultText: "Code", translateText: staticContent?.productDetails__code })}
                      </th>
                      {showProductColumn ? (
                        <th className="product_name">
                          {HelperTranslate({ defaultText: "Product", translateText: staticContent?.cart__product })}
                        </th>
                      ) : null}
                      <th className="product_stock">{HelperTranslate({ defaultText: "Warehouse", translateText: staticContent?.offers__warehouse })}</th>
                      <th className="product_total">
                        {showPrice ? HelperTranslate({ defaultText: "Price", translateText: staticContent?.offers__price }) : null}
                      </th>
                      <th className="product_addcart" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGroups.map((g) => (
                      <Fragment key={g.title}>
                        <tr>
                          <td colSpan={colCount} className="text-start fw-bold">
                            {g.title}
                          </td>
                        </tr>
                        {g.rows.map((r) => {
                          const displayName = r.name;
                          const rawImg = r.imageSrc;
                          const normalizedImg = rawImg.startsWith("uploads/") ? `/${rawImg}` : rawImg;
                          const resolvedImg = normalizedImg.startsWith("/uploads") ? `${base}${normalizedImg}` : normalizedImg;
                          const storageProductId = r.storageProductId;
                          return (
                            <tr key={`${g.title}-${r.brand}-${r.code}-${r.warehouse}-${r.qty}-${r.price}`}>
                              <td className="product_thumb">
                                <Image src={resolvedImg} alt={displayName} width={120} height={120} />
                              </td>
                              <td className="product_brand">{r.brand}</td>
                              <td className="product_code">{r.code}</td>
                              {showProductColumn ? <td className="product_name text-start">{displayName}</td> : null}
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
                                      new CustomEvent("oem:product-offer-modal", {
                                        detail: { row: { ...r, storage_product_id: storageProductId }, product },
                                      })
                                    );
                                  }}
                                >
                                  <Icon name="FaShoppingCart" size={16} />{" "}
                                  {HelperTranslate({ defaultText: "ƏLAVƏ ET", translateText: staticContent?.offers__add })}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </Fragment>
                    ))}
                    {filteredGroups.length === 0 ? (
                      <tr>
                        <td colSpan={colCount}>
                          {HelperTranslate({ defaultText: "Nəticə tapılmadı", translateText: staticContent?.common__noResults })}
                        </td>
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
