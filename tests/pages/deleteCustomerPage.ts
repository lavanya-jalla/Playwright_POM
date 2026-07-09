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
            console.log(dialog.message())
            await dialog.accept()
        })
    }
    //  async handleAlertWithAcceptForDeletedCustomerCheck(){
    //     this.page.once('dialog',async dialog=>{
    //         console.log(dialog.message())
    //         expect(dialog.message()).toContain("Do you really want to delete this Customer?")
    //         await dialog.accept()
    //     })
    // }
        async handleAlertWithAcceptforExistorNot(){
             this.page.once('dialog',async dialog=>{
            console.log(dialog.message())
            expect(dialog.message()).toContain("Customer does not exist!!")
            await dialog.accept()
        })

        }
    }

