import { test, expect } from '../utils/PageFixture';
import dotenv from 'dotenv'
dotenv.config();

test.describe('Customer Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.doLogin(process.env.GURU99_USERNAME!, process.env.GURU99_PASSWORD!);
  });


  test('@customer @customer_creation @regression Verify New Customer Form Submission', async ({customerPage}) => {
    await customerPage.navigateToNewCustomerPage();
    await customerPage.fillCustomerForm('Lavanya Jalla','female','2004-05-02','Manchi Kanti Nagar','Khammam','Telangana','507003','9002020200',`lavanya${Date.now()}@gmail.com`,'1234@');
    await customerPage.clickSubmitBtn();
    await customerPage.successRegistrationMsgValidation();
    const customerId=await customerPage.getCustomerId()
    console.log(`Customer ID: ${customerId}`)
  });

   test('@customer @customer_creation @regression Verify New Customer Form Submission with 5 digits PINCODE error message', async ({customerPage}) => {
    await customerPage.navigateToNewCustomerPage();
    const date=new Date();
    await customerPage.fillCustomerForm('Ram','male','2004-05-02','Manchi Kanti Nagar','Khammam','Telangana','50700','9002020200','lavanya@gmail.com'+date.toString(),'1234@');
    await customerPage.clickSubmitBtn();
    await customerPage.invalidPinCodeErrorMessage('PIN Code must have 6 Digits');
  });
  test('@customer @customer_creation @regression Submit form without filling and verify alert message',async({customerPage,page})=>{
     await customerPage.navigateToNewCustomerPage();
     page.once('dialog',async dialog=>{
        expect(dialog.message()).toContain('please fill all fields')
        dialog.accept();
     })
      await customerPage.clickSubmitBtn();
  })
});

