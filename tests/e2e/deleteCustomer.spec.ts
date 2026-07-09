import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { CustomerPage } from '../pages/customerPage';
import { DeleteCustomerPage } from '../pages/deleteCustomerPage';

test.describe('Customer Tests', () => {
    let customerPage:CustomerPage;
    let deleteCustomerPage:DeleteCustomerPage;


  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);
    deleteCustomerPage=new DeleteCustomerPage(page);
    await loginPage.doLogin('mngr663755', 'zytytYs');
  });

  test('Verify Delete Customer Page Navigation', async () => {
    await customerPage.navigateToNewCustomerPage();
  });

  test('Verify New Customer Form Submission', async ({page}) => {
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
    await deleteCustomerPage.enterCustomerIdInput(customerId!)
    await deleteCustomerPage.clickOnAccountSubmit()
    await deleteCustomerPage.handleAlertWithAccept()
    await deleteCustomerPage.handleAlertWithAcceptforExistorNot()
  });
})