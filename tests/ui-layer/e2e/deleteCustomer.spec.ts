import {test} from '../utils/PageFixture';
import dotenv from 'dotenv'
dotenv.config();
test.describe('Delete Customer Tests', () => {
    
  test.beforeEach(async ({ loginPage }) => {
        await loginPage.doLogin(process.env.GURU99_USERNAME!, process.env.GURU99_PASSWORD!);
  });

  test('@delete @customer_delete @regression Verify Delete Customer Form ', async ({customerPage,deleteCustomerPage,page}) => {
    await customerPage.navigateToNewCustomerPage();
    await customerPage.fillCustomerForm('Lavanya Jalla','female','2004-05-02','Manchi Kanti Nagar','Khammam','Telangana','507003','9002020200',`lavanya${Date.now()}@gmail.com`,'1234@');
    await customerPage.clickSubmitBtn();
    await customerPage.successRegistrationMsgValidation();
    const customerId=await customerPage.getCustomerId()
    console.log(`Customer ID: ${customerId}`)
    await deleteCustomerPage.navigateToDeleteCustomerPage()
    await deleteCustomerPage.enterCustomerIdInput(customerId!)
    await deleteCustomerPage.handleAlertWithAccept()
    await deleteCustomerPage.clickOnAccountSubmit()
    //verification for delete customer
    await page.goBack();
    await deleteCustomerPage.navigateToDeleteCustomerPage()
    await deleteCustomerPage.enterCustomerIdInput(customerId!)
    await deleteCustomerPage.clickOnAccountSubmit()
   

  });
  
})