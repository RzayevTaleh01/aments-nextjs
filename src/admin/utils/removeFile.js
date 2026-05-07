/**
 * @functionName REMOVE FILE
 * @functionDescription Id və key-ə uyğun faylı silir.
 */
export function removeFile(id, key = "", index, setDatas, datas ) {
	if (key) {
		let data = datas[key] || [{}];
		data[index][id] = "";
		setDatas((datas) => ({
			...datas,
			[key]: data
		}))
	}
	else {
		setDatas((datas) => ({
			...datas,
			[id]: ""
		}))
	}
}
