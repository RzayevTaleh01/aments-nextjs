import {SgButton} from "../../ui/Button";
import {GET_FILE_ROUTE} from "@/admin/configs/apiRoutes";
import Image from "next/image";
import {SgRatio} from "@/admin/components/ui/Ratio";
import React from "react";
const REQUEST_STORAGE_URL = process.env.NEXT_PUBLIC_REQUEST_STORAGE_URL;
const REQUEST_BACKEND_URL = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL;

export default function FilePreview(props) {
    const {data, handleRemoveFile, handleAddFile, preview = false, fileNameStatus = true} = props;
    const baseUrl = (REQUEST_STORAGE_URL || REQUEST_BACKEND_URL || "").replace(/\/api\/?$/, "");
    const rawData = String(data || "").trim();
    const isDataUrl = rawData.startsWith("data:");
    const fileUrl = (() => {
        if (!rawData) return '';
        if (rawData.startsWith('http://') || rawData.startsWith('https://') || isDataUrl) return rawData;
        if (rawData.startsWith('/')) return baseUrl ? `${baseUrl}${rawData}` : rawData;
        return `${baseUrl}${GET_FILE_ROUTE}/${rawData}`;
    })();
    const ext = (() => {
        if (!rawData) return "";
        if (isDataUrl) {
            const mime = rawData.slice(5).split(";")[0];
            const maybeExt = (mime || "").split("/")[1];
            return String(maybeExt || "").toLowerCase();
        }
        return String(rawData).split('?')[0].split('#')[0].split('.').pop()?.toLowerCase();
    })();
    const displayName = isDataUrl ? "image-base64" : data;
    return (
        data ?
            <div className='row'>
                <div className='col-lg-6'>
                    <a href={fileUrl} target='_blank' className='filePreview-media'>
                        <div className='filePreview-media-content'>
                            {fileUrl && ['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(ext) ?
                                <SgRatio>
                                    <Image width={700} height={700} alt={'image preview'} src={fileUrl}
                                           className='filePreview-media-content--img'/>
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
                                        onClick={handleAddFile}
                                    >
                                        Faylı dəyiş
                                    </SgButton>
                                </div>
                                <div className='filePreview-file-operation-item'>
                                    <SgButton
                                        onlyIcon={true}
                                        icon='trash'
                                        withOutBlock={true}
                                        padding={0}
                                        size='big'
                                        onClick={handleRemoveFile}
                                    >
                                        Sil
                                    </SgButton>
                                </div>
                            </div>
                            : ''
                        }
                    </div>
                </div>
            </div>
            : ""
    )
}
