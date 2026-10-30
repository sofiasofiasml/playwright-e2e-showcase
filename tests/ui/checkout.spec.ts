import { test, expect } from '../../fixtures';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CUSTOMER } from '../../data/users';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCart(...PRODUCTS);
    await inventoryPage.openCart();
  });

  test('customer completes a purchase end to end @smoke', async ({ cartPage, checkoutPage, page }) => {
    await expect(cartPage.itemNames).toHaveText(PRODUCTS);

    await cartPage.checkout();
    await checkoutPage.fillCustomerInfo(CUSTOMER);
    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('order summary totals add up', async ({ cartPage, checkoutPage }) => {
    await cartPage.checkout();
    await checkoutPage.fillCustomerInfo(CUSTOMER);

    const itemPrices = (await checkoutPage.itemPrices.allTextContents()).map(CheckoutPage.amount);
    const subtotal = CheckoutPage.amount(await checkoutPage.subtotal.innerText());
    const tax = CheckoutPage.amount(await checkoutPage.tax.innerText());
    const total = CheckoutPage.amount(await checkoutPage.total.innerText());

    expect(subtotal).toBeCloseTo(itemPrices.reduce((sum, p) => sum + p, 0), 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  const requiredFields = [
    { field: 'first name', info: { ...CUSTOMER, firstName: '' }, error: 'First Name is required' },
    { field: 'last name', info: { ...CUSTOMER, lastName: '' }, error: 'Last Name is required' },
    { field: 'postal code', info: { ...CUSTOMER, postalCode: '' }, error: 'Postal Code is required' },
  ];

  for (const { field, info, error } of requiredFields) {
    test(`requires ${field}`, async ({ cartPage, checkoutPage }) => {
      await cartPage.checkout();
      await checkoutPage.fillCustomerInfo(info);
      await expect(checkoutPage.error).toContainText(error);
    });
  }
});
