
import { expect, Locator, Page } from '@playwright/test';
import { Default_MediumTimeOut } from '../utils/helpers';

export class DashboardPage {
  readonly page: Page;
  readonly menuItems: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
   this.menuItems = page.locator('.menusubnav > li > a');
    this.welcomeMessage = page.getByText(
      "Welcome To Manager's Page of Guru99 Bank"
    );
  }

  async pageTitle() {
    await expect(this.page).toHaveTitle('Guru99 Bank Manager HomePage');
  }

  async getWelcomeMessageText() {
    await expect(this.welcomeMessage).toBeVisible();
  }

  async menuItemsCountShouldBeFifteen(expectedMenuItemscount:number) {
    await expect(this.menuItems.first()).toBeVisible({timeout:Default_MediumTimeOut})
    await expect(this.menuItems).toHaveCount(expectedMenuItemscount,{timeout:Default_MediumTimeOut});
  }
}