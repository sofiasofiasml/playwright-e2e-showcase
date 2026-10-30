import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PASSWORD, USERS } from '../data/users';

const authFile = 'playwright/.auth/standard-user.json';

// Logs in once and reuses the session in every test that needs an authenticated user.
setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard, PASSWORD);
  await expect(page).toHaveURL(/inventory/);
  await page.context().storageState({ path: authFile });
});
