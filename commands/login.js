const fs = require('fs');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../page-object-model/login.page');

// Load test data from JSON file
const testDataPath = 'testdata/data.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

class LoginTests {
    // Initialize page and loginPage objects
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
    }

    // Test: Successful login with valid credentials
    async positiveLoginTest() {
        await this.loginPage.gotoLoginPage();
        await this.loginPage.login(
            testData[1].login[0].username,
            testData[1].login[0].password
        );
        await expect(this.page).toHaveURL(testData[1].login[0].expect);
    }

    // Test: Login with invalid username should show error
    async negativeUsernameTest() {
        await this.loginPage.gotoLoginPage();
        await this.loginPage.login(
            testData[1].login[1].username,
            testData[1].login[1].password
        );
        await expect(this.loginPage.error_message).toContainText(testData[1].login[1].expect);
    }

    // Test: Login with invalid password should show error
    async negativePasswordTest() {
        await this.loginPage.gotoLoginPage();
        await this.loginPage.login(
            testData[1].login[2].username,
            testData[1].login[2].password
        );
        await expect(this.loginPage.error_message).toContainText(testData[1].login[2].expect);
    }

    // Test: Missing username should show appropriate error message
    async missingUsernameTest() {
        await this.loginPage.gotoLoginPage();
        await this.loginPage.login(
            testData[1].login[3].username,
            testData[1].login[3].password
        );
        await expect(this.loginPage.error_message).toContainText(testData[1].login[3].expect);
    }

    // Test: Missing password should show appropriate error message
    async missingPasswordTest() {
        await this.loginPage.gotoLoginPage();
        await this.loginPage.login(
            testData[1].login[4].username,
            testData[1].login[4].password
        );
        await expect(this.loginPage.error_message).toContainText(testData[1].login[4].expect);
    }
}

module.exports = { LoginTests };
