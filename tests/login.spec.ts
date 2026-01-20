import { test, expect } from './baseTest';
import { loadTestData } from '../src/config/configReader';

const data = loadTestData();

test.describe('Login Tests with Fixtures', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();   // runs before each test
  });

  test.afterEach(async ({ page }) => {
    console.log('Test completed');
  });

  test('Valid login using fixtures', async ({ loginPage, page }) => {
    await loginPage.login(data.users.valid.username, data.users.valid.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('Invalid login using fixtures', async ({ loginPage }) => {
    await loginPage.login(data.users.invalid.username, data.users.invalid.password);
    await loginPage.assertError('Username and password do not match');
  });

});
