export class ProductPage{
    // Initialize page and product-related locators
    constructor(page){
        this.page = page;
        this.cart_icon = page.locator('[data-test="shopping-cart-link"]');
        this.cart_badge = page.locator('[data-test="shopping-cart-badge"]');
        ;
        this.product_items = page.locator('[data-test="inventory_item"]');
        this.product_names = page.locator('.inventory_item_name');
        this.product_descriptions = page.locator('.inventory_item_desc')
    }

    // Convert item name to a normalized ID string for selectors
    getIdName(itemName) {
        return itemName
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^a-z0-9().-]/g, ''); // Remove special characters
    }

    // Get product image locator by normalized item name
   getItemImage(itemName) {
        const idName = this.getIdName(itemName);
        return this.page.locator(`[data-test="inventory-item-${idName}-img"]`);
    }

    // Click the "Add to Cart" button for a specific product
    async addToCart(itemName) { 
        const idName = this.getIdName(itemName);
        await this.page.locator(`[data-test="add-to-cart-${idName}"]`).click();
    }

    // Click on the cart icon to navigate to the cart page
    async goToCart() {
        await this.cart_icon.click();
    }

    // Get the "Remove" button locator for a specific product
    getRemoveButtonForItem(itemName){
        const idName = this.getIdName(itemName);
        return this.page.locator(`[data-test="remove-${idName}"]`);
    }

}