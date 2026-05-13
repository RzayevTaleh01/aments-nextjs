import React, { useEffect, useMemo, useState } from "react";
import ApiService from "@/admin/services/ApiService";
import styles from "@/admin/components/ui/Table/Table.module.scss";
import SgTableSkeletonLoading from "@/admin/components/ui/Loading/Skeleton/TableSkeleton/TableSkeletonLoading";
import DataTable from "react-data-table-component";

/**
 * <SgTable
 *     tableData={{
 *         data: [
 *             {
 *                 key: 'full_name',
 *                 name: 'Ad Soyad',
 *                 hidden: false,
 *                 cell: (row, key) => {
 *                     console.log(row, key)
 *                     return (
 *                         <>
 *                             <SgIcon icon={'trash'} />
 *                         </>
 *                     )
 *                 }
 *             }
 *         ],
 *         api: '/TABLE_DATA_URL',
 *         filters: {
 *             department: 1,
 *             search: 'lorem ipsum 123'
 *         }
 *     }}
 *     onClick={(e, row, index) => {console.log(e, row, index)}}
 * />
 *
 * */




export default function SgTable(props) {
    const { onClick, tableData, serverSide = true, data_key: dataKeyProp, reloadKey } = props;
    const data_key = dataKeyProp ?? tableData?.data_key ?? "data";

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const columns = useMemo(() => {
        return (tableData?.data || [])
            .filter((col) => !col.hidden)
            .map((col) => {
                const isActionLike = col.key === "actions" || col.hoverable || col.ignoreRowClick;
                return {
                    name: col.name || col.key || "",
                    sortable: Boolean(col.sortable),
                    cell: (row, index) => (col.cell ? col.cell(row, row?.[col.key], index) : (row?.[col.key] ?? "-")),
                    ignoreRowClick: Boolean(col.ignoreRowClick ?? isActionLike),
                };
            });
    }, [tableData?.data]);

    const rows = useMemo(() => {
        return data?.[data_key] || data?.data || [];
    }, [data, data_key]);

    const filtersKey = useMemo(() => {
        try {
            return JSON.stringify(tableData?.filters || {});
        } catch {
            return "";
        }
    }, [tableData?.filters]);

    const totalRows = useMemo(() => {
        const meta = data?.meta || {};
        return (
            Number(data?.total ?? meta?.total ?? meta?.totalItems ?? meta?.totalCount) ||
            Number(rows?.length || 0)
        );
    }, [data, rows]);

    const customStyles = useMemo(() => {
        const headTransform = tableData?.headTransform || "uppercase";
        const textTransform =
            headTransform === "lowercase" ? "lowercase" : headTransform === "capitalize" ? "capitalize" : "uppercase";

        return {
            table: {
                style: {
                    width: "100%",
                },
            },
            headCells: {
                style: {
                    color: "#374151",
                    fontSize: "14px",
                    fontWeight: 700,
                    padding: "12px 16px",
                    backgroundColor: "#F3F4F6",
                    borderBottom: "1px solid #E5E7EB",
                    textTransform,
                },
            },
            cells: {
                style: {
                    color: "#4B5563",
                    fontSize: "12px",
                    fontWeight: 400,
                    padding: "12px 16px",
                    borderBottom: "1px solid #E5E7EB",
                },
            },
            rows: {
                stripedStyle: {
                    backgroundColor: "#F9FAFB",
                },
                highlightOnHoverStyle: {
                    backgroundColor: "#EEF2F7",
                    cursor: onClick ? "pointer" : "default",
                },
            },
            pagination: {
                style: {
                    borderTop: "1px solid #E5E7EB",
                    padding: "12px 16px",
                },
            },
        };
    }, [tableData?.headTransform, onClick]);

    function handleRowClick(row, e) {
        if (!onClick) return;
        const index = Array.isArray(rows) ? rows.findIndex((r) => r === row) : -1;
        onClick(e, row, index);
    }

    const requestFilters = useMemo(() => {
        return tableData?.filters || {};
    }, [filtersKey, tableData?.filters]);

    useEffect(() => {
        if (!tableData?.customData) {
            setLoading(true)
            ApiService({
                url: tableData?.api,
                method: tableData.apiMethod || 'GET',
                params: {
                    page: page,
                    items: perPage,
                    ...requestFilters
                },
                data: {
                    page: page,
                    items: perPage,
                    ...requestFilters
                },
                headers: tableData?.headers || {}
            }).then(el => {
                if (serverSide) {
                    const payload = el?.data?.data || {};
                    setData({ ...payload });
                }
                else {
                    setData({data: el.data.data});
                }
                setLoading(false)
            }).catch(err => {
                console.log(err);
                setLoading(false);
                }
            );
        }
        else {
            setLoading(false)
            setData({data: tableData?.customData})
        }
    }, [page, perPage, reloadKey, requestFilters, serverSide, tableData?.api, tableData?.apiMethod, tableData?.customData, tableData?.headers]);

    useEffect(() => {
        setPage(1);
        setResetPaginationToggle((v) => !v);
    }, [filtersKey]);
    

    return (
        <>
            <div className={[styles["table-area"]].join(" ").trim()}>
                <div className={[styles["table-area-content"]].join(" ").trim()}>
                    <DataTable
                        columns={columns}
                        data={rows}
                        customStyles={customStyles}
                        striped={true}
                        highlightOnHover={true}
                        pointerOnHover={Boolean(onClick)}
                        onRowClicked={handleRowClick}
                        responsive={true}
                        progressPending={loading}
                        progressComponent={
                            <SgTableSkeletonLoading
                                full={true}
                                rows={5}
                                columns={Math.max(columns.length, 1)}
                            />
                        }
                        noDataComponent={<div className="p-4">Məlumat tapılmadı!</div>}
                        pagination={true}
                        paginationServer={Boolean(serverSide && !tableData?.customData)}
                        paginationTotalRows={totalRows}
                        paginationPerPage={perPage}
                        paginationRowsPerPageOptions={[10, 20, 50, 100]}
                        paginationResetDefaultPage={resetPaginationToggle}
                        paginationComponentOptions={{
                            rowsPerPageText: "Element sayı",
                            rangeSeparatorText: "/",
                        }}
                        onChangePage={(nextPage) => setPage(nextPage)}
                        onChangeRowsPerPage={(nextPerPage) => {
                            setPerPage(nextPerPage);
                            setPage(1);
                            setResetPaginationToggle((v) => !v);
                        }}
                    />
                </div>
            </div>
        </>
    )
}
