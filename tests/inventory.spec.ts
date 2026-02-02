import { test, expect } from '@playwright/test';

test.describe('Inventory (requires storageState)', () => {
  test('user is already logged in and inventory page is visible', async ({ page }) => {
    // Go directly to inventory page (storageState should keep you logged in)
    await page.goto('/inventory.html');

    // Strong, reliable assertions
    await expect(page).toHaveURL(/inventory\.html/);

    // SauceDemo Inventory page header
    await expect(page.getByText('Products')).toBeVisible();

    // A couple more sanity checks (optional but helpful)
    await expect(page.getByRole('button', { name: /add to cart/i }).first()).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6); // SauceDemo shows 6 items by default
  });
});
