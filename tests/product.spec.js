import {test} from '@playwright/test';
import * as productTests from '../commands/product'

test.describe('UI Tests', () =>{
    test ('Visible product image test', async ({page}) =>{
        await productTests.productImagesVisibleTest(page);
     });
     
     test ('Visible product Name test', async ({page}) =>{
         await productTests.productNamesVisibleTest(page);
     });
     
     test ('Visible product description test', async ({page}) =>{
         await productTests.productDescriptionsVisibleTest(page);
         
     });


});


