import Widget from './Widget';

describe('Widget DOM testing', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <div class="validator-widget">
        <ul class="cards-list">
          <li><img class="card-logo visa" alt="Visa"></li>
        </ul>
        <form class="validator-form">
          <input type="text" class="validator-input" required>
          <button type="submit" class="validator-btn">Validate</button>
        </form>
        <div class="validator-message"></div>
      </div>
    `;
    });

    // Проверяем сразу два варианта: валидный и невалидный номер
    test.each([
        ['4111111111111111', 'Valid card number!', 'valid'],
        ['4111111111111112', 'Invalid card number!', 'invalid'],
    ])('should show correct message and class for %s', (cardNumber, expectedText, expectedClass) => {
        // 1. Инициализируем наш виджет
        const container = document.querySelector('.validator-widget');
        const widget = new Widget(container);

        // 2. Вводим номер в инпут
        widget.input.value = cardNumber;

        // 3. Симулируем отправку формы (нажатие кнопки)
        widget.form.dispatchEvent(new Event('submit'));

        // 4. Проверяем, что текст сообщения и цвет (класс) правильные
        expect(widget.message.textContent).toBe(expectedText);
        expect(widget.message.classList.contains(expectedClass)).toBeTruthy();
    });
});