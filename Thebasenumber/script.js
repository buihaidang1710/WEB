document.addEventListener("DOMContentLoaded", function () {
    const conversionForm = document.getElementById('Form-1');
    const output = document.getElementById('output');
    const errorMessage = document.getElementById('errorMessage');

    conversionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const inputValue = conversionForm.numberInput.value;
        const sourceBase = Number(conversionForm.sourceBase.value);
        const targetBase = Number(conversionForm.targetBase.value);

        let result = '';

        if (isNaN(inputValue)) {
            errorMessage.textContent = 'Vui lòng nhập một số hợp lệ.';
        } else if (sourceBase === 10 && !/^\d+$/.test(inputValue)) {
            errorMessage.textContent = 'Vui lòng nhập số thập phân hợp lệ.';
        } else if (sourceBase === 8 && !/^[0-7]+$/.test(inputValue)) {
            errorMessage.textContent = 'Vui lòng nhập số bát phân hợp lệ.';
        } else if (sourceBase === 16 && !/^[0-9A-Fa-f]+$/.test(inputValue)) {
            errorMessage.textContent = 'Vui lòng nhập số thập lục phân hợp lệ.';
        } else if (sourceBase === 2 && !/^[01]+$/.test(inputValue)) {
            errorMessage.textContent = 'Vui lòng nhập số nhị phân hợp lệ.';
        } else {
            errorMessage.textContent = '';
            if (sourceBase === 10) {
                result = Number(inputValue).toString(targetBase);
            } else {
                const decimalValue = parseInt(inputValue, sourceBase);
                result = decimalValue.toString(targetBase);
            }
            output.value = result;
        }
    });
});
