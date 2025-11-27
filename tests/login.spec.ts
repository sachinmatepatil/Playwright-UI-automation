import { test, expect } from './baseTest';

test.describe('Login Tests with Fixtures', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();   // runs before each test
  });

  test.afterEach(async ({ page }) => {
    console.log('Test completed');
  });

  test('Valid login using fixtures', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Invalid login using fixtures', async ({ loginPage }) => {
    await loginPage.login('wrong', 'wrong');
    await loginPage.assertError('Username and password do not match');
  });

});
