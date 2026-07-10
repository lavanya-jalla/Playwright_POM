import { test,expect} from '../utils/PageFixture';


test.describe('Customer Tests', () => {

<<<<<<< HEAD:tests/ui-layer/e2e/customer.spec.ts
  test.beforeEach(async ({ loginPage }) => {
     await loginPage.doLogin('mngr663755', 'zytytYs')
=======
  let customerPage: CustomerPage;
//login
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);
    await loginPage.doLogin('mngr663755', 'zytytYs');
>>>>>>> 0a3a5730642f0086cc910bceb38f0e8d9da2814d:tests/e2e/customer.spec.ts
  });

 

  test('Verify New Customer Form Submission', async ({customerPage}) => {
    await customerPage.navigateToNewCustomerPage();
    await customerPage.fillCustomerForm('Lavanya Jalla','female','2004-05-02','Manchi Kanti Nagar','Khammam','Telangana','507003','9002020200',`lavanya${Date.now()}@gmail.com`,'1234@');
    await customerPage.clickSubmitBtn();
    await customerPage.successRegistrationMsgValidation();
    const customerId=await customerPage.getCustomerId()
    console.log(`Customer ID: ${customerId}`)
  });

   test('Verify New Customer Form Submission with 5 digits PINCODE error message', async ({customerPage}) => {
    await customerPage.navigateToNewCustomerPage();
    const date=new Date();
    await customerPage.fillCustomerForm('Ram','male','2004-05-02','Manchi Kanti Nagar','Khammam','Telangana','50700','9002020200','lavanya@gmail.com'+date.toString(),'1234@');
    await customerPage.clickSubmitBtn();
    await customerPage.invalidPinCodeErrorMessage('PIN Code must have 6 Digits');
  });
  test('Submit form without filling and verify alert message',async({customerPage,page})=>{
     await customerPage.navigateToNewCustomerPage();
     page.once('dialog',async dialog=>{
        expect(dialog.message()).toContain('please fill all fields')
        dialog.accept();
     })
      await customerPage.clickSubmitBtn();
  })
});
