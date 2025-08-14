import {test} from '@playwright/test';
import {LoginTests} from '../commands/login'

test.describe('Login Tests', () =>{
    let loginTests;

    // Run before each test: initialize login class
    test.beforeEach(async ({ page }) => {
        loginTests = new LoginTests(page);
    });

    // Verify successful login with correct credentials
   test('Positive Login test', async () => {
        await loginTests.positiveLoginTest();
    });

    // Verify login fails with incorrect username
    test('Negative username test', async () => {
        await loginTests.negativeUsernameTest();
    });

    // Verify login fails with incorrect password
    test('Negative password test', async () => {
        await loginTests.negativePasswordTest();
    });

    // Verify login fails when username is missing
    test('Missing username test', async () => {
        
        await loginTests.missingUsernameTest();
    });

    // Verify login fails when password is missing
    test('Missing password test', async () => {
        await loginTests.missingPasswordTest();
    });
});

