import { test as Base,expect}from '@playwright/test'
import{DeleteCustomerPage} from '../pages/deleteCustomerPage';
import { CustomerPage } from '../pages/customerPage';
import { LoginPage } from '../pages/loginpage';
import {DashboardPage }from '../pages/dashboardPage';
import dotenv from 'dotenv'
import { NewAccountPage } from '../pages/newAcoount';
import { DeleteAccountPage } from '../pages/newDeletetAccount';
import {LogoutPage}from '../pages/logoutpage';
dotenv.config();
type MyPageFixture={
    loginPage:LoginPage,
    customerPage:CustomerPage;
    deleteCustomerPage:DeleteCustomerPage;
    dashboardPage:DashboardPage;
    newAccountPage:NewAccountPage;
    deleteAccountPage:DeleteAccountPage;
    logoutPage:LogoutPage,

}
export const test=Base.extend<MyPageFixture>({
loginPage:async({page},use)=>{
    const lp=new LoginPage(page);
    await use(lp)
},
customerPage:async({page},use)=>{
    const cp=new CustomerPage(page);
    await use(cp)
},
deleteCustomerPage:async({page},use)=>{
    const dp=new DeleteCustomerPage(page);
    await use(dp)
},
dashboardPage:async({page},use)=>{
    const dashboardpage=new DashboardPage(page);
    await use(dashboardpage);
},
newAccountPage:async({page},use)=>{
    const newaccountpage=new NewAccountPage(page);
    await use(newaccountpage);
},
deleteAccountPage:async({page},use)=>{
    const deleteaccountpage=new DeleteAccountPage(page);
    await use(deleteaccountpage);
},
logoutPage:async({page},use)=>{
    const logoutp=new LogoutPage(page);
    await use(logoutp)
},

})
export { expect } from '@playwright/test';
