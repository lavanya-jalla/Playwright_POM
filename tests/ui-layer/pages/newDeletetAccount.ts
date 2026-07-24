import {test,Locator,Page,expect}from '@playwright/test';
import { Default_MediumTimeOut } from '../utils/helpers';
export class DeleteAccountPage{
    readonly page:Page
    readonly deleteAccountMenuItem:Locator
    readonly AccountIdInput:Locator;
    readonly accountSubmitBtn:Locator;
    readonly resetSubmitBtn:Locator

constructor(page:Page){
        this.page=page
        this.deleteAccountMenuItem=page.getByRole('link',{name:'Delete Account',exact:true})
        this.AccountIdInput=page.locator('input[name="accountno"]');
        this.accountSubmitBtn=page.locator('input[name="AccSubmit"]');
        this.resetSubmitBtn=page.locator('input[name="res"]')
    }
      async navigateToDeleteAccountPage(){
         await this.page.goto("https://demo.guru99.com/V4/manager/Managerhomepage.php")
        await expect(this. deleteAccountMenuItem).toBeEnabled({timeout:Default_MediumTimeOut})
        await this.deleteAccountMenuItem.click();
    }
    async enterAccountID(AccountIdInput:string){
        await this.AccountIdInput.fill(AccountIdInput,{timeout:Default_MediumTimeOut})
    }
    async clickOnAccountSubmit(){
        await this.accountSubmitBtn.click();
    }
      async clickOnresetSubmitBtn(){
        await this.resetSubmitBtn.click();
    }
   async handleAlertWithAccept() {
    this.page.on('dialog', async dialog => {
        const message = dialog.message();

        if (message.includes('Do you really want to delete this Account')) {
            console.log(message);
            expect(message).toContain('Do you really want to delete this Account');
            await dialog.accept();
        }
        else if (message.includes('Account does not exist')) {
            console.log(message);
            expect(message).toContain('Account does not exist');
            await dialog.accept();
        }
    });
  
    }
    }

   