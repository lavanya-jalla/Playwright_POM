import { Locator, Page,expect } from '@playwright/test';
import { Default_MediumTimeOut } from '../utils/helpers';

export class CustomerPage {
  private readonly page: Page;
  readonly menuItems: Locator;
  readonly nameInput: Locator;
  readonly femaleRadio:Locator;
  readonly maleRadio:Locator;
  readonly dobInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly pinInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  //customer Rgistration Message Page
  readonly customerRegistrationSuccessMessage:Locator;
  readonly customerIdTable:Locator;
  readonly pinCodeErrorMsg:Locator

  constructor(page: Page) {
    this.page = page;
    this.menuItems = page.locator('.menusubnav > li > a');
    this.nameInput = page.locator('input[name="name"]');
    this.femaleRadio=page.locator('input[value="f"]');
     this.maleRadio=page.locator('input[value="m"]');
    this.dobInput = page.locator('input[name="dob"]');
    this.addressInput = page.locator('textarea[name="addr"]');
    this.cityInput = page.locator('input[name="city"]');
    this.stateInput = page.locator('input[name="state"]');
    this.pinInput = page.locator('input[name="pinno"]');
    this.mobileNumberInput = page.locator('input[name="telephoneno"]');
    this.emailInput = page.locator('input[name="emailid"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('input[name="sub"]');

    //pin error msg
    this.pinCodeErrorMsg=page.getByLabel('PIN Code must have 6 Digits');

    //customer registration msg
    this.customerRegistrationSuccessMessage=page.getByText('Customer Registered Successfully!!!',{exact:true})
    this.customerIdTable=page.locator('table#customer');
  }

  async navigateToNewCustomerPage() {
    await this.page.getByRole('link', { name: 'New Customer' }).click();
}

  async fillCustomerForm(
    name: string,
    gender: string,
    dob: string,
    address: string,
    city: string,
    state: string,
    pin: string,
    mobileNumber: string,
    email: string,
    password: string
  ) {
    await this.nameInput.fill(name);
    if (gender.toLowerCase() === 'female') {
    await this.femaleRadio.check();
} else {
    await this.maleRadio.check();
}
    await this.dobInput.fill(dob);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.pinInput.fill(pin);
    await this.mobileNumberInput.fill(mobileNumber);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickSubmitBtn() {
    await this.submitButton.click();
  }
  async successRegistrationMsgValidation(){
    await expect(this.customerRegistrationSuccessMessage).toHaveText('Customer Registered Successfully!!!');
  }
  async getCustomerId(){
    const customerId=await this.customerIdTable.getByRole('row').nth(3).locator('td').nth(1).textContent();
    return customerId;
    
  }
  async invalidPinCodeErrorMessage(InvalidPincodeErrorMsg:String){
    await expect(this.page.getByText('PIN Code must have 6 Digits')).toBeVisible({timeout:Default_MediumTimeOut})
  }
}