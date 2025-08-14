const fs = require('fs');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../page-object-model/login.page');
const {ProductPage} = require('../page-object-model/product.page');

const testDataPath = 'testdata/data.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));


async function login(page) {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(
        testData[1].login[0].username,
        testData[1].login[0].password
    );

    return productPage;
}

exports.productImagesVisibleTest = async (page) => {
    const productPage = await login(page);
    const products = testData[2].products

    for (const name of products) {
        const image = productPage.getItemImage(name);
        await expect(image).toBeVisible();
        await expect(image).toHaveAttribute('src', /.+/);
    }
};

exports.productNamesVisibleTest = async (page) => {
    const productPage = await login(page);

    const count = await productPage.product_names.count();
    for (let i = 0; i < count; i++) {
        const name = await productPage.product_names.nth(i).textContent();
        expect(name.trim().length).toBeGreaterThan(0);
        expect(/^[A-Za-z0-9\s-]+$/.test(name)
).toBe(true);
    }
};

exports.productDescriptionsVisibleTest = async (page) => {
    const productPage = await login(page);

    const count = await productPage.product_descriptions.count();
    for (let i = 0; i < count; i++) {
        const desc = await productPage.product_descriptions.nth(i).textContent();
        expect(desc.trim().length).toBeGreaterThan(0);
        expect(/^[A-Za-z0-9\s,.'"()!-]+$/.test(desc)).toBe(true); 
    }
};
