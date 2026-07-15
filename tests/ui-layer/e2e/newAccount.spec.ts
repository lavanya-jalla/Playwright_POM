import { customerTestData } from '../testdata/customerTestData';
import { test,expect} from '../utils/PageFixture';
import dotenv from 'dotenv'
dotenv.config();

test.describe('Customer Tests', () => {


  test.beforeEach(async ({ loginPage }) => {
      await loginPage.doLogin(process.env.GURU99_USERNAME!, process.env.GURU99_PASSWORD!);
});

  test('@newaccount @regression @smoke Verify New Account Form Submission', async ({customerPage,newAccountPage}) => {
    await customerPage.navigateToNewCustomerPage();
    await customerPage.fillCustomerForm(customerTestData);
    await customerPage.clickSubmitBtn();
    await customerPage.successRegistrationMsgValidation();
    const customerId=await customerPage.getCustomerId()
    console.log(`Customer ID: ${customerId}`)
      await newAccountPage.navigateToNewAcccountPage()
    await newAccountPage.enterCustomerIdInput(customerId!);
   await newAccountPage.selectAccountType('Savings');
    await newAccountPage.enterInitialDeposit('2000');
    await newAccountPage.clickOnAccountSubmit();
  

  });
  
  test('@newaccount @regression @smoke Verify New Account Form Submission with reset button', async ({customerPage,newAccountPage}) => {
    await customerPage.navigateToNewCustomerPage();
    await customerPage.fillCustomerForm(customerTestData);
    await customerPage.clickSubmitBtn();
    await customerPage.successRegistrationMsgValidation();
    const customerId=await customerPage.getCustomerId()
    console.log(`Customer ID: ${customerId}`)
      await newAccountPage.navigateToNewAcccountPage()
    await newAccountPage.enterCustomerIdInput(customerId!);
   await newAccountPage.selectAccountType('Savings');
    await newAccountPage.enterInitialDeposit('2000');
    await newAccountPage.makeResetAccount();
  

  });
   test('@newaccount @regression @smoke Verify New Account Form Submission with Invalid details', async ({customerPage,newAccountPage}) => {
    await customerPage.navigateToNewCustomerPage();
    await customerPage.fillCustomerForm(customerTestData);
    await customerPage.clickSubmitBtn();
    await customerPage.successRegistrationMsgValidation();
    const customerId=await customerPage.getCustomerId()
    console.log(`Customer ID: ${customerId}`)
      await newAccountPage.navigateToNewAcccountPage()
    await newAccountPage.enterCustomerIdInput(customerId!);
   await newAccountPage.selectAccountType('Savings');
    await newAccountPage.enterInitialDeposit('fhjeumd');
      await newAccountPage.clickOnAccountSubmit();
    await newAccountPage.invalidAccountErrorMessage('Characters are not allowed');
  

  });
})

