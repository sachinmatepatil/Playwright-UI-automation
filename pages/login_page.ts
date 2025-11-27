import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  username = this.page.getByPlaceholder('Username');
  password = this.page.getByPlaceholder('Password');
  loginBtn = this.page.getByRole('button', { name: 'Login' });
  errorMsg = this.page.locator('[data-test="error"]');

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async assertError(message: string) {
    await expect(this.errorMsg).toContainText(message);
  }
}
