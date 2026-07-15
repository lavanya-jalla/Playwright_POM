import { expect, Locator, Page } from '@playwright/test';
// import dotenv from 'dotenv'
// dotenv.config()
export class LogoutPage {
  readonly page: Page;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutLink = page.locator('a[href="Logout.php"]');
  }

 async doLogout() {

    this.page.once('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    });
    // await this.page.goto("/")

await this.logoutLink.click({ force: true }); 
 }

}