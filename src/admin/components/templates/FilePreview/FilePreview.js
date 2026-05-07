import {SgButton} from "../../ui/Button";
import {GET_FILE_ROUTE} from "@/admin/configs/apiRoutes";
import Image from "next/image";
import {SgRatio} from "@/admin/components/ui/Ratio";
import React from "react";
const REQUEST_STORAGE_URL = process.env.NEXT_PUBLIC_REQUEST_STORAGE_URL;

export default function FilePreview(props) {
    const {data, handleRemoveFile, handleAddFile, preview = false, fileNameStatus = true} = props;
    return (
        data ?
            <div className='row'>
                <div className='col-lg-6'>
                    <a href={`${REQUEST_STORAGE_URL}${GET_FILE_ROUTE}/${data}`} target='_blank' className='filePreview-media'>
                        <div className='filePreview-media-content'>
                            {['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(data.split('.')[data.split('.').length - 1]) ?
                                <SgRatio>
                                    <Image width={700} height={700} alt={'image preview'} src={`${REQUEST_STORAGE_URL}${GET_FILE_ROUTE}/${data}`}
                                           className='filePreview-media-content--img'/>
                                </SgRatio>
                            :
                                null
                            }
                        </div>
                    </a>
                    <div className='filePreview-file'>
                        {fileNameStatus ?
                            <a href={`${REQUEST_STORAGE_URL}${GET_FILE_ROUTE}/${data}`} target='_blank' className='filePreview-file--name'>
                                {data}
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