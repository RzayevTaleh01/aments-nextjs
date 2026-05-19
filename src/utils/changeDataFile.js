// HELPERS
import {getBase64} from "@/utils/getBase64";
import ApiService from "@/services/ApiService";
import {changeData} from "@/utils/changeData";
import {UPLOAD_FILE_ROUTE} from "@/configs/apiRoutes";
import {toast} from "react-toastify";

/**
 * @functionName CALL BACK CHANGE FORM DATA FILE
 * @functionDescription
 */
export const callBackChangeDataFile = (e, _formData, setFormData, _valueErrors, setValueErrors, extraKey, progress = null, setProgress, url = UPLOAD_FILE_ROUTE) => {
	let formData = _formData;
	let valueErrors = _valueErrors;
	let count = 0

	if (e.target.files.length > 0) {
		let file = e.target.files[0];
		if (progress) {
			progress(1);
		}
		if (e.target.files.length > 1) {
			file = e.target.files;
			for (const newFile of file) {
				if (newFile?.size > 10485760) {
					toast(
						<>
							<p>Sənədin həcmi 10 MB-dan çox olmamalıdır.</p>
							<b>&quot;{file?.name}&quot;</b>
						</>,
						{
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							type: "error"
						}
					);
				}
				else {
					getBase64(newFile, (result64) => {
						const exts = newFile.name.split('.');
						const ext = exts[exts.length - 1];
						const fname = exts.join('').trim();
						ApiService({
							url: url,
							method: 'POST',
							data: {
								extension: ext,
								fileName: fname,
								base64: result64.result
							}
						}).then(result => {
							count += 1
							if (count === e.target.files.length) {
								changeData(e, formData, setFormData, valueErrors, setValueErrors, result.data.data.token, extraKey)
							}
						}).catch((error) => {
							console.log(error)
						});
					});
				}
			}

		}
		else {
			file = e.target.files[0];

			if (file?.size > 10485760) {
				toast(
					<>
						<p>Sənədin həcmi 10 MB-dan çox olmamalıdır.</p>
						<b>&quot;{file?.name}&quot;</b>
					</>,
					{
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						type: "error"
					}
				);
			}
			else {
				getBase64(file, (result64) => {
					const exts = file.name.split('.');
					const ext = exts[exts.length - 1];
					const fname = exts.join('.').trim();
					ApiService({
						url: url,
						method: 'POST',
						data: {
							extension: ext,
							fileName: fname,
							base64: result64.result
						}
					}).then(result => {
						changeData(e, formData, setFormData, valueErrors, setValueErrors, result.data.data.token, extraKey)
						console.log(result.data.data.token, e)
					}).catch(error => {
						console.log(error)
					});
				});
			}
		}

	}
	else {
	}
}

/**
 * @functionName CHANGE FORM DATA FILE
 * @functionDescription Fayl yükləmə zamanı işə düşür və callback funksiyasından aldığı məlumata uyğun state-ə value yazır.
 */
export function changeDataFile(e, datas, setDatas, errors, setErrors, filesProgress, setFilesProgress) {
	const id = e.target.id;
	callBackChangeDataFile(e, datas, setDatas, errors, setErrors, (data) => {
		if (data) {
			const { errors, dataForm } = data;
			setDatas((datas) => ({
				...datas,
				...dataForm
			}))
			setErrors((error) => ({
				...error,
				...errors
			}))
		}
	}, (progress) => {
		const fileProgress = filesProgress || {};
		if (Number(fileProgress[id]) !== Math.round(progress)) {
			fileProgress[id] = progress;
			setFilesProgress((filesProgress) => ({
				...filesProgress,
				...fileProgress
			}));
		}
	});
}
