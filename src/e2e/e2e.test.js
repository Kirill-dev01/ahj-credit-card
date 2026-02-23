/**
 * @jest-environment node
 */

import puppeteer from 'puppeteer';

describe('Credit Card Validator e2e', () => {
  let browser;
  let page;

  // Перед всеми тестами запускаем браузер
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'], 
    });
    page = await browser.newPage();
  });

  // После всех тестов закрываем браузер
  afterAll(async () => {
    await browser.close();
  });

  test('should validate valid card', async () => {
    await page.goto('http://localhost:8080');
    await page.waitForSelector('.validator-widget');

    // Находим инпут и вводим правильный номер
    const input = await page.$('.validator-input');
    await input.type('4111111111111111');

    // Кликаем по кнопке
    const submit = await page.$('.validator-btn');
    await submit.click();

    // Ждем появления зеленого сообщения об успехе
    await page.waitForSelector('.validator-message.valid');
    
    // Делаем линтер счастливым (чтобы не было ошибки "Test has no assertions")
    expect(true).toBe(true);
  });

  test('should invalidate invalid card', async () => {
    await page.goto('http://localhost:8080');
    await page.waitForSelector('.validator-widget');

    // Вводим номер с ошибкой
    const input = await page.$('.validator-input');
    await input.type('4111111111111112');

    // Кликаем по кнопке
    const submit = await page.$('.validator-btn');
    await submit.click();

    // Ждем появления красного сообщения об ошибке
    await page.waitForSelector('.validator-message.invalid');
    
    // Делаем линтер счастливым
    expect(true).toBe(true);
  });
});
