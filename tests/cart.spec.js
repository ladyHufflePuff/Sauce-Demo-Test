import { test } from '@playwright/test';
import {LoginTests} from '../commands/login'
import { CartTests } from '../commands/cart';

test.describe('Cart Tests', () => {
    let cartTests, login;

    // Run before each test: initialize classes and perform a positive login
    test.beforeEach(async ({ page }) => {
        cartTests = new CartTests(page);
        login = new LoginTests(page)
        await login.positiveLoginTest();
    });

    // Test adding a single item to the cart
    test('Add single item to cart', async () => {
        await cartTests.addSingleItemToCartTest();
    });

    // Test adding multiple items to the cart
    test('Add multiple items to cart', async () => {
        await cartTests.addMultipleItemsToCartTest();
    });

    // Test behavior when the cart is empty
    test('Empty cart test', async () => {
        await cartTests.emptyCartTest();
    });

    // Test removing an item from the cart
    test('Remove item from cart', async () => {
        await cartTests.removeItemFromCartTest();
    });

    // Test that cart persists items when navigating back to products
    test('Cart persistence test', async () => {
        await cartTests.cartPersistenceTest();
    });
});
