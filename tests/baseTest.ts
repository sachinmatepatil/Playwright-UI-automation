import { test as base, chromium, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page/';
type MyFixtures = {
  loginPage: LoginPage;
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

});

// Export expect also
export { expect };
