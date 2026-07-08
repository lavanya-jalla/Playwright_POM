import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { CustomerPage } from '../pages/customerPage';

test.describe('Customer Tests', () => {

  let customerPage: CustomerPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);
    await loginPage.doLogin('mngr663755', 'zytytYs');
  });

  test('Verify New Customer Page Navigation', async () => {
    await customerPage.navigateToNewCustomerPage();
  });

  test('Verify New Customer Form Submission', async ({page}) => {
    await customerPage.navigateToNewCustomerPage();
    await customerPage.fillCustomerForm('Lavanya Jalla','female','2004-05-02','Manchi Kanti Nagar','Khammam','Telangana','507003','9002020200',`lavanya${Date.now()}@gmail.com`,'1234@');
    await customerPage.clickSubmitBtn();
    await customerPage.successRegistrationMsgValidation();
    const customerId=await customerPage.getCustomerId()
    console.log(`Customer ID: ${customerId}`)
  });

   test('Verify New Customer Form Submission with 5 digits PINCODE error message', async ({page}) => {
    await customerPage.navigateToNewCustomerPage();
    const date=new Date();
    await customerPage.fillCustomerForm('Ram','male','2004-05-02','Manchi Kanti Nagar','Khammam','Telangana','50700','9002020200','lavanya@gmail.com'+date.toString(),'1234@');
    await customerPage.clickSubmitBtn();
    await customerPage.invalidPinCodeErrorMessage('PIN Code must have 6 Digits');
  });
  test.only('Submit form without filling and verify alert message',async({page})=>{
     await customerPage.navigateToNewCustomerPage();
     page.once('dialog',async dialog=>{
        expect(dialog.message()).toContain('please fill all fields')
        dialog.accept();
     })
      await customerPage.clickSubmitBtn();
  })
});