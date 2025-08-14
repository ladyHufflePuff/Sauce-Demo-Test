const fs = require('fs');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../page-object-model/product.page');
const { CartPage } = require('../page-object-model/cart.page');
import { CartTests } from '../commands/cart';
const { CheckoutPage } = require('../page-object-model/checkout.page');

// Load test data from JSON file
const testData = JSON.parse(fs.readFileSync('testdata/data.json', 'utf8'));

class CheckoutTests {
    // Initialize page, productPage, cartPage, cartTests, and checkoutPage objects
    constructor(page) {
        this.page = page;
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.cartTests = new CartTests(page);
        this.checkoutPage = new CheckoutPage(page);
    }

    // Helper: Add a single item to the cart and proceed to checkout
    async addItemToCart() {
        await this.cartTests.addSingleItemToCartTest();
        await this.cartPage.proceedToCheckout();
    }

    // Test: Perform valid checkout and verify order confirmation
    async validCheckoutTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[0];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await this.checkoutPage.finishCheckout();
        await expect(this.checkoutPage.order_confirmation).toHaveText(/Thank you for your order/i);
    }

    // Test: Missing first name should show appropriate error message

    async missingFirstNameTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[1];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await expect(this.checkoutPage.error_message).toContainText('Error: First Name is required');
    }

    // Test: Missing last name should show appropriate error message
    async missingLastNameTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[2];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await expect(this.checkoutPage.error_message).toContainText('Error: Last Name is required');
    }

    // Test: Missing ZIP code should show appropriate error message
    async missingZipTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[3];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await expect(this.checkoutPage.error_message).toContainText('Error: Postal Code is required');
    }

    // Test: Using special characters in checkout info should show error
    async specialCharsCheckoutTest() {
        await this.addItemToCart();
        const data = testData[3].checkout[4];
        await this.checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
        await this.checkoutPage.continueCheckout();
        await this.checkoutPage.finishCheckout();
        await expect(this.checkoutPage.order_confirmation).toHaveText(/Error: Invalid information/i);
    }

    // Test: Checkout with empty cart should show appropriate error message
    async emptyCartCheckoutTest() {
        await expect(this.cartPage.cart_items).toHaveCount(0);
        await expect(this.checkoutPage.error_message).toBeVisible();
        await expect(this.checkoutPage.error_message).toHaveText(/Your cart is empty|No items in cart/i);
    }
}

module.exports = { CheckoutTests };
