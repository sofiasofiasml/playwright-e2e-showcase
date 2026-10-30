# Playwright E2E Showcase

[![Playwright tests](https://github.com/sofiasofiasml/playwright-e2e-showcase/actions/workflows/playwright.yml/badge.svg)](https://github.com/sofiasofiasml/playwright-e2e-showcase/actions/workflows/playwright.yml)
[![HTML report](https://img.shields.io/badge/report-live-2ea44f)](https://sofiasofiasml.github.io/playwright-e2e-showcase/)

End-to-end test suite for [Sauce Demo](https://www.saucedemo.com), a public e-commerce sandbox, built with **Playwright + TypeScript**.

I lead test automation for an airline booking platform, and that code is private. This repo shows the same approach on a public app: small, readable tests on top of a clean framework, run in CI on every push.

## What it shows

| Practice | Where |
| --- | --- |
| Page Object Model with typed locators | [`pages/`](pages) |
| Page objects injected as custom fixtures | [`fixtures/index.ts`](fixtures/index.ts) |
| Log in once, reuse the session (`storageState` + setup project) | [`tests/auth.setup.ts`](tests/auth.setup.ts) |
| Data-driven tests for negative cases | [`login.spec.ts`](tests/ui/login.spec.ts), [`checkout.spec.ts`](tests/ui/checkout.spec.ts) |
| Business-rule checks, not only UI checks (order totals add up) | [`checkout.spec.ts`](tests/ui/checkout.spec.ts) |
| Cross-browser and mobile: Chromium, Firefox, Pixel 7 | [`playwright.config.ts`](playwright.config.ts) |
| `@smoke` tagging for fast feedback | `npm run test:smoke` |
| `data-test` attributes as test IDs (`testIdAttribute`) | [`playwright.config.ts`](playwright.config.ts) |
| Traces, screenshots and video kept only on failure | [`playwright.config.ts`](playwright.config.ts) |
| CI with GitHub Actions, HTML report published to GitHub Pages | [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) |

## Coverage

- **Login**: happy path, locked-out user, required fields, wrong credentials, protected routes.
- **Inventory**: catalogue, sorting by price and name, cart badge on add and remove.
- **Checkout**: full purchase, totals (subtotal + tax = total), required customer fields.

Each test runs in 3 projects: 16 scenarios, 49 runs including setup.

## Run it

```bash
npm ci
npx playwright install chromium firefox
npm test               # full suite
npm run test:smoke     # @smoke only
npm run report         # open the HTML report
```

`BASE_URL` and `SAUCE_PASSWORD` can be overridden via environment variables.

## Structure

```
├── data/          test data (users, customer)
├── fixtures/      custom test fixtures (page objects)
├── pages/         page objects
├── tests/
│   ├── auth.setup.ts
│   └── ui/        specs by feature
└── playwright.config.ts
```

## Author

**Sofía Martínez López**, QA Automation Lead · [LinkedIn](https://www.linkedin.com/in/sofiasofiasml)
