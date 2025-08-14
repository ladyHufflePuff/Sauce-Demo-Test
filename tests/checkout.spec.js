import { test } from'@playwright/test';
import {LoginTests} from '../commands/login'
import { CheckoutTests } from'../commands/checkout';

test.describe('Checkout Tests', () => {
    let checkout, login;

    test.beforeEach(async ({ page }) => {
        checkout = new CheckoutTests(page);
        login = new LoginTests(page)
        await login.positiveLoginTest();
    });

    test('Valid checkout', async () => {
        await checkout.validCheckoutTest();
    });

    test('Missing first name test', async () => {
        await checkout.missingFirstNameTest();
    });

    test('Missing last name test', async () => {
        await checkout.missingLastNameTest();
    });

    test('Missing zip code test', async () => {
        await checkout.missingZipTest();
    });

    test('Special characters in info test', async () => {
        await checkout.specialCharsCheckoutTest();
    });

    test('Empty cart checkout test', async () => {
        await checkout.emptyCartCheckoutTest();
    });
});
