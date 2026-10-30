import { test, expect } from '../../fixtures';
import { PASSWORD, USERS } from '../../data/users';

// Login tests start from a clean, anonymous session.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user logs in and lands on the product list @smoke', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(USERS.standard, PASSWORD);
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('locked out user sees a clear error', async ({ loginPage, page }) => {
    await loginPage.login(USERS.lockedOut, PASSWORD);
    await loginPage.expectError('Sorry, this user has been locked out.');
    await expect(page).not.toHaveURL(/inventory/);
  });

  const invalidCases = [
    { title: 'empty username', username: '', password: PASSWORD, error: 'Username is required' },
    { title: 'empty password', username: USERS.standard, password: '', error: 'Password is required' },
    {
      title: 'wrong password',
      username: USERS.standard,
      password: 'wrong-password',
      error: 'Username and password do not match any user in this service',
    },
  ];

  for (const { title, username, password, error } of invalidCases) {
    test(`rejects ${title}`, async ({ loginPage }) => {
      await loginPage.login(username, password);
      await loginPage.expectError(error);
    });
  }

  test('protected pages redirect anonymous users to login', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await loginPage.expectError("You can only access '/inventory.html' when you are logged in.");
  });
});
