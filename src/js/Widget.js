import { isValidLuhn } from './validators';
import { getPaymentSystem } from './paymentSystem';

export default class Widget {
    constructor(container) {
        this.container = container;
        // Находим все нужные элементы внутри контейнера
        this.input = this.container.querySelector('.validator-input');
        this.form = this.container.querySelector('.validator-form');
        this.message = this.container.querySelector('.validator-message');
        this.logos = this.container.querySelectorAll('.card-logo');

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.onSubmit(e));
        this.input.addEventListener('input', () => this.onInput());
    }

    onInput() {
        const value = this.input.value;
        const system = getPaymentSystem(value);

        this.logos.forEach(logo => {
            // Если поле пустое или система неизвестна — показываем все карты
            if (system === 'unknown' || value === '') {
                logo.classList.remove('inactive');
            } else {
                // Оставляем яркой только ту карту, класс которой совпадает с системой
                if (logo.classList.contains(system)) {
                    logo.classList.remove('inactive');
                } else {
                    logo.classList.add('inactive'); // Остальные делаем тусклыми
                }
            }
        });

        // Очищаем сообщение об ошибке/успехе, когда пользователь начинает печатать заново
        this.message.textContent = '';
        this.message.className = 'validator-message';
    }

    onSubmit(e) {
        e.preventDefault(); // Останавливаем перезагрузку страницы
        const value = this.input.value;

        if (isValidLuhn(value)) {
            this.message.textContent = 'Valid card number!';
            this.message.classList.add('valid');
            this.message.classList.remove('invalid');
        } else {
            this.message.textContent = 'Invalid card number!';
            this.message.classList.add('invalid');
            this.message.classList.remove('valid');
        }
    }
}