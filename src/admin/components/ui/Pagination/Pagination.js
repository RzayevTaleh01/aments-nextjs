import SgIcon from "@/admin/components/ui/Icon";
import styles from "@/admin/components/ui/Pagination/Pagination.module.scss";
import {useEffect, useState} from "react";

export default function SgPagination(props) {
    const { pageCount, page, arrow = true, center = false, onClick } = props;
    const paginationVisibleCount = 9;
    const [paginationOptions, setPaginationOptions] = useState({
        start: 0,
        stop: paginationVisibleCount,
        before: false,
        after: pageCount > paginationVisibleCount,
    });

    function handlePageChange(i) {
        onClick?.(i)
    }

    useEffect(() => {
        let _paginationOptions = {...paginationOptions};
        if (page <= Math.floor(paginationVisibleCount / 2)) {
            _paginationOptions.start = 0;
            _paginationOptions.stop = paginationVisibleCount;
        }
        if (page > Math.floor(paginationVisibleCount / 2)) {
            if ((pageCount - page) > Math.floor(paginationVisibleCount / 2)) {
                _paginationOptions.start = page - Math.ceil(paginationVisibleCount / 2);
                _paginationOptions.stop = page + Math.floor(paginationVisibleCount / 2);
            }
            else {
                _paginationOptions.start = pageCount - paginationVisibleCount;
                _paginationOptions.stop = page + Math.floor(paginationVisibleCount / 2);
            }
        }
        _paginationOptions.before = page + Math.floor(paginationVisibleCount / 2) > paginationVisibleCount;
        _paginationOptions.after = page + Math.floor(paginationVisibleCount / 2) < pageCount;

        setPaginationOptions(_paginationOptions);
    }, [pageCount, page, paginationVisibleCount])

    return (
        <>
            <div className={[styles['sg--pagination'], center ? styles['sg--pagination--center'] : ''].join(' ').trim()}>
                {arrow ?
                    <>
                        <div
                            className={[styles['sg--pagination-item'], styles['sg--pagination-item--controller']].join(' ').trim()}
                            onClick={() => handlePageChange(1)}>
                            <div className={[styles['sg--pagination-item--link']].join(' ').trim()}>
                                <SgIcon icon='chevrons-left'/>
                            </div>
                        </div>
                        <div
                            className={[styles['sg--pagination-item'], styles['sg--pagination-item--controller']].join(' ').trim()}
                            onClick={() => handlePageChange('prev')}>
                            <div className={[styles['sg--pagination-item--link']].join(' ').trim()}>
                                <SgIcon icon='chevron-left'/>
                            </div>
                        </div>
                    </>
                    : ''
                }

                {paginationOptions.before ? '...' : ''}
                {Array(pageCount).fill(0, paginationOptions?.start, paginationOptions?.stop).map((el, index) =>
                    <div key={index}
                         className={[styles['sg--pagination-item'], index + 1 === page ? styles['active'] : ''].join(' ').trim()}
                         onClick={() => handlePageChange(index + 1)}>
                        <div className={[styles['sg--pagination-item--link']].join(' ').trim()}>
                            {index + 1}
                        </div>
                    </div>
                )}
                {paginationOptions.after ? '...' : ''}

                {arrow ?
                    <>
                        <div
                            className={[styles['sg--pagination-item'], styles['sg--pagination-item--controller']].join(' ').trim()}
                            onClick={() => handlePageChange('next')}>
                            <div className={[styles['sg--pagination-item--link']].join(' ').trim()}>
                                <SgIcon icon='chevron-right'/>
                            </div>
                        </div>
                        <div
                            className={[styles['sg--pagination-item'], styles['sg--pagination-item--controller']].join(' ').trim()}
                            onClick={() => handlePageChange(pageCount)}>
                            <div className={[styles['sg--pagination-item--link']].join(' ').trim()}>
                                <SgIcon icon='chevrons-right'/>
                            </div>
                        </div>
                    </>
                    : ''
                }
            </div>
        </>
    )
}
