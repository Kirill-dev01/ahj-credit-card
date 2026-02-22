/**
 * Определение платежной системы по номеру карты
 * @param {string} cardNumber - номер карты
 * @returns {string} - строка с названием системы (или 'unknown')
 */
export function getPaymentSystem(cardNumber) {
    // Очищаем от пробелов, если они есть
    const cleaned = cardNumber.replace(/\D/g, '');

    if (/^4/.test(cleaned)) {
        return 'visa';
    }

    // Мир проверяем раньше Mastercard, так как у них похожие начальные цифры (двойки)
    if (/^220[0-4]/.test(cleaned)) {
        return 'mir';
    }

    if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(cleaned)) {
        return 'mastercard';
    }

    if (/^3[47]/.test(cleaned)) {
        return 'amex';
    }

    if (/^(6011|65|64[4-9]|622)/.test(cleaned)) {
        return 'discover';
    }

    if (/^(352[89]|35[3-8])/.test(cleaned)) {
        return 'jcb';
    }

    if (/^(30[0-5]|36|38)/.test(cleaned)) {
        return 'diners';
    }

    return 'unknown';
}