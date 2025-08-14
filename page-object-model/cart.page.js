export class CartPage {
    // Initialize page and cart-related locators
    constructor(page) {
        this.page = page;
        this.cart_items = page.locator('.cart_item');
        this.checkout_button = page.locator('[data-test="checkout"]');
    }

    // Convert item name to a normalized ID string for selectors
    getIdName(itemName) {
        return itemName
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^a-z0-9().-]/g, '');  // Remove special characters
    }

     // Get a cart item locator by its visible name
    getCartItemByName(itemName) {
        return this.page.locator(`.cart_item:has-text("${itemName}")`);
    }

    // Remove a specific item from the cart using its data-test attribu
    async removeFromCart(itemName) {
        const idName = this.getIdName(itemName);

        await this.page.locator(`[data-test="remove-${idName}"]`).click();
    }

    // Click the "Continue Shopping" button
    async continueShopping() {
        await this.page.locator('[data-test="continue-shopping"]').click();
    }

    // Click the "Proceed to Checkout" button
     async proceedToCheckout() {
        await this.checkout_button.click();
    }
}
