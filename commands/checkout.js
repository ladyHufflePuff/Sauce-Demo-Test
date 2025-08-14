const fs = require('fs');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../page-object-model/product.page');
const { CartPage } = require('../page-object-model/cart.page');
import { CartTests } from '../commands/cart';
const { CheckoutPage } = require('../page-object-model/checkout.page');

const testData = JSON.parse(fs.readFileSync('testdata/data.json', 'utf8'));

class CheckoutTests {
    constructor(page) {
        this.page = page;
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.cartTests = new CartTests(page);
        this.checkoutPage = new CheckoutPage(page);
    }

    async addItemToCart() {
        await this.cartTests.addSingleItemToCartTest();
        await this.cartPage.proceedToCheckout();
    }

    async validCheckoutTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[0];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await this.checkoutPage.finishCheckout();
        await expect(this.checkoutPage.order_confirmation).toHaveText(/Thank you for your order/i);
    }

    async missingFirstNameTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[1];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await expect(this.checkoutPage.error_message).toContainText('Error: First Name is required');
    }

    async missingLastNameTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[2];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await expect(this.checkoutPage.error_message).toContainText('Error: Last Name is required');
    }

    async missingZipTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[3];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await expect(this.checkoutPage.error_message).toContainText('Error: Postal Code is required');
    }

    async specialCharsCheckoutTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[4];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await this.checkoutPage.finishCheckout();
        await expect(this.checkoutPage.order_confirmation).toHaveText(/Error: Invalid information/i);
    }

    async emptyCartCheckoutTest() {
        await expect(this.cartPage.cart_items).toHaveCount(0);
        await expect(this.checkoutPage.error_message).toBeVisible();
        await expect(this.checkoutPage.error_message).toHaveText(/Your cart is empty|No items in cart/i);
    }
}

module.exports = { CheckoutTests };
