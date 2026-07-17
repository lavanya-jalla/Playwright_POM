import { Locator, Page, expect } from '@playwright/test';
import { Default_MaxTimeOut } from '../utils/helpers';

export class CustomerPage {
  private readonly page: Page;

  readonly menuItems: Locator;
  readonly nameInput: Locator;
  readonly femaleRadio: Locator;
  readonly maleRadio: Locator;
  readonly dobInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly pinInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  readonly customerRegistrationSuccessMessage: Locator;
  readonly customerIdTable: Locator;
  readonly pinCodeErrorMsg: Locator;

  constructor(page: Page) {
    this.page = page;

    this.menuItems = page.locator('.menusubnav > li > a');
    this.nameInput = page.locator('input[name="name"]');
    this.femaleRadio = page.locator('input[value="f"]');
    this.maleRadio = page.locator('input[value="m"]');
    this.dobInput = page.locator('input[name="dob"]');
    this.addressInput = page.locator('textarea[name="addr"]');
    this.cityInput = page.locator('input[name="city"]');
    this.stateInput = page.locator('input[name="state"]');
    this.pinInput = page.locator('input[name="pinno"]');
    this.mobileNumberInput = page.locator('input[name="telephoneno"]');
    this.emailInput = page.locator('input[name="emailid"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('input[name="sub"]');

    this.pinCodeErrorMsg = page.getByText('PIN Code must have 6 Digits');
    this.customerRegistrationSuccessMessage = page.getByText('Customer Registered Successfully!!!',{ exact: true });
    this.customerIdTable = page.locator('table#customer');
  }

  async navigateToNewCustomerPage() {
    await this.page.getByRole('link', { name: 'New Customer' }).click();
  }

  async fillCustomerForm(customer: any) {
    await this.nameInput.fill(customer.name);

    if (customer.gender.toLowerCase() === 'female') {
      await this.femaleRadio.check();
    } else {
      await this.maleRadio.check();
    }

    await this.dobInput.fill(customer.dob);
    await this.addressInput.fill(customer.address);
    await this.cityInput.fill(customer.city);
    await this.stateInput.fill(customer.state);
    await this.pinInput.fill(customer.pin);
    await this.mobileNumberInput.fill(customer.mobile);
    await this.emailInput.fill(customer.getEmail());
    await this.passwordInput.fill(customer.password);
  }

  async clickSubmitBtn() {
    await this.submitButton.click();
  }

  async successRegistrationMsgValidation() {
    await expect(this.customerRegistrationSuccessMessage).toBeVisible({
      timeout: Default_MaxTimeOut,
    });

    await expect(this.customerRegistrationSuccessMessage).toHaveText(
      'Customer Registered Successfully!!!'
    );
  }

 async getCustomerId(){
   await expect(this.customerIdTable.first()).toBeVisible({timeout:Default_MaxTimeOut}) 
   const customerId=await this.customerIdTable.getByRole('row').nth(3).locator('td').nth(1).textContent();
    return customerId;
   }
    async invalidPinCodeErrorMessage(InvalidPincodeErrorMsg:String){
       await expect(this.page.getByText('PIN Code must have 6 Digits')).toBeVisible({timeout:Default_MaxTimeOut}) 
      }
     }
  
