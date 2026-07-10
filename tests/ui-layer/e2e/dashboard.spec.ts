
import{test}from '../utils/PageFixture';

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.doLogin('mngr663755', 'zytytYs');
  });

  test('Verify Dashboard Page Title', async ({ dashboardPage }) => {
    await dashboardPage.pageTitle();
  });

  test('Verify Welcome Message', async ({ dashboardPage }) => {
    await dashboardPage.getWelcomeMessageText();
  });
 test('Verify Menu Items Count', async ({ dashboardPage}) => {
  await dashboardPage.menuItemsCountShouldBeFifteen();
});
});