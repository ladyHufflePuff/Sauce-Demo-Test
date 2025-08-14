const fs = require('fs');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../page-object-model/product.page');
const { CartPage } = require('../page-object-model/cart.page');

const testDataPath = 'testdata/data.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

class CartTests {
    constructor(page) {
        this.page = page;
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
    }

    async addSingleItemToCartTest() {
        await this.productPage.addToCart(testData[2].products[0]);
        await this.productPage.goToCart();
        await expect(this.cartPage.getCartItemByName(testData[2].products[0])).toBeVisible();
    }

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

    async emptyCartTest() {
        await this.productPage.goToCart();
        await expect(this.cartPage.cart_items).toHaveCount(0);
    }

    async removeItemFromCartTest() {
        await this.productPage.addToCart(testData[2].products[0]);
        await this.productPage.addToCart(testData[2].products[2]);

        await this.productPage.goToCart();
        await this.cartPage.removeFromCart(testData[2].products[0]);

        await expect(this.cartPage.getCartItemByName(testData[2].products[2])).toBeVisible();
        await expect(this.cartPage.getCartItemByName(testData[2].products[0])).toHaveCount(0);
    }

    async cartPersistenceTest() {
        await this.addSingleItemToCartTest();
        await this.cartPage.continueShopping();

        await expect(this.productPage.getRemoveButtonForItem(testData[2].products[0])).toBeVisible();
        await expect(this.productPage.cart_badge).toHaveText('1');
    }
}

module.exports = { CartTests };
