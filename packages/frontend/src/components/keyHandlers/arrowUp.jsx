const handleArrowUpClick = (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        const form = e.target.form;
        const index = Array.prototype.indexOf.call(form, e.target);
        const prevField = form.elements[index - 1];
        if (e.target.selectionStart === 0) {
            prevField.focus();
        } else {
            e.target.selectionStart = e.target.selectionEnd = 0;
        }
    }
};

export { handleArrowUpClick };