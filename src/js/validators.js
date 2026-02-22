/**
 * @param {string} cardNumber - номер карты (строка)
 * @returns {boolean} - true, если номер валиден
 */
export function isValidLuhn(cardNumber) {
    // Убираем все пробелы, если они есть
    const cleaned = cardNumber.replace(/\D/g, '');

    if (cleaned.length < 13 || cleaned.length > 19) {
        return false;
    }

    let sum = 0;
    let isSecond = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i], 10);

        if (isSecond) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isSecond = !isSecond;
    }

    // Если сумма делится на 10 без остатка — карта валидна
    return sum % 10 === 0;
}