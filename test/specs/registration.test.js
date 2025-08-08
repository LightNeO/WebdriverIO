import RegistrationPage from '../pages/RegistrationPage.js';
import { CustomAssertions } from '../utils/Assertions.js';
import { TestData } from '../data/TestData.js';

describe('Registration Page Tests', () => {
    let registrationPage;

    beforeEach(async () => {
        registrationPage = new RegistrationPage();
        await registrationPage.open();
    });

    describe('Page Elements', () => {
        it('Title is visible', async () => {
            await CustomAssertions.assertElementDisplayed(registrationPage.title, 'Title should be displayed');
        });

        it('Title has correct text', async () => {
            const title = await registrationPage.title;
            await CustomAssertions.assertElementText(title, TestData.registerPageTitle, 'Title should have correct text');
        });

        it('Username input is visible', async () => {
            const usernameInput = await registrationPage.usernameInput;
            await CustomAssertions.assertElementDisplayed(usernameInput, 'Username input should be displayed');
        });

        it('Email input is visible', async () => {
            const emailInput = await registrationPage.emailInput;
            await CustomAssertions.assertElementDisplayed(emailInput, 'Email input should be displayed');
        });

        it('Password input is visible', async () => {
            const passwordInput = await registrationPage.passwordInput;
            await CustomAssertions.assertElementDisplayed(passwordInput, 'Password input should be displayed');
        });

        it('Register button is visible', async () => {
            const registerButton = await registrationPage.registerButton;
            await CustomAssertions.assertElementDisplayed(registerButton, 'Register button should be displayed');
        });
    });

    describe('Registration functionality', () => {
        it('Register with valid data', async () => {
            await registrationPage.registerWithValidData();

            const errorMessage = await registrationPage.errorMessage;
            await browser.pause(TestData.timeouts.short);
            await CustomAssertions.assertElementDisplayed(errorMessage, 'Should be successful message');
        });

        it('Register with existing username', async () => {
            await registrationPage.registerWithValidData(TestData.testUsers.existingUser);

            const errorMessage = await registrationPage.errorMessage;
            await browser.pause(TestData.timeouts.short);
            await CustomAssertions.assertElementDisplayed(errorMessage, 'Error message should be displayed');
        });
    });
});
