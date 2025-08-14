const fs = require('fs');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../page-object-model/login.page');
const { CartPage } = require('../page-object-model/cart.page');
const { CheckoutPage } = require('../page-object-model/checkout.page');
const { ProductPage } = require('../page-object-model/product.page');

const testData = JSON.parse(fs.readFileSync('testdata/data.json', 'utf8'));

async function login(page) {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(
        testData[1].login[0].username,
        testData[1].login[0].password
    );
}

async function addItemAndCheckout(page, product) {
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page)
    await productPage.addToCart(product);
    await productPage.goToCart();
    await cartPage.proceedToCheckout();
}

async function loginAndAddItem(page) {
    await login(page);
    await addItemAndCheckout(page, testData[2].products[0]);
}


exports.validCheckoutTest = async (page) => {
    await loginAndAddItem(page);
    const checkoutPage = new CheckoutPage(page);

    const data = testData[3].checkout[0];
    await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();
    await expect(checkoutPage.order_confirmation).toHaveText(/Thank you for your order/i);
};

exports.missingFirstNameTest = async (page) => {
    await loginAndAddItem(page);
    const checkoutPage = new CheckoutPage(page);

    const data = testData[3].checkout[1];
    await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.error_message).toContainText('Error: First Name is required');
};

exports.missingLastNameTest = async (page) => {
    await loginAndAddItem(page);
    const checkoutPage = new CheckoutPage(page);

    const data = testData[3].checkout[2];
    await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.error_message).toContainText('Error: Last Name is required');
};

exports.missingZipTest = async (page) => {
    await loginAndAddItem(page);
    const checkoutPage = new CheckoutPage(page);

    const data = testData[3].checkout[3];
    await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.error_message).toContainText('Error: Postal Code is required');
};

exports.specialCharsCheckoutTest = async (page) => {
    await loginAndAddItem(page);
    const checkoutPage = new CheckoutPage(page);

    const data = testData[3].checkout[4];
    await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.zip);
    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();
    await expect(checkoutPage.order_confirmation).toHaveText(/Error: Invalid information/i);
};


exports.emptyCartCheckoutTest = async (page) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await login(page);

    await expect(cartPage.cart_items).toHaveCount(0);

    await expect (checkoutPage.error_message).toBeVisible();
    await expect(checkoutPage.error_message).toHaveText(/Your cart is empty|No items in cart/i);
};
