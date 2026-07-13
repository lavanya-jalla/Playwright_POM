import { expect, Locator, Page } from '@playwright/test';

export class LogoutPage {
  readonly page: Page;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutLink = page.locator('a[href="Logout.php"]');
  }

  async doLogout() {
    await expect(this.logoutLink).toBeVisible();
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.logoutLink.click({ force: true })
    ]);
    console.log(dialog.message());
    expect(dialog.message()).toContain('You Have Succesfully Logged Out!!');
    await dialog.accept();
  }


}