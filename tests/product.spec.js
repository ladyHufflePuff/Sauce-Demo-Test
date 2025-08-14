import {test} from '@playwright/test';
import {LoginTests} from '../commands/login'
import {ProductTests} from '../commands/product'

test.describe('UI Tests', () => {
    let products, login;

    test.beforeEach(async ({ page }) => {
        products = new ProductTests(page);
        login = new LoginTests(page)
        await login.positiveLoginTest();
    });

    test('Visible product image test', async () => {
        await products.productImagesVisibleTest();
    });

    test('Visible product name test', async () => {
        await products.productNamesVisibleTest();
    });

    test('Visible product description test', async () => {
        await products.productDescriptionsVisibleTest();
    });
});
