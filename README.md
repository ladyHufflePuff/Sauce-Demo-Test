# Saucedemo Playwright Test Suite

---

This repository contains an **automated end-to-end testing framework** built using [Playwright](https://playwright.dev/) to test the [Saucedemo](https://www.saucedemo.com/) application.
The test suite covers multiple functional areas including **Login**, **Product Display**, **Cart Management**, and **Checkout** to ensure the application works as expected.
In addition to automation, the repository also includes a manual test case documented in an Excel file with bug reports stored in the repository.

---

## Features

---

* Automated UI tests using **Playwright Test Runner**.
* Page Object Model (POM) for maintainable, reusable locators and actions.
* Modular **command classes** that encapsulate test logic for each functional area.
* Test coverage for:

  * Login scenarios (positive, negative, missing credentials)
  * Product image/name/description visibility
  * Cart operations (add/remove items, persistence)
  * Checkout form validations and flow
* Test Data Management using JSON files
* Configurable timeouts for stability in slower browsers (e.g., Firefox).
* Organized folder structure for scalability.

---

## Design Choices

---

* **Page Object Model (POM)**:
  Classes like `ProductPage` encapsulate locators and actions for a single page, promoting DRY principles.

* **Command Pattern for Test Logic**:
  Files inside `/commands/` contain grouped reusable test flows (`LoginTests`, `ProductTests`, `CartTests`, `CheckoutTests`).

* **Playwright Test Runner**:
  Native Playwright runner handles parallel execution, retries, rich reports, and built-in fixtures like `page`.

* **Cross-Browser Testing Support**:
  Easily run the same suite across Chromium, Firefox, and WebKit.

* **Readable Test Suites**:
  Each suite uses `test.describe` blocks with `beforeEach` to set up common preconditions like login.

---

## Project Folder Structure

---

```
Sauce-Demo-Test/
│
├── commands/                              # Reusable test flows by feature
│   ├── login.js                           # Login test actions
│   ├── product.js                         # Product page test actions
│   ├── cart.js                            # Cart test actions
│   └── checkout.js                        # Checkout test actions
│
├── page-object-model/                     # Page Object Model classes
│   ├── login.page.js                      # LoginPage locators/actions
│   ├── product.page.js                    # ProductPage locators/actions
│   ├── cart.page.js                       # CartPage locators/actions
│   └── checkout.page.js                   # CheckoutPage locators/actions
│
├── tests/                                 # Playwright specs
│   ├── login.spec.js                      # Login tests
│   ├── product.spec.js                    # Product display tests
│   ├── cart.spec.js                       # Cart tests
│   └── checkout.spec.js                   # Checkout tests
│
├── testdata/
│   └── data.json                          # Test data (users, products, checkout inputs)
│
├── Manual Test.xlsx                       # Manual test case in Excel (root-level)
├── playwright.config.js                   # Playwright config (timeouts, projects, reporters)
├── package.json                           # Dependencies & scripts
└── README.md                              # Project documentation
```

---

## Getting Started

---

### Prerequisites

Ensure you have the following installed:

* Node.js (v18+ recommended)
* npm
* Git

---

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ladyHufflePuff/Sauce-Demo-Test.git
   cd Sauce-Demo-Tests
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright Browsers**

   ```bash
   npx playwright install
   ```


---

## Running Tests

---

Run all tests:

```bash
npx playwright test
```

Run a specific suite (login):

```bash
npx playwright test tests/login.spec.js
```
Run a specific suite (cart):

```bash
npx playwright test tests/cart.spec.js
```
Run a specific suite (checkout):

```bash
npx playwright test tests/checkout.spec.js
```
Run a specific suite (product):

```bash
npx playwright test tests/product.spec.js
```

Run with UI mode:

```bash
npx playwright test --ui
```

Run in a specific browser:

```bash
npx playwright test --project=chromium
```

---

## Test Suites & Cases

---

### **Login Tests (`login.spec.js`)**

* Positive login with valid credentials.
* Negative login with wrong username.
* Negative login with wrong password.
* Missing username.
* Missing password.

### **Product UI Tests (`product.spec.js`)**

* All product images are visible.
* All product names are visible.
* All product descriptions are visible.

### **Cart Tests (`cart.spec.js`)**

* Add a single item to cart.
* Add multiple items to cart.
* Remove item from cart.
* Empty cart behavior.
* Cart persistence after navigation.

### **Checkout Tests (`checkout.spec.js`)**

* Valid checkout flow.
* Missing first name validation.
* Missing last name validation.
* Missing zip code validation.
* Special characters in input fields.
* Attempt checkout with empty cart.

---

## Notes & Assumptions

---

* Firefox runs are slower; increase `timeout` if you encounter frequent `TimeoutError`.
* Login credentials should be valid for the environment under test; for Saucedemo default:
  * Username: `standard_user`
  * Password: `secret_sauce`
* No error message is displayed when attempting to checkout an empty cart.
* No error message is displayed when attempting to checkout with invalid information.
* The red shirt product has an incorrect product name  `Test.allTheThings() T-Shirt (Red)` which contains code-like syntax.
* The `Sauce Labs Backpack` product description contains code-like syntax and is inconsistent with other product descriptions.


