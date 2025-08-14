import {test} from '@playwright/test';
import * as loginTests from '../commands/login'

test.describe('Login Tests', () =>{
    test ('Positive Login test', async ({page}) =>{
        await loginTests.positiveLoginTest(page);
     });
     
     test ('Negative username test', async ({page}) =>{
         await loginTests.negativeUsernameTest(page);
     });
     
     test ('Negative password test', async ({page}) =>{
         await loginTests.negativePasswordTest(page);
         
     });

     test ('Missing username test', async ({page}) =>{
         await loginTests.missingUsernameTest(page);
     });
     
     test ('Missing password test', async ({page}) =>{
         await loginTests.missingPasswordTest(page);
         
     });
});


