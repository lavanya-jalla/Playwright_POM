import { Locator, Page, expect } from '@playwright/test';
import { Default_MaxTimeOut } from '../utils/helpers';

export class NewAccountPage {
    readonly page: Page;
    readonly newAccountMenuItem: Locator;
    readonly customerIdInput: Locator;
    readonly accountTypeDropdown: Locator;
    readonly initialDepositInput: Locator;
    readonly accountSubmitBtn: Locator;
    readonly AccountRegistrationSuccessMessage: Locator;
    readonly accountTable: Locator;
    readonly resetBtn:Locator;
    readonly InvalidDetailsErrMsg:Locator

    constructor(page: Page) {
        this.page = page;
        this.newAccountMenuItem = page.getByRole('link', { name: 'New Account', exact: true });
        this.customerIdInput = page.locator('input[name="cusid"]');
        this.accountTypeDropdown = page.locator('select[name="selaccount"]');
        this.initialDepositInput = page.locator('input[name="inideposit"]');
        this.accountSubmitBtn = page.locator('input[value="submit"]');
        this.resetBtn=page.locator('input[name="reset"]');
         this.InvalidDetailsErrMsg=page.getByLabel('Characters are not allowed');

        // Success page locators
        this.AccountRegistrationSuccessMessage = page.getByText(
            'Account Generated Successfully!!!',
            { exact: true }
        );
        this.accountTable = page.locator('table#account');
    }

    async navigateToNewAcccountPage() {
        await expect(this.newAccountMenuItem).toBeEnabled({
            timeout: Default_MaxTimeOut,
        });
        await this.newAccountMenuItem.click();
    }

    async enterCustomerIdInput(customerId: string) {
        await this.customerIdInput.fill(customerId, {
            timeout: Default_MaxTimeOut,
        });
    }

    async selectAccountType(accountType: string) {
        if (accountType.toLowerCase() === 'savings') {
            await this.accountTypeDropdown.selectOption('Savings');
        } else {
            await this.accountTypeDropdown.selectOption('Current');
        }
    }

    async enterInitialDeposit(amount: string) {
        await this.initialDepositInput.fill(amount);
    }

    async clickOnAccountSubmit() {
        await this.accountSubmitBtn.click();
    }

    async successRegistrationMsgValidation() {
         await expect(this.AccountRegistrationSuccessMessage).toBeVisible({timeout:Default_MaxTimeOut})
        await expect(this.AccountRegistrationSuccessMessage).toHaveText('Account Generated Successfully!!!');
    }

    async getAccountId() {
        await expect(this.accountTable.first()).toBeVisible({timeout:Default_MaxTimeOut})
        const accountId = await this.accountTable.getByRole('row').nth(3).locator('td').nth(1).textContent();
        return accountId;
    }
    async makeResetAccount(){
        await this.resetBtn.click();

    }
     async invalidAccountErrorMessage(InvalidDetailsErrMsg:String){
    await expect(this.page.getByText('Characters are not allowed')).toBeVisible({timeout:Default_MaxTimeOut})
  }
}