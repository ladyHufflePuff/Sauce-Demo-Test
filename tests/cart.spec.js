import { test } from '@playwright/test';
import {LoginTests} from '../commands/login'
import { CartTests } from '../commands/cart';

test.describe('Cart Tests', () => {
    let cartTests, login;

    test.beforeEach(async ({ page }) => {
        cartTests = new CartTests(page);
        login = new LoginTests(page)
        await login.positiveLoginTest();
    });

    test('Add single item to cart', async () => {
        await cartTests.addSingleItemToCartTest();
    });

    test('Add multiple items to cart', async () => {
        await cartTests.addMultipleItemsToCartTest();
    });

    test('Empty cart test', async () => {
        await cartTests.emptyCartTest();
    });

    test('Remove item from cart', async () => {
        await cartTests.removeItemFromCartTest();
    });

    test('Cart persistence test', async () => {
        await cartTests.cartPersistenceTest();
    });
});
