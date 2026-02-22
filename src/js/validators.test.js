import { isValidLuhn } from './validators';

test.each([
    ['4111111111111111', true], // Валидная Visa
    ['5100000000000008', true], // Валидный Mastercard
    ['2200000000000004', true], // Валидный Мир
    ['4111111111111112', false], // Невалидная карта (ошибка в последней цифре)
    ['123', false], // Слишком короткий номер
    ['', false], // Пустая строка
    ['4111 1111 1111 1111', true], // Валидная карта с пробелами
])('checking Luhn algorithm for %s should be %s', (cardNumber, expected) => {
    const result = isValidLuhn(cardNumber);
    expect(result).toBe(expected);
});