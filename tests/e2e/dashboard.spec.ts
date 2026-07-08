import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { DashboardPage } from '../pages/dashboardPage';

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('mngr663755', 'zytytYs');
  });

  test('Verify Dashboard Page Title', async ({ page }) => {
    await expect(page).toHaveTitle('Guru99 Bank Manager HomePage');
  });

  test('Verify Welcome Message', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.getWelcomeMessageText();
  });
 test('Verify Menu Items Count', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.menuItemsCountShouldBeFifteen();
});
});