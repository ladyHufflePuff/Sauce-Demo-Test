export class CartPage {
    constructor(page) {
        this.page = page;
        this.cart_items = page.locator('.cart_item');
        this.checkout_button = page.locator('[data-test="checkout"]');
    }

    getIdName(itemName) {
        return itemName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9().-]/g, '');
    }

    getCartItemByName(itemName) {
        return this.page.locator(`.cart_item:has-text("${itemName}")`);
    }

    async removeFromCart(itemName) {
        const idName = this.getIdName(itemName);

        await this.page.locator(`[data-test="remove-${idName}"]`).click();
    }

    async continueShopping() {
        await this.page.locator('[data-test="continue-shopping"]').click();
    }

     async proceedToCheckout() {
        await this.checkout_button.click();
    }
}
