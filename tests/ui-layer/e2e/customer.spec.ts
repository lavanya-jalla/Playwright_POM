import { test, expect } from '../utils/PageFixture';
import { customerTestData } from '../testdata/customerTestData';
import { customerInvalidTestData } from '../testdata/customerTestData';
import dotenv from 'dotenv'
dotenv.config();

test.describe('Customer Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.doLogin(process.env.GURU99_USERNAME!, process.env.GURU99_PASSWORD!);
  });

    test.afterEach(async ({ logoutPage }) => {
    await logoutPage.doLogout();
  });

  test('@customer @customer_creation @regression @fast Verify New Customer Form Submission', async ({customerPage}) => {
    await customerPage.navigateToNewCustomerPage();
   await customerPage.fillCustomerForm(customerTestData);
    await customerPage.clickSubmitBtn();
    await customerPage.successRegistrationMsgValidation();
    const customerId=await customerPage.getCustomerId()
    console.log(`Customer ID: ${customerId}`)
  });

   test('@customer @customer_creation @regression @fast Verify New Customer Form Submission with 5 digits PINCODE error message', async ({customerPage}) => {
    await customerPage.navigateToNewCustomerPage();
    const date=new Date();
    await customerPage.fillCustomerForm(customerInvalidTestData);
    await customerPage.clickSubmitBtn();
    await customerPage.invalidPinCodeErrorMessage('PIN Code must have 6 Digits');
  });
  test('@customer @customer_creation @regression @fast Submit form without filling and verify alert message',async({customerPage,page})=>{
     await customerPage.navigateToNewCustomerPage();
     page.once('dialog',async dialog=>{
        expect(dialog.message()).toContain('please fill all fields')
        dialog.accept();
     })
      await customerPage.clickSubmitBtn();
  })
});

