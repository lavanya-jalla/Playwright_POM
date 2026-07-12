import { Locator, Page, expect } from '@playwright/test';
import { Default_MediumTimeOut } from '../utils/helpers';

export class NewAccountPage {
    readonly page: Page;
    readonly newAccountMenuItem: Locator;
    readonly customerIdInput: Locator;
    readonly accountTypeDropdown: Locator;
    readonly initialDepositInput: Locator;
    readonly accountSubmitBtn: Locator;
    readonly AccountRegistrationSuccessMessage: Locator;
    readonly accountTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newAccountMenuItem = page.getByRole('link', { name: 'New Account', exact: true });
        this.customerIdInput = page.locator('input[name="cusid"]');
        this.accountTypeDropdown = page.locator('select[name="selaccount"]');
        this.initialDepositInput = page.locator('input[name="inideposit"]');
        this.accountSubmitBtn = page.locator('input[value="submit"]');

        // Success page locators
        this.AccountRegistrationSuccessMessage = page.getByText(
            'Account Generated Successfully!!!',
            { exact: true }
        );
        this.accountTable = page.locator('table#account');
    }

    async navigateToNewAcccountPage() {
        await expect(this.newAccountMenuItem).toBeEnabled({
            timeout: Default_MediumTimeOut,
        });
        await this.newAccountMenuItem.click();
    }

    async enterCustomerIdInput(customerId: string) {
        await this.customerIdInput.fill(customerId, {
            timeout: Default_MediumTimeOut,
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
         await expect(this.AccountRegistrationSuccessMessage).toBeVisible({timeout:Default_MediumTimeOut})
        await expect(this.AccountRegistrationSuccessMessage).toHaveText('Account Generated Successfully!!!');
    }

    async getAccountId() {
        await expect(this.accountTable.first()).toBeVisible({timeout:Default_MediumTimeOut})
        const accountId = await this.accountTable.getByRole('row').nth(3).locator('td').nth(1).textContent();
        return accountId;
    }
}