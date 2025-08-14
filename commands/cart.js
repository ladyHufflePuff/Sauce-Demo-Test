const fs = require('fs');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../page-object-model/login.page');
const { ProductPage } = require('../page-object-model/product.page');
const { CartPage } = require('../page-object-model/cart.page');

const testDataPath = 'testdata/data.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

async function loginValidUser(page) {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(testData[1].login[0].username, testData[1].login[0].password);
}

exports.addSingleItemToCartTest = async (page) => {
    await loginValidUser(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addToCart(testData[2].products[0]);
    await productPage.goToCart();
    await expect (cartPage.getCartItemByName(testData[2].products[0])).toBeVisible();
};

exports.addMultipleItemsToCartTest = async (page) => {
    await loginValidUser(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    const items = testData[2].products

    for (const item of items) {
        await productPage.addToCart(item);
    }

    await productPage.goToCart();
    for (const item of items) {
        await expect(cartPage.getCartItemByName(item)).toBeVisible();
    }
};

exports.emptyCartTest = async (page) => {
    await loginValidUser(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.goToCart();
    await expect(cartPage.cart_items).toHaveCount(0);
};

exports.removeItemFromCartTest = async (page) => {
    await loginValidUser(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addToCart(testData[2].products[0]);
    await productPage.addToCart(testData[2].products[2]);

    await productPage.goToCart();
    await cartPage.removeFromCart(testData[2].products[0]);

    await expect(cartPage.getCartItemByName(testData[2].products[2])).toBeVisible();
    await expect(cartPage.getCartItemByName(testData[2].products[0])).toHaveCount(0);
};

exports.cartPersistenceTest = async (page) => {
    await loginValidUser(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addToCart(testData[2].products[0]);
    await productPage.goToCart();
    await cartPage.continueShopping();

    await expect(productPage.getRemoveButtonForItem(testData[2].products[0])).toBeVisible();
    await expect(productPage.cart_badge).toHaveText('1');
};