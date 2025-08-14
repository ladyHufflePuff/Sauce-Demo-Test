export class ProductPage{

    constructor(page){
        this.page = page;
        this.cart_icon = page.locator('[data-test="shopping-cart-link"]');
        this.cart_badge = page.locator('[data-test="shopping-cart-badge"]');
        ;
        this.product_items = page.locator('[data-test="inventory_item"]');
        this.product_names = page.locator('.inventory_item_name');
        this.product_descriptions = page.locator('.inventory_item_desc')
    }

    getIdName(itemName) {
        return itemName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9().-]/g, '');
    }




    async addToCart(itemName) { 
        const idName = this.getIdName(itemName);
        await this.page.locator(`[data-test="add-to-cart-${idName}"]`).click();
    }

    async goToCart() {
        await this.cart_icon.click();
    }

    getRemoveButtonForItem(itemName){
        const idName = this.getIdName(itemName);
        return this.page.locator(`[data-test="remove-${idName}"]`);

    }

}