import { test } from '@playwright/test';
import * as checkoutTests from '../commands/checkout';

test.describe('Checkout Tests', () => {
    test('Valid checkout', async ({ page }) => {
        await checkoutTests.validCheckoutTest(page);
    });

    test('Missing first name test', async ({ page }) => {
        await checkoutTests.missingFirstNameTest(page);
    });

    test('Missing last name test', async ({ page }) => {
        await checkoutTests.missingLastNameTest(page);
    });

    test('Missing zip code test', async ({ page }) => {
        await checkoutTests.missingZipTest(page);
    });

    test('Special characters in info test', async ({ page }) => {
        await checkoutTests.specialCharsCheckoutTest(page);
    });

     test('Empty cart checkout test', async ({ page }) => {
        await checkoutTests.emptyCartCheckoutTest(page);
    });
});
