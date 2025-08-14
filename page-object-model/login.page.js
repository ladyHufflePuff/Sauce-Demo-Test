const fs = require('fs');

const testDataPath = 'testdata/data.json'
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'))

exports.LoginPage = class LoginPage{

    constructor(page){
        this.page = page;
        this.username_textbox = page.locator('[data-test="username"]');
        this.password_textbox = page.locator('[data-test="password"]');
        this.submit_button = page.locator('[data-test="login-button"]');
        this.error_message = page.locator('[data-test="error"]');
    }

    async gotoLoginPage() { 
        await this.page.goto(testData[0].page_url)
    }

    async login(username,password){
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(password)
        await this.submit_button.click()  
    }

}