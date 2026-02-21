import { test as base, chromium, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login_page.ts';
import { InventoryPage } from '../src/pages/inventory_page.ts';
type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

// Extend base test by providing "loginPage" fixture.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  
  // Reusable browser fixture
  // browser: async ({}, use) => {
  //   const browser = await chromium.launch({ headless: false });
  //   await use(browser);   // give browser to tests
  //   await browser.close();
  // },

  // // Reusable page fixture
  // page: async ({ browser }, use) => {
  //   const page = await browser.newPage();
  
  //   await use(page);
  //   await page.close();
  // },

  // Reusable loginPage fixture
  loginPage: async ({ page }, use) => {
    // const loginPage = new LoginPage(page);
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    // const inventoryPage = new InventoryPage(page);
    await use(new InventoryPage(page));
  }

});

// Export expect also
export { expect };
