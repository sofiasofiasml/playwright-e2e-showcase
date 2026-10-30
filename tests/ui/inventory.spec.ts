import { test, expect } from '../../fixtures';

test.describe('Inventory', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('shows the full catalogue @smoke', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('sorts products by price, low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.prices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sorts products by price, high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.prices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sorts products by name, Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.itemNames.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('cart badge reflects added and removed items', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack', 'Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.removeFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeFromCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toBeHidden();
  });
});
