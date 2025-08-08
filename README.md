# WebdriverIO Test Automation Framework - Test Task
Test object - a website created by me using Python + vibecode with cursor
Additional info: some test may fail because of the long server response from test website.
                if it happened, launch them individualy by it.only

A comprehensive test automation framework built with WebdriverIO using the Page Object Model (POM) design pattern, targeting a web application for gaming console products.

## 🎯 Project Overview

This framework tests a web application hosted at `https://web-production-c47e.up.railway.app` that features:
- User authentication (login/registration)
- Product catalog browsing
- Product search and filtering
- Product detail views with price/rating comparisons

## 🏗️ Framework Structure

```
WebdriverIO/
├── test/
│   ├── data/
│   │   └── TestData.js           # Centralized test data and configuration
│   ├── locators/
│   │   ├── LoginLocators.js      # Login page element selectors
│   │   ├── ProductLocators.js    # Product page element selectors
│   │   └── RegistrationLocators.js # Registration page element selectors
│   ├── pages/
│   │   ├── BasePage.js           # Base page with common functionality
│   │   ├── LoginPage.js          # Login page object model
│   │   ├── ProductPage.js        # Product page object model
│   │   └── RegistrationPage.js   # Registration page object model
│   ├── specs/
│   │   ├── login.test.js         # Login functionality tests
│   │   ├── product.test.js       # Product browsing and detail tests
│   │   └── registration.test.js  # User registration tests
│   ├── utils/
│   │   └── Assertions.js         # Custom assertion utilities
│   └── screenshots/              # Test failure screenshots
├── allure-results/               # Allure test reports
├── wdio.conf.js                 # WebdriverIO configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🚀 Features

### ✅ Page Object Model Implementation
- **BasePage**: Common functionality including navigation, element waiting, and interaction helpers
- **LoginPage**: Complete login functionality with credential validation
- **RegistrationPage**: User registration with form validation
- **ProductPage**: Product browsing, search, filtering, and detail view navigation

### ✅ Comprehensive Test Coverage

#### Login Tests (`login.test.js`)
- ✅ Page element visibility validation
- ✅ Login with invalid credentials (error handling)
- ✅ Login with valid credentials (success flow)
- ✅ Navigation to registration page

#### Registration Tests (`registration.test.js`)
- ✅ Page element visibility validation
- ✅ Registration with valid data
- ✅ Registration with existing username (error handling)

#### Product Tests (`product.test.js`)
- ✅ Page element visibility (title, search input, buttons)
- ✅ Product search functionality
- ✅ Product grid display validation
- ✅ Product images display validation
- ✅ Product detail navigation and comparison:
  - Product title matching between list and detail views
  - Product price matching between list and detail views
  - Product rating matching between list and detail views

### ✅ Advanced Utilities
- **TestData**: Centralized configuration with dynamic data generation
- **CustomAssertions**: Extended assertion library with 12+ assertion methods
- **Locator Management**: Organized CSS selectors by page
- **Screenshot Capture**: Automatic failure screenshots

### ✅ Robust Configuration
- **Browser Setup**: Chrome with optimized settings
- **Retry Logic**: Automatic test retries on failure
- **Allure Reporting**: Detailed HTML test reports
- **Parallel Execution**: Configurable parallel test execution
- **Custom Commands**: Extended WebdriverIO functionality

## 📦 Installation

### Prerequisites
- Node.js ≥ 18.0.0
- npm ≥ 8.0.0

*Last updated: January 2025 - Framework covers authentication, product browsing, and detail validation with robust error handling and reporting.*