import { getPaymentSystem } from './paymentSystem';

test.each([
    ['4111111111111111', 'visa'], // Начинается с 4
    ['5500000000000008', 'mastercard'], // Начинается с 55
    ['2202000000000004', 'mir'], // Начинается с 2202
    ['340000000000000', 'amex'], // Начинается с 34
    ['6011000000000000', 'discover'], // Начинается с 6011
    ['3528000000000000', 'jcb'], // Начинается с 3528
    ['30000000000000', 'diners'], // Начинается с 300
    ['1234567890123456', 'unknown'], // Неизвестный префикс
])('payment system for card %s should be %s', (cardNumber, expected) => {
    const result = getPaymentSystem(cardNumber);
    expect(result).toBe(expected);
});