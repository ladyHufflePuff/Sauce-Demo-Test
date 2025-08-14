import { test } from'@playwright/test';
import {LoginTests} from '../commands/login'
import { CheckoutTests } from'../commands/checkout';

test.describe('Checkout Tests', () => {
    let checkout, login;

    // Run before each test: initialize classes and perform a positive login
    test.beforeEach(async ({ page }) => {
        checkout = new CheckoutTests(page);
        login = new LoginTests(page)
        await login.positiveLoginTest();
    });

    // Test valid checkout flow
    test('Valid checkout', async () => {
        await checkout.validCheckoutTest();
    });

    // Test checkout without first name
    test('Missing first name test', async () => {
        await checkout.missingFirstNameTest();
    });

    // Test checkout without last name
    test('Missing last name test', async () => {
        await checkout.missingLastNameTest();
    });

    // Test checkout without zip code
    test('Missing zip code test', async () => {
        await checkout.missingZipTest();
    });

    // Test checkout with special characters in details
    test('Special characters in info test', async () => {
        await checkout.specialCharsCheckoutTest();
    });

    // Test checkout with empty cart
    test('Empty cart checkout test', async () => {
        await checkout.emptyCartCheckoutTest();
    });
});
