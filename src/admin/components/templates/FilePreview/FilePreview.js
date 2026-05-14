import {SgButton} from "../../ui/Button";
import {GET_FILE_ROUTE} from "@/admin/configs/apiRoutes";
import Image from "next/image";
import {SgRatio} from "@/admin/components/ui/Ratio";
import React from "react";
import SgIcon from "@/admin/components/ui/Icon";
import "./FilePreview.scss";
const REQUEST_STORAGE_URL = process.env.NEXT_PUBLIC_REQUEST_STORAGE_URL;
const REQUEST_BACKEND_URL = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL;

export default function FilePreview(props) {
    const {data, handleRemoveFile, handleAddFile, handleEditFile, preview = false, fileNameStatus = true} = props;
    const baseUrl = (REQUEST_STORAGE_URL || REQUEST_BACKEND_URL || "").replace(/\/api\/?$/, "");

    function toDataUrl(item) {
        if (!item) return "";
        if (typeof item === "string") return item;
        if (typeof item === "object") {
            const urlLike = String(item?.url || item?.image || item?.path || item?.src || item?.file || item?.slug || "").trim();
            if (urlLike) return urlLike;
            const base64 = String(item?.base64 || "").trim();
            if (!base64) return "";
            if (base64.startsWith("data:")) return base64;
            const mime = String(item?.mime || "image/jpeg").trim() || "image/jpeg";
            return `data:${mime};base64,${base64}`;
        }
        return String(item);
    }

    function buildFileUrl(raw) {
        const v = String(raw || "").trim();
        if (!v) return '';
        if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('data:')) return v;
        if (v.startsWith('/')) return baseUrl ? `${baseUrl}${v}` : v;
        if (v.includes('/')) return baseUrl ? `${baseUrl}/${v}` : v;
        return baseUrl ? `${baseUrl}${GET_FILE_ROUTE}/${v}` : `${GET_FILE_ROUTE}/${v}`;
    }

    function getExt(raw) {
        const v = String(raw || "").trim();
        if (!v) return "";
        if (v.startsWith("data:")) {
            const mime = v.slice(5).split(";")[0];
            const maybeExt = (mime || "").split("/")[1];
            return String(maybeExt || "").toLowerCase();
        }
        return v.split('?')[0].split('#')[0].split('.').pop()?.toLowerCase();
    }

    const isArrayData = Array.isArray(data);
    const items = isArrayData ? data : (data ? [data] : []);

    if (isArrayData) {
        return items.length ? (
            <div className='filePreview-grid'>
                {(items || []).map((item, index) => {
                    const raw = toDataUrl(item);
                    const fileUrl = buildFileUrl(raw);
                    const ext = getExt(raw);
                    const isImage = Boolean(fileUrl) && (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'].includes(ext) || !ext || String(fileUrl).startsWith('data:image/'));
                    const isData = String(fileUrl || '').startsWith('data:');

                    if (!isImage) return null;

                    return (
                        <div className='filePreview-thumb' key={`${ext}-${index}`}>
                            <a href={fileUrl} target='_blank' className='filePreview-thumbLink'>
                                <Image
                                    width={160}
                                    height={160}
                                    alt={'image preview'}
                                    src={fileUrl}
                                    className='filePreview-thumbImg'
                                    unoptimized={isData}
                                />
                            </a>
                            {!preview ? (
                                <div className='filePreview-thumbActions'>
                                    <button type='button' className='filePreview-thumbEdit' onClick={() => handleEditFile?.(index)}>
                                        <SgIcon icon='pen' size={14} />
                                    </button>
                                    <button type='button' className='filePreview-thumbRemove' onClick={() => handleRemoveFile?.(index)}>
                                        ×
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    )
                })}
                {(!preview && typeof handleAddFile === 'function') ? (
                    <button type='button' className='filePreview-addMore' onClick={handleAddFile}>
                        +
                    </button>
                ) : null}
            </div>
        ) : (
            ""
        );
    }

    return (
        items.length ?
            <div className='row'>
                {(items || []).map((item, index) => {
                    const raw = toDataUrl(item);
                    const fileUrl = buildFileUrl(raw);
                    const ext = getExt(raw);
                    const displayName = raw.startsWith("data:") ? `image-${index + 1}` : raw;
                    const isData = String(fileUrl || '').startsWith('data:');

                    return (
                        <div className='col-lg-6' key={`${displayName}-${index}`}>
                            <a href={fileUrl} target='_blank' className='filePreview-media'>
                                <div className='filePreview-media-content'>
                                    {fileUrl && (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'].includes(ext) || !ext || String(fileUrl).startsWith('data:image/')) ?
                                        <SgRatio>
                                            <Image
                                                width={700}
                                                height={700}
                                                alt={'image preview'}
                                                src={fileUrl}
                                                className='filePreview-media-content--img'
                                                unoptimized={isData}
                                            />
                                        </SgRatio>
                                    :
                                        null
                                    }
                                </div>
                            </a>
                            <div className='filePreview-file'>
                                {fileNameStatus ?
                                    <a href={fileUrl} target='_blank' className='filePreview-file--name'>
                                        {displayName}
                                    </a>
                                    : null
                                }
                                {!preview ?
                                    <div className='filePreview-file-operation'>
                                        <div className='filePreview-file-operation-item'>
                                            <SgButton
                                                onlyIcon={true}
                                                icon='pen'
                                                withOutBlock={true}
                                                padding={0}
                                                size='big'
                                                onClick={isArrayData ? (() => handleEditFile?.(index)) : handleAddFile}
                                            >
                                                {isArrayData ? 'Düzəlt' : 'Faylı dəyiş'}
                                            </SgButton>
                                        </div>
                                        <div className='filePreview-file-operation-item'>
                                            <SgButton
                                                onlyIcon={true}
                                                icon='trash'
                                                withOutBlock={true}
                                                padding={0}
                                                size='big'
                                                onClick={isArrayData ? (() => handleRemoveFile?.(index)) : handleRemoveFile}
                                            >
                                                Sil
                                            </SgButton>
                                        </div>
                                    </div>
                                    : ''
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
            : ""
    )
}
