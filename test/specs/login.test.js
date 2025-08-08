import LoginPage from '../pages/LoginPage.js';
import { CustomAssertions } from '../utils/Assertions.js';
import { TestData } from '../data/TestData.js';
import RegistrationPage from '../pages/RegistrationPage.js';

describe('Login Page Tests', () => {
    let loginPage;

    beforeEach(async () => {
        loginPage = new LoginPage();
        await loginPage.open();
    });

    describe('Page Elements are visible', () => {
        it('Title is visible', async () => {
            await CustomAssertions.assertElementDisplayed(loginPage.title, 'Title should be displayed');
        });

        it('Title has correct text', async () => {
            const title = await loginPage.title;
            await CustomAssertions.assertElementText(title, TestData.loginPageTitle, 'Title should have correct text');
        });

        it('Username input is visible', async () => {
            const usernameInput = await loginPage.usernameInput;
            await CustomAssertions.assertElementDisplayed(usernameInput, 'Username input should be displayed');
        });

        it('Password input is visible', async () => {
            const passwordInput = await loginPage.passwordInput;
            await CustomAssertions.assertElementDisplayed(passwordInput, 'Password input should be displayed');
        });

        it('Login button is visible', async () => {
            const loginButton = await loginPage.loginButton;
            await CustomAssertions.assertElementDisplayed(loginButton, 'Login button should be displayed');
        });

        it('Register redirect link is visible', async () => {
            const registerLink = await loginPage.registerLink;
            await CustomAssertions.assertElementDisplayed(registerLink, 'Register redirect link should be displayed');
        });
    });

    describe('Login functionality', () => {
        it('Login with invalid credentials', async () => {
            await loginPage.loginWithInvalidCredentials();

            const errorMessage = await loginPage.errorMessage;
            await browser.pause(TestData.timeouts.short);
            await CustomAssertions.assertElementDisplayed(errorMessage, 'Error message should be displayed');
            await CustomAssertions.assertElementText(errorMessage, TestData.errorMessages.invalidCredentials, 'Error message should have correct text');
        });

        it('Login with valid credentials', async () => {
            await loginPage.loginWithValidCredentials();

            const errorMessage = await loginPage.errorMessage;
            await browser.pause(TestData.timeouts.short);
            await CustomAssertions.assertElementDisplayed(errorMessage, 'Should be successful message');
            await CustomAssertions.assertElementText(errorMessage, TestData.successMessages.loginRedirect, 'Error message should have correct text');
            await browser.pause(TestData.timeouts.short);
            await CustomAssertions.assertUrlContains(TestData.baseUrl, 'Should be redirected to products page');
        });

        it('Check redirect via register link', async () => {
            await loginPage.registerLink.click();
            await browser.pause(TestData.timeouts.short);
            const registrationPage = new RegistrationPage();
            await CustomAssertions.assertElementDisplayed(registrationPage.title, 'Registration page title should be displayed');
        });
    });
});
