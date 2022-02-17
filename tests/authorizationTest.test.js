const { test, expect } = require('@playwright/test');
const user = require('../user');

test.beforeEach('Go to the starting url', async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
});

test.describe('Authorization', () => {
    test('Authorization with valid data', async ({ page }) => {
        await page.locator('[placeholder="Email"]').fill(user.validUser);
        await page.locator('[placeholder="Пароль"]').fill(user.validPassword);
        await page.locator('button:has-text("Войти")').click();
        await expect(page).toHaveURL('https://netology.ru/profile');
        await expect(
            page.locator('.components-pages-Profile-Programs--title--NCjbp')
        ).toHaveText('Мои курсы и профессии');
    });
    test('Authorization with invalid data', async ({ page }) => {
        await page.locator('[placeholder="Email"]').fill(user.invalidUser);
        await page.locator('[placeholder="Пароль"]').fill(user.invalidPassword);
        await page.locator('button:has-text("Войти")').click();
        await expect(page.locator('[placeholder="Email"] > div')).toHaveText(
            'Вы ввели неправильно логин или пароль'
        );
    });
});

// npx playwright codegen https://netology.ru/?modal=sign_in

/* const browser = await chromium.launch({
        headless: false,
        slowMo: 5000,
    }); */
/* const page = await browser.newPage();  */
