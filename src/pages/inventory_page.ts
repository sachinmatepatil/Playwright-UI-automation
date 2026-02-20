import {Page, Locator, expect} from '@playwright/test';

export class InventoryPage {
    readonly page: Page;

    readonly productsTitle: Locator;
    readonly inventoryItems: Locator;
    readonly sortDropdown: Locator;
    readonly cartLink: Locator; 
    readonly burgerMenuBtn: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page){
        this.page = page;

        this.productsTitle = page.getByText('Products');
        this.inventoryItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartLink = page.locator('.shopping_cart_link');
        this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');

    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async assertLoaded() {
        await expect(this.page).toHaveURL('/inventory.html');
        await expect(this.productsTitle).toBeVisible();
        await expect(this.inventoryItems.first()).toBeVisible();
    }
    
    async addItemToCard(itemName: string){
        const itemCard = this.page.locator('.inventory_item').filter({ hasText: itemName });
        await expect(itemCard).toBeVisible();
        await itemCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart() {
        await this.cartLink.click();
    }

    async sortBy(label: string) {
        await this.sortDropdown.selectOption({ label });
    }

    async logout() {
        await this.burgerMenuBtn.click();
        await this.logoutLink.click();
        await expect(this.page).toHaveURL('/index.html');
    }
}
