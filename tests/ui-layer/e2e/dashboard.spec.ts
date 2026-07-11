
import{test}from '../utils/PageFixture';

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.doLogin('mngr663755', 'zytytYs');
  });

  test('@dashboard @regression Verify Dashboard Page Title', async ({ dashboardPage }) => {
    await dashboardPage.pageTitle();
  });

  test('@dashboard @regression Verify Welcome Message', async ({ dashboardPage }) => {
    await dashboardPage.getWelcomeMessageText();
  });
 test('@dashboard @regression Verify Menu Items Count', async ({ dashboardPage}) => {
  await dashboardPage.menuItemsCountShouldBeFifteen();
});
});