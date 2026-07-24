import { chromium } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config();

async function globalSetUp() {
  if (process.env.SKIP_GLOBAL_SETUP === "true") {
    console.log("Skipping global setup for API tests.");
    return;
  }
  const browser =await chromium.launch({
  headless: process.env.CI ? true : false,
  slowMo: process.env.CI ? 0 : 500
});
 
  const page = await browser.newPage();

  await page.goto(process.env.GURU99_BASEURL!);
  await page.locator('input[name="uid"]').fill(process.env.GURU99_USERNAME!);
  await page.locator('input[name="password"]').fill(process.env.GURU99_PASSWORD!);
  await page.locator('input[name="btnLogin"]').click();
  await page.waitForTimeout(5000);
  await page.screenshot({path:"after-login.png"});
  await page.context().storageState({
    path: './tests/.auth/userlogin.json',
  });

  await browser.close();
}
export default globalSetUp;