import { test,expect} from '../utils/PageFixture';


test.describe('Customer Tests', () => {


  test.beforeEach(async ({ loginPage }) => {
  await loginPage.doLogin('mngr663755', 'zytytYs');
});
  
 

  test('Verify New Customer Form Submission', async ({customerPage}) => {
    await customerPage.navigateToNewCustomerPage();
    await customerPage.fillCustomerForm('Lavanya Jalla','female','2004-05-02','Manchi Kanti Nagar','Khammam','Telangana','507003','9002020200',`lavanya${Date.now()}@gmail.com`,'1234@');
    await customerPage.clickSubmitBtn();
    await customerPage.successRegistrationMsgValidation();
    const customerId=await customerPage.getCustomerId()
    console.log(`Customer ID: ${customerId}`)
  });
})