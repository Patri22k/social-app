const handleArrowDownClick = (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const form = e.target.form;
        const index = Array.prototype.indexOf.call(form, e.target);
        const nextField = form.elements[index + 1];
        if (e.target.selectionStart === e.target.value.length) {
            nextField.focus();
        } else {
            e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
        }
    }
};

export { handleArrowDownClick };