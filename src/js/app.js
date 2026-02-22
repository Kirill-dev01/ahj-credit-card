import Widget from './Widget';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.validator-widget');
  if (container) {
    new Widget(container);
  }
});