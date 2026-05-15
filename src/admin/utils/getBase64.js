/**
 * @functionName GETBASE64
 * @functionDescription Faylı oxuyur və base64-ə çevirib callback funksiyası ilə geri göndərir
 */
export const getBase64 = (file, cb) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function onload() {
        cb({result:reader.result})
	};
	reader.onerror = function onerror(error) {
		console.log('Error - helpers/Func.js getBase64: ', error);
	};
}
