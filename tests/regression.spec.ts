import {test, expect} from './baseTest';
import { loadTestData } from '../src/config/configReader';


const data = loadTestData();

test.describe('Regression Tests', () => {
    test('Login Valid -> Inventory loads', async ({ loginPage, inventoryPage }) => {
        await loginPage.goto();
        await loginPage.login(data.users.valid.username, data.users.valid.password);

        await inventoryPage.assertLoaded();
    });

    test('Add item to cart from inventory', async ({ page, inventoryPage }) => {
        await inventoryPage.goto();
        await inventoryPage.assertLoaded();

        await inventoryPage.addItemToCard('Sauce Labs Backpack');
        await inventoryPage.openCart();

        await expect(page).toHaveURL('/cart.html');
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    });

    test('Sort products by price low to high', async ({ page, inventoryPage }) => {
        await inventoryPage.goto();
        await inventoryPage.assertLoaded();

        await inventoryPage.sortBy('Price (low to high)');
        
        const prices = page.locator('.inventory_item_price');

        const first = Number((await prices.nth(0).innerText()).replace('$', ''));
        const second = Number((await prices.nth(1).innerText()).replace('$', ''));

    expect(first).toBeLessThanOrEqual(second);});

});