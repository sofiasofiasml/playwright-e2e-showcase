// Public demo credentials, published on the saucedemo.com login page.
export const PASSWORD = process.env.SAUCE_PASSWORD ?? 'secret_sauce';

export const USERS = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
  performanceGlitch: 'performance_glitch_user',
} as const;

export const CUSTOMER = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  postalCode: '08001',
};
