export class CheckoutPage {
    // Initialize page and checkout-related locators
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

    // Fill in checkout information (first name, last name, zip)
    async fillCheckoutInfo(firstName, lastName, zip) {
        await this.firstName_input.fill(firstName);
        await this.lastName_input.fill(lastName);
        await this.zip_input.fill(zip);
    }

    // Click the "Continue" button during checkout
    async continueCheckout() {
        await this.continue_button.click();
    }

    // Click the "Finish" button to complete checkout
    async finishCheckout() {
        await this.finish_button.click();
    }
};
