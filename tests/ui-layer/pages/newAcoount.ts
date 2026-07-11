import {test,Locator,Page,expect}from '@playwright/test';
import { Default_MediumTimeOut } from '../utils/helpers';
export class NewAccountPage{
    readonly page:Page
    readonly newAccountMenuItem:Locator
    readonly customerIdInput:Locator;
    readonly accountTypeDropdown:Locator;
    readonly initialDepositInput:Locator;
    readonly accountSubmitBtn:Locator;

 constructor(page:Page){
        this.page=page
        this.newAccountMenuItem=page.getByRole('link',{name:'New Account',exact:true})
        this.customerIdInput=page.locator('input[name="cusid"]');
        this.accountTypeDropdown=page.locator('select[name="selaccount"]');
        this.initialDepositInput=page.locator('input[name="inideposit"]')
        this.accountSubmitBtn=page.locator('input[value="submit"]');
    }
}