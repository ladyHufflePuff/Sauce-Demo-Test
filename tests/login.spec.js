import {test} from '@playwright/test';
import {LoginTests} from '../commands/login'

test.describe('Login Tests', () =>{
    let loginTests;

    test.beforeEach(async ({ page }) => {
        loginTests = new LoginTests(page);
    });

   test('Positive Login test', async () => {
        await loginTests.positiveLoginTest();
    });

    test('Negative username test', async () => {
        await loginTests.negativeUsernameTest();
    });

    test('Negative password test', async () => {
        await loginTests.negativePasswordTest();
    });

    test('Missing username test', async () => {
        
        await loginTests.missingUsernameTest();
    });

    test('Missing password test', async () => {
        await loginTests.missingPasswordTest();
    });
});

