export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName_input = page.locator('[data-test="firstName"]');
        this.lastName_input = page.locator('[data-test="lastName"]');
        this.zip_input = page.locator('[data-test="postalCode"]');
        this.continue_button = page.locator('[data-test="continue"]');
        this.finish_button = page.locator('[data-test="finish"]');
        this.error_message = page.locator('[data-test="error"]');
        this.order_confirmation = page.locator('[data-test="checkout-complete-container"]');
    }

    async fillCheckoutInfo(firstName, lastName, zip) {
        await this.firstName_input.fill(firstName);
        await this.lastName_input.fill(lastName);
        await this.zip_input.fill(zip);
    }

    async continueCheckout() {
        await this.continue_button.click();
    }

    async finishCheckout() {
        await this.finish_button.click();
    }
};
