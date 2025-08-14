import {test} from '@playwright/test';
import * as cartTests from '../commands/cart'

test.describe('Cart Tests', () =>{
    test ('Add single item to cart test', async ({page}) =>{
        await cartTests.addSingleItemToCartTest(page);
     });
     
     test ('Add multiple items to cart test', async ({page}) =>{
         await cartTests.addMultipleItemsToCartTest(page);
     });
     
     test ('Empty cart test', async ({page}) =>{
         await cartTests.emptyCartTest(page);
         
     });

     test ('Remove an item from cart test', async ({page}) =>{
         await cartTests.removeItemFromCartTest(page);
     });
     
     test ('Cart persistence test', async ({page}) =>{
         await cartTests.cartPersistenceTest(page);
         
     });
});


