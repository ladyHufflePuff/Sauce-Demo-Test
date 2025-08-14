const fs = require('fs');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../page-object-model/product.page');
const { CartPage } = require('../page-object-model/cart.page');

// Load test data from JSON file
const testDataPath = 'testdata/data.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

class CartTests {
    // Initialize page, productPage, and cartPage objects
    constructor(page) {
        this.page = page;
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
    }

    // Test: Add a single item to the cart and verify
    async addSingleItemToCartTest() {
        await this.productPage.addToCart(testData[2].products[0]);
        await this.productPage.goToCart();
        await expect(this.cartPage.getCartItemByName(testData[2].products[0])).toBeVisible();
    }

    // Test: Add multiple items to the cart and verify each
    async addMultipleItemsToCartTest() {
        const items = testData[2].products;
        for (const item of items) {
            await this.productPage.addToCart(item);
        }
        await this.productPage.goToCart();
        for (const item of items) {
            await expect(this.cartPage.getCartItemByName(item)).toBeVisible();
        }
    }

    // Test: Verify that an empty cart shows zero items
    async emptyCartTest() {
        await this.productPage.goToCart();
        await expect(this.cartPage.cart_items).toHaveCount(0);
    }

    // Test: Remove an item from the cart and verify remaining items
    async removeItemFromCartTest() {
        await this.productPage.addToCart(testData[2].products[0]);
        await this.productPage.addToCart(testData[2].products[2]);

        await this.productPage.goToCart();
        await this.cartPage.removeFromCart(testData[2].products[0]);

        await expect(this.cartPage.getCartItemByName(testData[2].products[2])).toBeVisible();
        await expect(this.cartPage.getCartItemByName(testData[2].products[0])).toHaveCount(0);
    }

    // Test: Verify cart persistence after navigating away and returning
    async cartPersistenceTest() {
        await this.addSingleItemToCartTest();
        await this.cartPage.continueShopping();

        await expect(this.productPage.getRemoveButtonForItem(testData[2].products[0])).toBeVisible();
        await expect(this.productPage.cart_badge).toHaveText('1');
    }
}

module.exports = { CartTests };
