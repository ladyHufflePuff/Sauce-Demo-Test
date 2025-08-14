const fs = require('fs');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../page-object-model/login.page');

const testDataPath = 'testdata/data.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

exports.positiveLoginTest = async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(testData[1].login[0].username, testData[1].login[0].password);
    await expect(page).toHaveURL(testData[1].login[0].expect); 
};

exports.negativeUsernameTest = async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(testData[1].login[1].username, testData[1].login[1].password);
    await expect(loginPage.error_message).toContainText(testData[1].login[1].expect);
};

exports.negativePasswordTest = async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(testData[1].login[2].username, testData[1].login[2].password);
    await expect(loginPage.error_message).toContainText(testData[1].login[2].expect);
};

exports.missingUsernameTest = async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(testData[1].login[3].username, testData[1].login[3].password);
    await expect(loginPage.error_message).toContainText(testData[1].login[3].expect);
};

exports.missingPasswordTest = async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(testData[1].login[4].username, testData[1].login[4].password);
    await expect(loginPage.error_message).toContainText(testData[1].login[4].expect);
};
