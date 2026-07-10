import { test as Base,expect}from '@playwright/test'
import{DeleteCustomerPage} from '../pages/deleteCustomerPage';
import { CustomerPage } from '../pages/customerPage';
import { LoginPage } from '../pages/loginpage';
import {DashboardPage }from '../pages/dashboardPage';

type MyPageFixture={
    loginPage:LoginPage,
    customerPage:CustomerPage;
    deleteCustomerPage:DeleteCustomerPage;
    dashboardPage:DashboardPage;

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
}
})
export { expect } from '@playwright/test';
