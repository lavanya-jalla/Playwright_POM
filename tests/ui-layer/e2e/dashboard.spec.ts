
import{test}from '../utils/PageFixture';
import dotenv from 'dotenv'
dotenv.config();
test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
       await loginPage.doLogin(process.env.GURU99_USERNAME!, process.env.GURU99_PASSWORD!);
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