const fs = require('fs');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../page-object-model/product.page');

const testData = JSON.parse(fs.readFileSync('testdata/data.json', 'utf8'));

class ProductTests {
    constructor(page) {
        this.page = page;
        this.productPage = new ProductPage(page);
    }

    async productImagesVisibleTest() {
        const products = testData[2].products;

        for (const name of products) {
            const image = this.productPage.getItemImage(name);
            await expect(image).toBeVisible();
            await expect(image).toHaveAttribute('src', /.+/);
        }
    }

    async productNamesVisibleTest() {
        const count = await this.productPage.product_names.count();
        for (let i = 0; i < count; i++) {
            const name = await this.productPage.product_names.nth(i).textContent();
            expect(name.trim().length).toBeGreaterThan(0);
            expect(/^[A-Za-z0-9\s-]+$/.test(name)).toBe(true);
        }
    }

    async productDescriptionsVisibleTest() {
        const count = await this.productPage.product_descriptions.count();
        for (let i = 0; i < count; i++) {
            const desc = await this.productPage.product_descriptions.nth(i).textContent();
            expect(desc.trim().length).toBeGreaterThan(0);
            expect(/^[A-Za-z0-9\s,.'"()!-]+$/.test(desc)).toBe(true);
        }
    }
}

module.exports = { ProductTests };
