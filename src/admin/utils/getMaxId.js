export function GetMaxId(array, key) {
	return (array.length && array.find(el => el[key])) ? Math.max.apply(null,
		array.map(function (o) {
			return o?.[key];
		}))
		: 0
}