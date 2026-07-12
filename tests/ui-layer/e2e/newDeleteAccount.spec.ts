import {test} from '../utils/PageFixture';
import dotenv from 'dotenv'
dotenv.config();
test.describe('Delete Customer Tests', () => {
    
  test.beforeEach(async ({ loginPage }) => {
        await loginPage.doLogin(process.env.GURU99_USERNAME!, process.env.GURU99_PASSWORD!);
  });
   test('@newaccount @regression @smoke Verify Delete New Account', async ({customerPage,newAccountPage,deleteAccountPage}) => {
    await customerPage.navigateToNewCustomerPage();
    await customerPage.fillCustomerForm('Lavanya Jalla','female','2004-05-02','Manchi Kanti Nagar','Khammam','Telangana','507003','9002020200',`lavanya${Date.now()}@gmail.com`,'1234@');
     await customerPage.clickSubmitBtn();
  await customerPage.successRegistrationMsgValidation();
  const customerId = await customerPage.getCustomerId();
  console.log(`Customer ID: ${customerId}`);

  // Creating new Account
  await newAccountPage.navigateToNewAcccountPage();
  await newAccountPage.enterCustomerIdInput(customerId!);
  await newAccountPage.selectAccountType('Savings');
  await newAccountPage.enterInitialDeposit('2000');
  await newAccountPage.clickOnAccountSubmit();
  await newAccountPage.successRegistrationMsgValidation();
  const accountId = await newAccountPage.getAccountId();
  console.log(`Account ID: ${accountId}`);

  // Deleting new Account
  await deleteAccountPage.navigateToDeleteAccountPage();
  await deleteAccountPage.enterAccountID(accountId!);
  await deleteAccountPage.handleAlertWithAccept();
  await deleteAccountPage.clickOnAccountSubmit();
   
    

  });
})