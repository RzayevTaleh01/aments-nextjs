export const removeRow = (_formData, setFormData, _valueErrors, setValueErrors, key, index) => {
    let formData = _formData;

    if (key) {
        key.split('.').reduce((a,b)=>a[b],formData).splice(index, 1)
    }

    setFormData(state => ({
        ...state
    }));
}