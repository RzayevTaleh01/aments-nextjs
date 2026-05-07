export const addRow = (_formData, setFormData, _valueErrors, setValueErrors, key, data, index) => {
    let formData = _formData;

    if (key) {
        key.split('.').reduce((a,b)=>a[b],formData).splice(index, 0, (data || {}))
    }

    setFormData(state => ({
        ...state
    }));
}