import {test} from '@playwright/test';
import {LoginTests} from '../commands/login'
import {ProductTests} from '../commands/product'

test.describe('UI Tests', () => {
    let products, login;

    // Run before each test: initialize classes and perform a positive login
    test.beforeEach(async ({ page }) => {
        products = new ProductTests(page);
        login = new LoginTests(page)
        await login.positiveLoginTest();
    });

    // Verify all product images are visible
    test('Visible product image test', async () => {
        await products.productImagesVisibleTest();
    });

    // Verify all product names are visible
    test('Visible product name test', async () => {
        await products.productNamesVisibleTest();
    });

    // Verify all product descriptions are visible
    test('Visible product description test', async () => {
        await products.productDescriptionsVisibleTest();
    });
});
