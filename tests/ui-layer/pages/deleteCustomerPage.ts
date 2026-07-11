import {test,Locator,Page,expect}from '@playwright/test';
import { Default_MediumTimeOut } from '../utils/helpers';
export class DeleteCustomerPage{
    readonly page:Page
    readonly deleteCustomerMenuItem:Locator
    readonly customerIdInput:Locator;
    readonly accountSubmitBtn:Locator;

    constructor(page:Page){
        this.page=page
        this.deleteCustomerMenuItem=page.getByRole('link',{name:'Delete Customer',exact:true})
        this.customerIdInput=page.locator('input[name="cusid"]');
        this.accountSubmitBtn=page.locator('input[name="AccSubmit"]');
    }

    async navigateToDeleteCustomerPage(){
        await expect(this.deleteCustomerMenuItem).toBeEnabled({timeout:Default_MediumTimeOut})
        await this.deleteCustomerMenuItem.click();
    }
    async enterCustomerIdInput(customerIdInput:string){
        await this.customerIdInput.fill(customerIdInput,{timeout:Default_MediumTimeOut})
    }
    async clickOnAccountSubmit(){
        await this.accountSubmitBtn.click();
    }
    async handleAlertWithAccept(){
        this.page.on('dialog',async dialog=>{
            const message=dialog.message()
            if(message.includes('Do you really want to delete this Customer')){
                console.log(message)
                await dialog.accept()
            }
            else if(message.includes('Customer does not exist')){
                console.log(message)
                expect(message).toContain('Customer does not exist')
                await dialog.accept()
            }
        })
    }

   
        
    }

