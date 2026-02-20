import {test, expect} from '@playwright/test';
import { loadTestData } from '../src/config/configReader';

const data = loadTestData();

test.describe('Regression Tests', () => {
    test('Login Valid -> Inventory loads', async ({ page, inventoryPage }) => {
        await loginPage.goto();
        await loginPage.login(data.users.valid.username, data.users.valid.password);

        await inventoryPage.assertLoaded();
    });

    test('Add item to cart from inventory', async ({ loginPage, inventoryPage }) => {
        await inventoryPage.goto();
        await inventoryPage.assertLoaded();

        await invetoryPage.addItemToCard('Sauce Labs Backpack');
        await inventoryPage.openCart();

        await expect(page).toHaveURL('/cart.html');
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    });

    test('Sort products by price low to high', async ({ loginPage, inventoryPage }) => {

})

