
import{test}from '../utils/PageFixture';
import dotenv from 'dotenv'
dotenv.config();
test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({page}) => {
      await page.goto("https://demo.guru99.com/V4/manager/Managerhomepage.php")
  });
    test.afterEach(async ({ logoutPage }) => {
    await logoutPage.doLogout();
  });
  

  test('@dashboard @regression Verify Dashboard Page Title', async ({ dashboardPage }) => {
    await dashboardPage.pageTitle();
  });

  test('@dashboard @regression Verify Welcome Message', async ({ dashboardPage }) => {
    await dashboardPage.getWelcomeMessageText();
  });
 test('@dashboard @regression Verify Menu Items Count', async ({ dashboardPage}) => {
  await dashboardPage.menuItemsCountShouldBeFifteen(15);
});
});