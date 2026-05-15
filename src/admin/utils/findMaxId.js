export const findMaxID = (_data, type) => {
    const data = _data;

    return Math.max(...data.map(o => o?.[type] || 0)) + 1
}