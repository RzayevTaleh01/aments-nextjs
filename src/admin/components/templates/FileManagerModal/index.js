import React, {useEffect, useState} from "react";
import _ from "lodash";
import ApiService from "@/admin/services/ApiService";
import {FILE_LIST_ROUTE} from "@/admin/configs/apiRoutes";
import {SgPopup} from "@/admin/components/ui/Popup";
import {SgButton} from "@/admin/components/ui/Button";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {SgFile, SgFormGroup} from "@/admin/components/ui/Form";
import {callBackChangeDataFile} from "@/admin/utils/changeDataFile";
import {SgRatio} from "@/admin/components/ui/Ratio";
import {changeData} from "@/admin/utils/changeData";
import {value} from "lodash/seq";
import Fancybox from "@/components/templates/Fancybox/Fancybox";
import Image from "next/image";
import { FaRegFileAlt } from "react-icons/fa";


export default function SgTemplateFileManagerModal(props) {
	const {children, id, name, type, toggleFileManagerModal, fileManagerModal, multiple=false, data, setData, errors, setErrors, data_key = null} = props;
	const [files, setFiles] = useState([])
	const [newFiles, setNewFiles] = useState({})
	const [filesProgress, setFilesProgress] = useState(null)

	function fileClick(url, index) {
		if (multiple) {
			let file = files
			const selected = file[index].selected
			file = file.map(n => ({...n}))
			file[index].selected = !selected
			setFiles(file)
		}
		else {
			let file = files
			const selected = file[index].selected
			file = file.map(n => ({...n, selected: false}))
			file[index].selected = !selected
			setFiles(file)
		}
	}

	function fileSubmit() {
		if (files.find(n => n.selected)) {
			if (multiple) {
				changeData({
					target: {
						id: id,
						name: name,
						value: _.filter(files, n => n.selected).map(el => el.url).join(','),
						validity: {},
						dataset: {
							key: data_key,
							id: null
						}
					}
				}, data, setData, errors, setErrors)

				toggleFileManagerModal()
			}
			else {
				changeData({
					target: {
						id: id,
						name: name,
						value: _.find(files, n => n.selected)?.url,
						validity: {},
						dataset: {
							key: data_key,
							id: null
						}
					}
				}, data, setData, errors, setErrors)

				toggleFileManagerModal()
			}
		}
	}

	function fileUpload(e) {
		callBackChangeDataFile(e, newFiles, setNewFiles, errors, setErrors, null, filesProgress, setFilesProgress)
	}

	useEffect(() => {
			ApiService.get(FILE_LIST_ROUTE, {headers: {type}}).then(data => {
				setFiles(data.data.data)
			}).catch(() => {
				setFiles([])
			});
		},
		[newFiles, type])

	return (
		<>
			<>
				{children}
				<SgPopup
					header='FILE MANAGER'
					size='xl'
					setToggleModal={toggleFileManagerModal}
					toggleModal={fileManagerModal}
				>
					<div className='mb-[72px]'>
						<SgFormGroup>
							<SgFile
								id='files'
								name='files'
								label='Files'
								multiple={true}
								onChange={fileUpload}
							/>
						</SgFormGroup>
					</div>
					<Fancybox
						options={{
							Carousel: {
								infinite: false
							}
						}}
					>
						<div className='row'>
							{files.length > 0 ?
								(files || []).map((file, index) =>
									<div key={index} className="col-lg-2">
										<div className={['fm_item', file.selected ? 'active' : ''].join(' ')}
											 data-type={file.extension} onClick={() => fileClick(file.url, index)}>
											<div className='fm_item_image'>
												<a className={'fm_item_view'} data-fancybox="gallery" href={file.url} onClick={(e) => e.stopPropagation()}>
													<SgIcon
														size='24px'
														icon={'eye'}
													/>
												</a>
												<SgRatio>
													{['mp4'].includes(file.extension) ?
														<>
															<video className='fm_item_image--img'>
																<source src={file.url} type="video/mp4"/>
															</video>
														</>
														:
														(
															['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(file.extension) ?
																<Image width={1000} height={1000} src={file.url}
																	   className='fm_item_image--img'
																	   alt={file.name}/>
																:
																<span
																	style={{
																		width: '100%',
																		height: '100%',
																		display: 'flex',
																		flexDirection: 'column',
																		justifyContent: 'center',
																		alignItems: 'center',
																		gap: '4px',
																		fontWeight: 600,
																		fontSize: '14px'
																	}}
																>
																	<FaRegFileAlt size={52} />
																	{file.extension}
																</span>
														)
													}
												</SgRatio>
											</div>
											<div className='fm_item_body'>
											<div className='fm_item_body--name'>
													{file.name}
												</div>
											</div>
										</div>
									</div>
								)
								:
								<div className='col-lg-12'>
								<h2 className="custom_modal--description">
										Fayl yoxdur
									</h2>
								</div>
							}
						</div>
					</Fancybox>

					<div className='mt-[72px]'>
						<SgButtonGroup
							gap={true}
						>
							<SgButton
								color='error'
								onClick={toggleFileManagerModal}
							>
								Close
							</SgButton>
							{files.find(n => n.selected) &&
								<SgButton
									color='primary'
									onClick={fileSubmit}
								>
									Submit
								</SgButton>
							}
						</SgButtonGroup>
					</div>
				</SgPopup>
			</>
		</>
	)
}
